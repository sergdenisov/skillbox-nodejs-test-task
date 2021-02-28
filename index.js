const validUrl = require('valid-url');
const fetch = require('node-fetch');
const fs = require('fs');
const crypto = require('crypto');

const originalFilePath = process.argv[2];

const fetchFile = async (url, isHashFile = false) => {
  const response = await fetch(url);
  const body = await response[isHashFile ? 'text' : 'buffer']();
  return body;
};

const isURL = validUrl.isUri(originalFilePath);

const messages = {
  100: 'Original file reading error.',
  101: 'Hash file reading error.',
  102: 'Hash correctness error.',
  0: 'Hash is correct, success.',
};

const getFile = async (filePath, errorCode, isHashFile = false) => {
  try {
    const body = isURL
      ? await fetchFile(filePath, isHashFile)
      : fs.readFileSync(filePath, isHashFile ? 'utf-8' : null);

    return isHashFile ? body.trim() : body;
  } catch (ignore) {
    console.log(messages[errorCode]);
    process.exit(errorCode);
    return Promise.reject();
  }
};

const checkFiles = async () => {
  try {
    const [originalFileBody, hashFileBody] = await Promise.all([
      getFile(originalFilePath, 100),
      getFile(`${originalFilePath}.sha256`, 101, true),
    ]);
    const originalFileHash = crypto
      .createHash('sha256')
      .update(originalFileBody)
      .digest('hex');

    if (originalFileHash !== hashFileBody) {
      console.log(messages[102]);
      process.exit(102);
    } else {
      console.log(messages[0]);
      process.exit(0);
    }
  } catch (ignore) {}
};

checkFiles();
