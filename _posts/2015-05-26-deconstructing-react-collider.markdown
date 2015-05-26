---
layout: post
title: Deconstructing React-collider
date: 2015-05-26 16:40:18

image: deconstructing-react-collider.jpg
background-color: '#000'
image-class: cover dark center
---

## Isomorphic App

In this doc I will try to thoroughly explain the [react-collider module](https://github.com/dailymotion/react-collider). Even though the idea and the code are pretty simple, it can be seen like a magic black box. The goal was to make a wrapper to build isomorphic apps with React. Before going further, let's recall that an isomorphic app is an app using the same code server and client side. The advantage are multiple:

- prevent code duplication
- SEO ready app: your app is completely rendered server side, including the data
- it shouldn't happen, but if your client side app is broken, you can rely only on the server. Every links work and will serve the rendered app
- alternatively, if your servers are down (but not your API), you can simply provide a minimal <span class="inline-code">index.html</span> and your client side app will work.
- and many other reasons I forgot

[React](https://facebook.github.io/react) is a very good framework making isomorphic apps easy to build. The <span class="inline-code">React.renderToString()</span> method allows you to render your app server side, and then React will automatically take the relay client side, without re-rendering your app (if you do it right).

After exploring how to an isomorphic app with [Express](http://expressjs.com) and React, we made a simple middleware / client side module, which is available on [npm](https://npmjs.org/package/react-collider), and the source on [GitHub](https://github.com/dailymotion/react-collider).

## Invariant Violation from hell

React is very strict. If your server side markup is not exactly the same as your client side rendering, it will throw you an error and won't work.

The difficulty comes the minute you need data from an API. As you need your components rendered with the data from the server, you need to fetch the data upfront and give them to the components as props. So your components must be able to tell you what they need before being rendered.

Then once your app is rendered server side, React will check your app client side to see if everything is ok. Which mean that you need to give your components the data a second time. To prevent useless ajax requests for data that you already have, you will have to render a JSON object in your markup that the component will use client side.

## What does what in the module

Here is a breakdown of what every file do and how they communicate:

#### The collider itself

#### [collider](https://github.com/dailymotion/react-collider/blob/master/src/reactCollider.js)
- runs [react-router](https://github.com/rackt/react-router) to get the Handler and the State - [code](https://github.com/dailymotion/react-collider/blob/c7586489711c679729d879bdabf2040d8e9954c6/src/reactCollider.js#L34)
- check the Handler and the matched routes to see if they need data - [code](https://github.com/dailymotion/react-collider/blob/13234d876414a5b86533e8f43a7a54ccfca32c5a/src/reactCollider.js#L19)
- run the fetchHandler with an array of component and the params from the router - [code](https://github.com/dailymotion/react-collider/blob/13234d876414a5b86533e8f43a7a54ccfca32c5a/src/reactCollider.js#L44)

#### [fetchHandler](https://github.com/dailymotion/react-collider/blob/master/src/defaultFetchHandler.js)
- iterate through the components to run their fetchData method - [code](https://github.com/dailymotion/react-collider/blob/13234d876414a5b86533e8f43a7a54ccfca32c5a/src/defaultFetchHandler.js#L9)
- store the data in an object with the result of the expose method as key and the data as value (bad naming in that commit) - [code](https://github.com/dailymotion/react-collider/blob/13234d876414a5b86533e8f43a7a54ccfca32c5a/src/defaultFetchHandler.js#L26)
- back to the server or client - [code](https://github.com/dailymotion/react-collider/blob/13234d876414a5b86533e8f43a7a54ccfca32c5a/src/defaultFetchHandler.js#L31)

### Server side:

#### [server.js](https://github.com/dailymotion/react-collider/blob/master/src/server.js)
- clean the url - [code](https://github.com/dailymotion/react-collider/blob/13234d876414a5b86533e8f43a7a54ccfca32c5a/src/server.js#L32-L38)
- send the routes, the url and some options to the collider - [code](https://github.com/dailymotion/react-collider/blob/13234d876414a5b86533e8f43a7a54ccfca32c5a/src/server.js#L42)
- uses react to render to string the handler with the data fetched - [code](https://github.com/dailymotion/react-collider/blob/13234d876414a5b86533e8f43a7a54ccfca32c5a/src/server.js#L21-L22)
- send the response to the client - [code](https://github.com/dailymotion/react-collider/blob/13234d876414a5b86533e8f43a7a54ccfca32c5a/src/server.js#L24)

### Client side:

#### [client.js](https://github.com/dailymotion/react-collider/blob/master/src/client.js)
- runs the collider - [code](https://github.com/dailymotion/react-collider/blob/13234d876414a5b86533e8f43a7a54ccfca32c5a/src/client.js#L19)
- gets a handler and the data then uses react to render to the document - [code](https://github.com/dailymotion/react-collider/blob/13234d876414a5b86533e8f43a7a54ccfca32c5a/src/client.js#L20)

### The data provider

The data provider is a simple module wrapping the way data will be fetched. It will either get the data from a url or get it from a [local variable](https://github.com/dailymotion/react-collider/blob/13234d876414a5b86533e8f43a7a54ccfca32c5a/src/dataProvider.js#L15). This will be useful to prevent useless ajax calls on the first load.

## Things learned
- the meta charset is super important. React will throw you an invariant error if there is the smallest encoding error or difference between the server and client. Outputing a bunch of data json formatted can really get messy without it.
- when creating a server/client lib, it might be better to use multiple file to import instead of multiple exports from one file. At first, the lib was used like this: <span class="inline-code">import {server} from 'react-collider'</span> and <span class="inline-code">import {client} from 'react-collider'</span>. It was working, until I added the logging system, which required to import the file system module. As the client side module was from the same file, the <span class="inline-code">fs</span> module was imported as well, provoking an error. Now every modules are in separate files, so you import everything like this: <span class="inline-code">import server from 'react-collider/server'</span>.
- test everything. I mean every. thing. The client side test is [ridiculously small](https://github.com/dailymotion/react-collider/blob/13234d876414a5b86533e8f43a7a54ccfca32c5a/test/client.js) but is super important. After a bad merge I forgot to import a dependency and broke the client side. I didn't have a test for it so I didn't see it immediately.
- digging deep in the possible configuration for Node and webpack is important to make your development workflow and code easier to handle. Simplifying your import paths, running things only server or client side, using a dev/staging/prod configuration... all these things can be a bit different when you have to take into account a server and browser with the same code.

<p class="text-muted">Image source: http://toffsworld.com/travel/the-most-expensive-physics-experiment-ever-carried-out-by-mankind/</p>
