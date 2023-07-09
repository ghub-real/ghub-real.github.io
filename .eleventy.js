const tailwindcss = require('tailwindcss');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');


const postCssFilter = (cssCode, done) => {
    postcss([tailwindcss(require('./tailwind.config.js')), autoprefixer()])
      .process(cssCode, { from: 'src/styles/index.css'})
      .then(
        (r) => done(null, r.css),
        (e) => done(e, null),
      );
  };

module.exports = (eleventyConfig) => {
    eleventyConfig.addNunjucksAsyncFilter('postcss', postCssFilter);
    eleventyConfig.addWatchTarget('src/styles/**/*.css');
    eleventyConfig.addPassthroughCopy('./src/styles/base.css');
    return {
      dir: {
        input: 'src',
        output: '_site',
      },
    };
  };
  //https://nobody-codes-perfect.dev/blog/postcss-with-11ty/