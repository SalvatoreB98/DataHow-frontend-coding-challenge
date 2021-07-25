// Import the laravel-mix library
let mix = require('laravel-mix');

// we want to compile app.css in src
// compiled css will go in dist/
mix.sass("src/app.scss", "dist/")