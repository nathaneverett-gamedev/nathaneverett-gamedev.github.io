# nathaneverett-gamedev.github.io

Game development portfolio for Nathan Everett, hosted on GitHub Pages at
https://nathaneverett-gamedev.github.io/

The site is plain static HTML, CSS and JS with no build step. To preview it locally, open `index.html` in a browser.

## Structure

```
index.html                 Home: intro, professional projects, board games, background
about.html                 About and resume
valorant.html              Project pages (one per card)
unreal-vehicle-physics.html
wargaming-bigworld.html
foundation-mobile.html
war-of-supremacy.html
assets/css/style.css       All styling (colours are CSS variables at the top)
assets/js/site.js          Shared header, nav and footer. Edit NAV here to add menu links
assets/img/                Card and banner images
assets/Everett_Nathan_Resume.pdf   Linked from the header and the About page (add this file)
prototypes.html            List of current board game prototypes
prototypes/<game-name>/    One folder per prototype: details page plus optional playable version
```

## Adding images

Cards and page banners already reference these files. Drop images with these names into `assets/img/`
(16:9, about 1280x720) and they'll show up. Until then, a coloured gradient is shown in their place.

- `valorant.jpg`, `TomorrowFalls.jpg`, `wargaming-games.jpg`, `lumi.jpg`
- `war-of-supremacy.jpg`, `prototypes.jpg`, `game-template.jpg`

## Adding a prototype

All prototypes are listed on `prototypes.html`. Each one has its own folder:

```
prototypes/my-game/
  index.html       Details page: pitch, video, sell sheet, design notes, Play button
  play.html        The playable browser version (optional)
  banner.jpg       Page banner (16:9)
  sell-sheet.jpg   Sell sheet preview image, plus sell-sheet.pdf for the download button
```

1. Copy `prototypes/template/` to `prototypes/my-game/`.
2. Fill in `index.html`. The comments in it show how to embed a YouTube video, the sell sheet and photos.
   Delete any sidebar buttons that don't apply, such as Play if there's no browser version.
3. Build the game in `play.html`, or delete it. Extra JS, CSS and image files can sit in the same folder.
4. In `prototypes.html`, copy an example card into "Games Currently Pitching" or "Games You Can Play", point
   its `href` at `prototypes/my-game/index.html` and write a one or two sentence description.

Games in "Early Development" don't get a folder. They're a title and a short description in `prototypes.html`.

`play.html` doesn't have to use the template. Any self-contained HTML file works. Keep
`<body data-root="../../">` and the `site.js` script tag if you want the site header on the page.
