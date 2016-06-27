---
layout: post
title: Handling Right To Left CSS With Webpack
date: 2016-06-15 14:29:26

background-color: '#000'
image-class: none
---

Handling internationalization in a website (be it a server-side only site or a single page app) is always challenging. The amount of work to actually manage multiple languages can be pretty huge, so if you add all the tools that you have to incorporate to automate all tasks (extract the text to translate, send them to the tool translators are using, getting them back, bundling...) it can be a lot.

At Dailymotion, we've made a lot of small modules to automate all the i18n process. The whole process itself would need a pretty big blog post, so I'll keep that for later. Today, I'll talk about a very small part: **handling right-to-left languages in terms of css**. Being in the middle of a migration from a legacy php stack to a universal react app, we had to re-think completely how we handled this.

## Before

The legacy stack includes an old version of Symfony, some twig and scss to compile the stylesheets. So everywhere we would need to use directions (right or left) we would use variables:

```css
.example {
    text-align: $start;
    border-#{$end}: 10px;
}
```

Instead of using <span class="inline-code">right</span> or <span class="inline-code">left</span>, we would use <span class="inline-code">start</span> or <span class="inline-code">end</span>. Then all stylesheets would be compiled twice, once with start and end being for left-to-right (so <span class="inline-code">left</span> and <span class="inline-code">right</span>), then a second time reversed (<span class="inline-code">start</span> being <span class="inline-code">right</span> and <span class="inline-code">end</span> being <span class="inline-code">left</span>). It worked very well and since this we had no issue with right-to-left in css.

## Webpack

One of the first thing you do when you start a new project these days is to install and configure webpack. So along with all the babel and react goodness, we've quickly put the "classic" css configuration for css: style-loader for development and extract-text-webpack-plugin for production. The style-loader adds <span class="inline-code">style</span> tags at runtime, which means there is a small FOUC on page load (since we're isomorphic and that the tags are only added client-side). The extract-text-webpack-plugin creates a real css file combining all css files required through the app.

This way we have a simple setup for dev and we can use cdns and caching for production by using a real stylesheet.

```javascript
// for dev a simple configuration with some postcss to handle css next

{
  test: /\.css$/,
  loaders: ['style', 'css', 'postcss'],
},

// for production we just go through the extract-text-webpack-plugin
// to produce a real stylesheet
{
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css!postcss-loader'),
},
// ...
plugins: [
  new ExtractTextPlugin('[name].[contenthash].css', {allChunks: true}),
]
```

This works well, until you want to support right-to-left languages.

## Webpack-rtl-plugin

The [rtlcss](http://npmjs.com/package/rtlcss) module is very effective: it simply reverses your css, transforming all <span class="inline-code">left</span> to <span class="inline-code">right</span> and vice-versa. So integrating rtl into our webpack workflow was just a matter of plugging this module at the right place.

Having worked on a webpack loader/plugin to run multiple webpack compilations in one process (for i18n once again but something different, I may write about it sometimes), I had a pretty good idea of how a plugin could make webpack produce an additional asset for a rtl stylesheet. It is actually fairly easy and [the plugin itself is pretty small](https://github.com/romainberger/webpack-rtl-plugin/blob/master/src/index.js).

The idea is simple: it is a module that, used in addition to the <span class="inline-code">extract-text-webpack-plugin</span>, will generate a second stylesheet, that will be a rtl version of the "regular" stylesheet:

```javascript
const WebpackRTLPlugin = require('webpack-rtl-plugin')

module.exports = {
  // ...
  module: {
    loaders: [
      {
        // basic extract-text-webpack-plugin configuratiom
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    // here's the only thing you have to add to make it work. See? easy!
    new WebpackRTLPlugin(),
  ],
}
```

Now with this simple configuration you will have a <span class="inline-code">style.css</span> and a <span class="inline-code">style.rtl.css</span> generated. All you have to do now is choose the appropriate stylesheet according to the language.

## rtl-css-loader

The extract-text-webpack-plugin is great but as said, we only use it for production, not development. Wich mean I had to plug <span class="inline-code">rtlcss</span> somewhere else. The easiest way was to integrate it in the <span class="inline-code">css-loader</span>. I've forked it then made a quick modification: before exporting the css (which is exported as a string), I just check the <span class="inline-code">dir</span> attribute on the <span class="inline-code">html</span> tag. This way, if it is set to <span class="inline-code">rtl</span>, the loader will export the rtl version of the css.

Once again the configuration is very simple as the loader is a fork of the <span class="inline-code">css-loader</span>, which means it's a drop-in replacement:

```javascript
module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        // instead of 'css', use 'rtl-css'
        loaders: ['style', 'rtl-css']
      },
    ]
  }
}
```

And there you go, your css will be rtl'ized if you set the correct attribute on the html tag.

Since the module includes both the regular css and the rtl version in the bundle, I don't recommend using it for production. Your bundle size will be increased drastically since the css will be doubled.

## Example

Both modules have examples in their own repos, but if you want to have a complete example using both modules you can check out the dedicated repo: [webpack-rtl-example](https://github.com/romainberger/webpack-rtl-example). It is very simple but includes a configuration for dev and one for prod with both modules I've presented above.

## Future

I don't know if this way of handling rtl is the best and the easiest, but I haven't found any resource about people using webpack to compile css with a way to manage rtl. For now this setup works great and allows us to do everything we want. I hope the modules and this article will help someone deal with this subject, and I'd be interested in reading how you or your company has approached the question if you use webpack.

* [webpack-rtl-plugin](https://github.com/romainberger/webpack-rtl-plugin)
* [rtl-css-loader](https://github.com/romainberger/rtl-css-loader)
* [webpack-rtl-example](https://github.com/romainberger/webpack-rtl-example)
