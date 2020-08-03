# ijc-website

Code for the [International Jugger Council (IJC) website](https://juggercouncil.org).

## Points of Contact

If you have a question related to the IJC website, try contacting one of these people:

| Role | Name | GitHub | Discord |
|-|-|-|-|
| Designer | Valkyrie Savage | @valkyriesavage | parmesan002#8375 |
| Maintainer | Evan Savage | @candu | candu#2402 |

Note that the IJC is largely volunteer-run; we have no dedicated support staff, our members are across various timezones, and the people working on this website have day jobs!  We'll try to respond within a few days - and sooner if the matter is urgent - but we can't make any guarantees.

## Get Involved!

Development is coordinated in two places: Discord and GitHub.

Discussion with the rest of IJC takes place via `#ijc-web` (and sometimes other channels, depending on the topic) on the Jugger Worldwide Discord server.  That's the best place for non-technical discussions: content strategy, branding, working with other groups in IJC, etc.  If you want to be involved in the _what_ and _why_ of IJC's website, get involved on Discord!

Specific issues, features, etc. are logged on the [IJC Website Issues](https://github.com/international-jugger-council/ijc-website/issues) page on GitHub.  That's the best place for technical discussions: tools, frameworks, hosting, etc.  If you want to be involved in the _how_ of IJC's website, pick up an issue or two on GitHub!

To contribute to IJC website development, you will need to become a part of the [`international-jugger-council` GitHub organization](https://github.com/international-jugger-council).

## Develop!

To run a copy of the IJC website locally, you will need `git` and `npm`.  You can then:

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
