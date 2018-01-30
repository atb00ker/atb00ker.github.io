## Portfolio
- The repository is code for the atb00ker/portfolio.

## setup for development
1. Make sure npm/yarn and nodejs are installed.
2. Go to develop folder and do `npm install` or `yarn install` depending on your package manager

### Production Version Changes List
- MAKE simple-grid Styles Internal.
- delete assets/css/simple-grid.css.
- Include small @media styles in main.css and delete their development file.
- MAKE main Styles Minified & Internal.
- Change the url's inside the main.css file.
- delete assets/css/user/main.css.
- MAKE owl-carousel Styles Minified & Internal.
- delete assets/css/owl.carousel.min.css.
- Minify assets/js/scrollreveal.min.js.
- Make all the external JS & Style Sheet delivery via Gzipped CDN (Wherever possible).
- Minify index.html.
- Edit the file list to be cached by the service-worker.
- Run and Check if everything is functional. (Make Issue if any error occur)
- Make sure the pull request on master contains [V{{Version.Number}}.{{Version.MajorUpdate.Number}}.{{Version.MinorUpdate/BugFix.Number}}] {{Pull Request Title}}.
