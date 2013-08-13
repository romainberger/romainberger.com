---
layout: post
title: My Favorite Git Alias
date:   2013-05-11 20:00:00

image: git-is-dope.png
background-color: '#000'
image-class: center
---


<p>As pretty much every developer, I am lazy and try to make my life super easy. Being lazy often involves creating alias for every thing you type more than twice. And as I use git all day long, creating git aliases is a logical path.</p>
<p>One of my favorite git alias is this one:</p>
{% prism bash %}
rmall = !git rm $(git ls-files -d)
{% endprism %}

<p>Everything starts with the <span class="inline-code">git rm</span> which removes files from the working tree and the index. So to remove a file you usually type</p>
{% prism bash %}
$ git rm path/to/my/file.js
{% endprism %}
<p>But when you have a lot of files to remove and you are lazy, it can be annoying to type the name of every file. This is where the second part gets interesting.</p>

<h2>Yo dawg I heard you like git</h2>
<p>The following command</p>
{% prism bash %}
$ git ls-files -d
{% endprism %}
<p>shows you the files that have been removed (-d stands for -deleted). So if you combine the two together you can remove every files that has been deleted in one command.
<br>To do this, wrap the second command in <span class="inline-code">$()</span>. Which gives us:</p>
{% prism bash %}
$ git rm $(git ls-files -d)
{% endprism %}
<p>Boom. With one command you removed every files. But this command is way too long for my lazy fingers so let’s create an alias.</p>

<h2>Git alias</h2>
<p>Creating an alias for git is really easy. I will assume you already know how to create some, but if that’s not the case <a target="_blank" href="http://git-scm.com/book/en/Git-Basics-Tips-and-Tricks">you can learn here</a>.
<br>With this command though, there is a subtlety. Let’s try and add this to the git config file:</p>
{% prism bash %}
[alias]
    rmall = rm $(git ls-files -d)
{% endprism bash %}
<p>If you try to run this with <span class="inline-code">git rmall</span>, git will throw an error:</p>
{% prism bash %}
error: unknown switch 'd'
{% endprism %}
<p>All we need is to add a <span class="inline-code">!</span> in front of the command to tell git to run this as a command to the bash:</p>
{% prism bash %}
[alias]
    rmall = !git rm $(git ls-files -d)
{% endprism %}
<p>And you’re good to go.</p>
<p>If you’re interested in seeing others git aliases, you can <a target="_blank" href="https://github.com/romainberger/dotfiles">check out my dotfiles</a>.</p>
