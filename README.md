# Silly Cilla 💃

A tiny, ridiculous Swedish tribute site for Cecilia Baccaldi: an SVG stick
figure breakdancing with her photo as the head, synced to a real song via
YouTube's official embed player (streamed from YouTube, not hosted by us —
no copyrighted audio files in this repo), plus rotating funny Swedish
captions.

## Add the photo

Drop a photo of Cecilia into this folder named `cecilia.png` (square-ish
photos work best).

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
