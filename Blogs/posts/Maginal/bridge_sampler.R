##  BRIDGE SAMPLER ##

library(mvtnorm) # for multivariate normal distribution
library(Brobdingnag) # for increased numerical stability
library(snowfall) # for parallel excecution

bridge_sampler <- function(samples, log_posterior, data, cores = 1,
                           tol = 1e-10, r0 = 0){
  
  # Note that before applying this function the user needs to:
  # 1. Collect 2*N1 samples from the posterior distribution (e.g., through
  #    MCMC sampling)
  # 2. If necessary: match the parameter ranges to the proposal distribution.
  #    That is, all samples must be allowed to range across the entire real line.  
  # 3. Specify the function for evaluating the log of the unnormalized posterior.
  #    This function is here referred to as log_posterior.
  #     
  # Args:
  #   samples      : array of dimension (nperchain x nchains x nparams) with
  #                  2*N1 posterior samples. All parameters must be allowed to
  #                  range across the entire real line
  #   log_posterior: function which returns the log of the unnormalized posterior 
  #   data         : list with data used for evaluating log_posterior
  #   cores        : number of cores used for evaluating log_posterior
  #   tol          : tolerance threshold for the iterative scheme of the bridge sampling 
  #   r0           : starting value for iterative scheme
  
  # 4. Split the samples into two parts  
  # Use the first 50% for fiting the proposal distribution and the second 50% 
  # in the iterative scheme.
  nperchain <- dim(samples)[1]
  nchains <- dim(samples)[2]
  fit_index <- seq_len(nperchain) %in% seq_len(round(nperchain/2))
  samples_4_fit <- do.call(rbind, lapply(seq_len(nchains), function(x) samples[fit_index,x,]))
  samples_4_iter <- do.call(rbind, lapply(seq_len(nchains), function(x) samples[!fit_index,x,]))
  
  # 5. Fit proposal distribution 
  N2 <- N1 <- nrow(samples_4_iter)
  m <- apply(samples_4_fit, 2, mean) # mean vector
  V <- cov(samples_4_fit)            # covariance matrix
  
  # 6. Draw N2 samples from the proposal distribution
  gen_samples <- rmvnorm(N2, m, V)   
  
  # 7a. Evaluate proposal distribution for posterior & generated samples
  q12 <- dmvnorm(samples_4_iter, m, V, log = TRUE) 
  q22 <- dmvnorm(gen_samples, m, V, log = TRUE)
  
  # 7b. Evaluate unnormalized posterior for posterior & generated samples
  if(cores == 1) {
    q11 <- apply(samples_4_iter, 1, log_posterior, data = data)
    q21 <- apply(gen_samples, 1, log_posterior, data = data)
  } else if (cores > 1) {
    sfInit(parallel = TRUE, cpus = cores, type = "SOCK")
    sfExportAll() 
    q11 <- sfApply(samples_4_iter, 1, log_posterior, data = data)
    q21 <- sfApply(gen_samples, 1, log_posterior, data = data)
    sfStop() 
  }
  
  # 8. Run iterative scheme as proposed in Meng and Wong (1996) to estimate
  # the marginal likelihood
  l1 <- q11 - q12
  l2 <- q21 - q22
  # increase numerical stability by subtracting the median of l1 from l1 & l2
  lstar <- median(l1)
  s1    <- N1/(N1 + N2)
  s2    <- N2/(N1 + N2)
  e <- as.brob( exp(1) )   # more stable Brobdingnag number representation
  criterion_val <- tol + 1 # criterion value
  r <- r0                  # starting value for r
  i <- 0                   # iteration counter
  
  while (criterion_val > tol) {
    r_old <- r
    numerator <- as.numeric(e^(l2 - lstar)/(s1 * e^(l2 - lstar) + s2 *  r))
    denominator <- as.numeric(1/(s1 * e^(l1 - lstar) + s2 * r))
    r <- (N1/N2)*sum(numerator)/sum(denominator)
    i <- i + 1
    criterion_val <- abs((r - r_old)/r)
    cat(paste0("Iteration: ", i, " -- Log marginal likelihood estimate: ",
               round(log(r) + lstar, 6), "\n"))
  }  
  
  logml <- log(r) + lstar # log of marginal likelihood
  
  # Return a list with the evaluations of the proposal and the unnormalized
  # posterior, the number of iterations of the iterative scheme, and the 
  # estimated log marginal likelihood
  output <- list(eval  = list(q11 = q11, q12 = q12, 
                              q21 = q21, q22 = q22),
                 niter = i, logml = logml)
  return(output)
}