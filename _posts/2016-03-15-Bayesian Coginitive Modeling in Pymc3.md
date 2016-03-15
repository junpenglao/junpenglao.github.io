---
layout: page
title: Bayesian Coginitive Modeling in Pymc3
permalink: /Bayesian-Coginitive-Modeling-in-Pymc3/
---

<img src="https://raw.githubusercontent.com/junpenglao/junpenglao.github.io/master/_posts/2016-03-15-Bayesian%20Coginitive%20Modeling%20in%20Pymc3/im1.png" />   


For the past two months, I have been porting the models in Lee and Wagenmakers' _Bayesian Cognitive Modeling - A Practical Course_ into pymc3 as a way to learn Bayesian Statistics and python. I also replicated most of the figures as in the book. I am glad that now I am finished (except the model in Chapter 19, more on that later). The full project is in Jupiter notebook format, and you can download it on [Github](https://github.com/junpenglao/Bayesian-Cognitive-Modeling-in-Pymc3).

Needless to say, I am excited to hear your feedback. If you have any suggestion to optimize the model, please send me a PR.

As someone used Matlab heavily, Jupiter notebook and python amazed me greatly. The figure outputs are fresh looking and easy to code. Speaking of easy to code, one thing I can never quite understand is that why there is still no _alpha_ feature for scatter plot in Matlab - the workaround by creating the patch is incredibly slow if the underly dataset is large.


Seriously, the figures are beautiful ;-)
<img src="https://raw.githubusercontent.com/junpenglao/junpenglao.github.io/master/_posts/2016-03-15-Bayesian%20Coginitive%20Modeling%20in%20Pymc3/im2.png"/>   
<img src="https://raw.githubusercontent.com/junpenglao/junpenglao.github.io/master/_posts/2016-03-15-Bayesian%20Coginitive%20Modeling%20in%20Pymc3/im3.png"/>   
<img src="https://raw.githubusercontent.com/junpenglao/junpenglao.github.io/master/_posts/2016-03-15-Bayesian%20Coginitive%20Modeling%20in%20Pymc3/im4.png"/>   
<img src="https://raw.githubusercontent.com/junpenglao/junpenglao.github.io/master/_posts/2016-03-15-Bayesian%20Coginitive%20Modeling%20in%20Pymc3/im5.png"/>   

As for the problem I am still having in the model of Chapter 19, I reported an issue [here](https://github.com/pymc-devs/pymc3/issues/1018). This might be a pymc3 issue - hopefully it will be resolved soon.