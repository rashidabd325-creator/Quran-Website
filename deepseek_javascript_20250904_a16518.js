const fs = require('fs');
const htmlMinifier = require('html-minifier');
const cssMinify = require('css-minify');

// Minify HTML
const html = fs.readFileSync('dist/index.html', 'utf8');
const minifiedHtml = htmlMinifier.minify(html, {
  removeAttributeQuotes: true,
  collapseWhitespace: true,
  removeComments: true,
  minifyJS: true,
  minifyCSS: true
});

fs.writeFileSync('dist/index.html', minifiedHtml);

// Minify CSS (extract and minify inline CSS)
const cssRegex = /<style>([\s\S]*?)<\/style>/g;
let match;
let css = '';

while ((match = cssRegex.exec(html)) !== null) {
  css += match[1];
}

if (css) {
  const minifiedCss = cssMinify.minify(css);
  const updatedHtml = minifiedHtml.replace(/<style>[\s\S]*?<\/style>/, `<style>${minifiedCss}</style>`);
  fs.writeFileSync('dist/index.html', updatedHtml);
}

console.log('Minification complete!');