---
layout: post
title: Handling right to left css with Webpack
date: 2016-06-15 14:29:26

image: handling-right-to-left-css-with-webpack.png
background-color: '#000'
image-class: center dark
---

Handling internationalization in a website (be it a server-side only site or a single page app) is always challenging. The amount of work to actually manage multiple languages can be pretty huge, so if you had all the tools that you have to incorporate to automate all tasks (extract the text to translate, send them to the tool translators are using, getting them back then bundling...) it can be a lot.

At Dailymotion, we've made a lot of small modules to automate all the i18n process. The whole process itself would need a pretty big blogpost, so I'll keep that for later. Today, I'll talk about a very small part: handling right-to-left languages in terms of css. Being in the middle of a migration from a legacy php stack to a universal react app, we had to re-think completely how we handled this.

## Before

The legacy stack includes an old version of Symfony, some twig and scss to compile the stylesheets. So everywhere we would need to use directions (right or left) we would use variables:

```css
.example {
    text-align: $start;
    border-#{$end}: 10px;
}
```

Instead of using `right` or `left`, we would use `start` or `end`. Then all stylesheets would be compiled twice, once with start and end being for left-to-right (so `left` and `right`), then a second time reversed (`start` being `right` and `end` being `left`). It worked very well and since this we had no issue with right-to-left in css.

## Webpack

One of the first thing you do when you start a new project these days is to install and configure webpack. So along with all the babel and react goodness, we've quickly put the "classic" css configuration for css: style-loader for development and extract-text-webpack-plugin for production. The style-loader adds `style` tags at runtime, which means there is a small FOUC on page load (since we're isomorphic and that the tags are only added client-side). The extract-text-webpack-plugin creates a real css file combining all css files required through the app.

This way we have a simple setup for dev but can benefit from cdn and caching for production by using a real stylesheet.

```js
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

The `rtlcss` module on npm is very effective and simple: it simply reserves your css, transforming all `left` to `right` and vice-versa. So integrating rtl into our webpack workflow was just a matter of plugging this module at the right place.

Having worked on a webpack loader/plugin to run multiple webpack compilations in one process (for i18n once again but something different, I may write about it sometimes), I had a pretty good idea of how a plugin could make webpack produce an additional asset for a rtl stylesheet. It is actually fairly easy and [the plugin itself is pretty small](https://github.com/romainberger/webpack-rtl-plugin/blob/master/src/index.js).

The idea is simple: it is a module that, used in addition to the `extract-text-webpack-plugin`, will generate a second stylesheet, that will be a rtl version of the "regular" stylesheet:

```js
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

Now with this simple configuration you will have a `style.css` and a `style.rtl.css` generated. All you have to do now is choose the appropriate stylesheet according to the language.

## rtl-css-loader

The extract-text-webpack-plugin is great but as said, we only use it for production, not development. Wich mean I had to plug `rtlcss` somewhere else. The easiest way was to integrate it in the `css-loader`. I've forked it then made a quick modification: before exporting the css (which is exported as a string), I just check the `dir` attribute on the `html` tag. This way, if it is set to `rtl`, the loader will export the rtl version of the css.

Once again the configuration is very simple as the loader is a fork of the `css-loader`, which means it just needs to replace it:

```js
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

Since the module includes both the regular css and the rtl version in the bundle, I don't recommend using it for production. Your bundle size will be increased drastically since the css will be doubled.

## Example

Both modules have examples in their own repos, but if you want to have a complete example using both modules you can check out my repo: [webpack-rtl-example](https://github.com/romainberger/webpack-rtl-example). It is very simple but includes a configuration for dev and one for prod with both modules I've presented above.

## Future

I don't know if this way of handling rtl is the best and the easiest, but I haven't found any resource about people using webpack to compile css with a way to manage rtl. For now this setup works great and allows us to do everything we want. I hope the modules and this article will help someone deal with this subject, and I'd be interested in reading how you or your company handle it if you use webpack.

Feel free to open issues on the modules' repos if you have any questions or suggestions to improve them.
