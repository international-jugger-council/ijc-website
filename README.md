# ijc-website

Code for [The International Jugger Council's website](https://juggercouncil.org).

## Develop!

1. `git clone` this repo on your favourite computer;
2. `npm install`;
3. `npm run serve`;
4. Visit [the site](http://localhost:8081);
5. Edit files in `src`, and see changes instantly in your browser.

## Deploy!

1. `git clone` this repo on your favourite server;
2. `npm install`;
3. `npm run build`;
4. Use `nginx` or what have you to serve the `_site` folder.

## Tech Stack

`ijc-website` is a static site, built using a couple of simple tools:

- [eleventy](https://www.11ty.dev/), a static site generator that supports modular templates and layouts (e.g. if you want the same look-and-feel, navigation bar, etc. on each page);
- [nunjucks](https://mozilla.github.io/nunjucks/), a templating language by Mozilla;
- [bulma](https://bulma.io/), a flexbox-based CSS framework that provides simple utilities for building clean, responsive interfaces.
