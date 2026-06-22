# Silly Cecilia 💃

A tiny, ridiculous tribute site for Cecilia Baccaldi: a CSS-animated dancing
character wearing her photo as a face, a self-generated chiptune melody
(via Web Audio API, no external audio files needed), and rotating funny
captions.

## Add the photo

Drop a photo of Cecilia into this folder named `cecilia.png` (square-ish
photos work best). Until you do, a silly placeholder face is shown.

## Run locally

```bash
npx serve -s .
```

Then open the printed local URL in your browser.

## Deploy on Railway

This repo includes a `package.json` with a `start` script that serves the
static site via [`serve`](https://www.npmjs.com/package/serve). Railway's
Nixpacks builder will detect Node, run `npm install`, and run `npm start`
automatically — just point a new Railway project at this repo and deploy.
