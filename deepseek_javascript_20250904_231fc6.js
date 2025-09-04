const fs = require('fs');
const path = require('path');

// Optimize the HTML file
const html = fs.readFileSync('index.html', 'utf8');

// Remove console.log statements for production
const optimizedHtml = html.replace(/console\.log\(.*?\);?/g, '');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Write optimized HTML
fs.writeFileSync('dist/index.html', optimizedHtml);

// Copy other files
const filesToCopy = ['manifest.json', 'sw.js', 'icons'];
filesToCopy.forEach(file => {
  if (fs.existsSync(file)) {
    const dest = path.join('dist', file);
    if (fs.lstatSync(file).isDirectory()) {
      copyFolderSync(file, dest);
    } else {
      fs.copyFileSync(file, dest);
    }
  }
});

console.log('Optimization complete!');

// Helper function to copy folders recursively
function copyFolderSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    files.forEach(file => {
      const curSource = path.join(source, file);
      const curTarget = path.join(target, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderSync(curSource, curTarget);
      } else {
        fs.copyFileSync(curSource, curTarget);
      }
    });
  }
}