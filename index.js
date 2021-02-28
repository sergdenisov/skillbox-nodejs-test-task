const validUrl = require('valid-url');
const path = require('path');

const filePath = process.argv[2];
let fileName = '';

if (validUrl.isUri(filePath)) {
  const url = new URL(filePath);
  fileName = path.basename(url.pathname);
} else {
  fileName = path.basename(filePath);
}

console.log(`Filename: ${fileName}`);
process.exit(0);
