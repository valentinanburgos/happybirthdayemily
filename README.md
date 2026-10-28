# Emily's Little Garden 🎀

A pastel pink coquette-style Snake birthday gift website. It includes:
- A welcome screen
- Classic Snake with flower collectibles
- One personal letter and animal per friend
- An animal gallery
- A final Emily Chimera reveal
- A scrapbook to revisit letters
- Keyboard and mobile direction controls

## Files
- `index.html` — page structure and screens
- `style.css` — pastel/coquette styling
- `friends.js` — edit friend names, messages, animals, and thresholds
- `game.js` — Snake game and screen logic
- `assets/animals/` — starter SVG animal illustrations and your image assets

## Personalize it
1. Open `friends.js`.
2. Replace “Friend One”, “Friend Two”, etc. with your friends' names.
3. Replace the example messages and animal names/reasons.
4. To use your own animal photos, upload each photo into `assets/animals/` and change its `image` path in `friends.js`.
5. To add/remove contributors, copy or remove an entire friend object. Set `flowerThreshold` to 3, 6, 9, 12, 15, 18, 21, and 24 for eight friends.
6. Make your final collage and save it as `assets/animals/emily-chimera.png`.
7. Edit `finalMessage` and `recipient` inside `friends.js` if you want.

**Important:** the site starts with seven example friends. Update these before gifting it. The starter SVGs are illustrations, not real photos.

## Test locally
You can usually open `index.html` directly in your browser to test the site. If a browser blocks anything locally, use the GitHub Pages version to test.

## Publish on GitHub Pages
1. Create a GitHub repository (e.g. `emily-birthday`).
2. Upload the contents of this folder to the repository's root. `index.html` must be at the top level, not inside another nested folder.
3. Open repository **Settings → Pages**.
4. Under Build and deployment, choose **Deploy from a branch**.
5. Choose branch `main` and folder `/ (root)`, then save.
6. Wait for deployment and open the URL GitHub Pages shows.

GitHub's guide: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Notes
- GitHub Pages sites are public to anyone with the link. Avoid adding private information or photos people do not want shared.
- Progress is kept during the current browser session. Refreshing the page or closing the tab resets the game progress.
- This starter is designed to be edited without build tools or package installation.
