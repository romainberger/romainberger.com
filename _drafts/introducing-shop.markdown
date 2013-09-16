---
layout: post
title: Introducing Shop
date:   2013-09-16 20:00:00

image: introducing-shop.png
background-color: '#000'
image-class: dark
---

Since I've starting working at [BBS Concept](http://bbsconcept.com) I've spend a lot of time working on PrestaShop. And when you spend a lot of time with something you end up trying to automate as much as possible to be more efficient.

About a year ago, I wanted to work on a CLI to make my development workflow faster. Back then it ran on Node.js (I've just discovered it and was excited to be able to do server side stuff with javascript instead of PHP because... well because PHP).

A few weeks after, Google revealed [Yeoman](http://yeoman.io). I got an early access to it and found it pretty good, particularly the generators. So I decided to re-write my tool (that wasn't even finished) to make it a Yeoman generator. But Yeoman is very opinionated and blocked me in some actions I wanted to do. Plus, Yeoman was built mainly for web apps and use Grunt all over the place. I don't use Grunt when working on PrestaShop projects, and a bunch of built in stuff does not fit: the build processes for examples are useless in that case. So I dropped the project.

After that, I started using a bunch of stuff to substitute the lack of CLI. I wrote Makefiles and Rakefiles all over the place to have tasks ready to make some processes faster. After month of tweaking those tasks, I know have a pretty good workflow that I find great. A few month ago I started learning Ruby and was amazed how easy it was to write gems (and how Ruby felt easy and obvious). So I thought I could give it a try once again and turn those Rakefiles in a proper CLI.

# PrestaShop CLI?
Since PrestaShop 1.5.4 a [CLI exists](http://doc.prestashop.com/display/PS15/Installing+PrestaShop+using+the+command+line)... to install the framework. Well that good but that's not a lot (compared to Rails or Symfony for example). Plus the CLI is not very appealing: You have to use one of those syntax

{% prism bash %}
$ php install_cli.php --domain=domain.com --db_name=prestashop --toomany=arguments
{% endprism %}

That's the kind of thing I can't remember and I would have to look at the manual everytime, so it's not really faster. Plus you don't install new projects as often as you create files.

# Introducing Shop
So my goal with Shop was to make a CLI as easy as possible, unopinionated and that use as little configuration as possible.

Basically Shop helps you create a new PrestaShop project, then create files and modules, and perform simple task like cleaning the cache.

The advantage is that it lets a lot of freedom in that it creates the bare minimum everytime. The idea is not to have a complete set of generator but just to type less. Instead of `$ cd modules && mkdir mymodule && touch mymodule/mymodule.php` you can just run `$ shop module mymodule`.

If you work a lot on PrestaShop and feel like it could be useful, feel free to try it. You can install it with

{% prism bash %}
$ gem install shop
{% endprism %}

You can then see the available commands by running

{% prism bash %}
$ shop help
{% endprism %}

The source and the whole documentation are available on [GitHub](https://github.com/romainberger/shop). If you have any issues or feedback feel free to [ping me on twitter](http://twitter.com/romain__berger) or to open an issue on [GitHub](https://github.com/romainberger/shop/issues).
