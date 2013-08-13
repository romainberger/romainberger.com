---
layout: post
title: Just Fork It
date:   2013-07-11 20:00:00

image: html-contenteditable-ftw.png
background-color: '#fff'
image-class: center
---

<p>Open source is cool for lots of reasons.</p>
<p>The thing I like the most is that you can fork a project and create your own independent thing. Don’t like a detail in a project? Just fork it.</p>

<h2>Boom</h2>
<p>I am an avid user of <a target="_blank" href="https://github.com/holman/boom">boom</a>. I mostly use it to store urls I never remember. A <span class="inline-code">$ boom open url</span> and my problem is solved.</p>
<p>But while it solved a problem, it created another one. I just can’t remember how I named my items in it. <em>"Was it url-beta? url-preprod? or maybe just url?"</em>. At the end I would just <span class="inline-code">$ boom all</span> to see the name.</p>
<p>This made me wish there were a git-like “did you mean this?” when I type something wrong. So I forked it, and implemented it. Okay maybe “implemented it” is a bit strong as all I did was searching how it was done in git and do something similar.</p>

<h2>Pull Request</h2>
<p>Once I was done, I made a pull request to the main project repository. Zach Holman did not merge it for <a target="_blank" href="https://github.com/holman/boom/pull/91#issuecomment-20705486">reasons I understand</a>, but the most important is that I now have Boom working as I want.</p>
<p>I improved my Ruby skills, learned about the <a target="_blank" href="http://en.wikipedia.org/wiki/Levenshtein_distance">Levenshtein distance</a> and fixed my problem. Triple win.</p>
<p>So if a software or anything is bothering you, even if your changes won’t be merged and shipped in the official release, just fork it. Make your life easier by making stuff work the way you want.</p>
<p><em>PS: If you’re interested in using </em><a target="_blank" href="https://github.com/romainberger/boom"><em>my version of Boom</em></a><em>, you can install it by cloning-building-installing from the </em><a target="_blank" href="https://github.com/romainberger/boom"><em>"did-you-mean" branch</em></a><em> (it will override your installation of boom if you have any). I haven’t published the gem but I can if anybody is interested.</em></p>
