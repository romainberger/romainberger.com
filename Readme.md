# romainberger.com

Code for my personnal website [romainberger.com](http://romainberger.com).

## Install

You will need [bundler](http://bundler.io/) and [npm](https://www.npmjs.com/) to install the dependencies.

```shell
$ bundle install
$ npm i
```

## Developement

```shell
# run the dev server and compass compilation
$ rake
```

Then open you browser at [http://0.0.0.0:4000](http://0.0.0.0:4000)

Create a new post:

```shell
$ rake post post 'New Post'
```

Build:

```shell
$ rake build
```
