const { execSync } = require('child_process');

const LOCAL_PATH = './testFiles';
const GITHUB_URL = 'https://raw.githubusercontent.com/sergdenisov/skillbox-nodejs-test-task/main/testFiles';

describe('index.js tests', () => {
  it('should return error 100 when path is incorrect', () => {
    expect.assertions(1);

    let code = null;
    try {
      execSync(`node index.js ${LOCAL_PATH}/textFileWithRightHash.txt2`);
    } catch (e) {
      code = e.status;
    }

    expect(code).toStrictEqual(100);
  });

  it('should return error 100 when url is incorrect', () => {
    expect.assertions(1);

    let code = null;
    try {
      execSync(`node index.js ${GITHUB_URL}/textFileWithRightHash.txt2`);
    } catch (e) {
      code = e.status;
    }

    expect(code).toStrictEqual(100);
  });

  it('should return error 101 when no hash file nearby by path', () => {
    expect.assertions(1);

    let code = null;
    try {
      execSync(`node index.js ${LOCAL_PATH}/textFileWithWithoutHash.txt`);
    } catch (e) {
      code = e.status;
    }

    expect(code).toStrictEqual(101);
  });

  it('should return error 101 when no hash file nearby by url', () => {
    expect.assertions(1);

    let code = null;
    try {
      execSync(`node index.js ${GITHUB_URL}/binaryFileWithWithoutHash.png`);
    } catch (e) {
      code = e.status;
    }

    expect(code).toStrictEqual(101);
  });

  it('should return error 102 when hash is incorrect by path with text file', () => {
    expect.assertions(1);

    let code = null;
    try {
      execSync(`node index.js ${LOCAL_PATH}/textFileWithWrongHash.txt`);
    } catch (e) {
      code = e.status;
    }

    expect(code).toStrictEqual(102);
  });

  it('should return error 102 when hash is incorrect by url with text file', () => {
    expect.assertions(1);

    let code = null;
    try {
      execSync(`node index.js ${GITHUB_URL}/textFileWithWrongHash.txt`);
    } catch (e) {
      code = e.status;
    }

    expect(code).toStrictEqual(102);
  });

  it('should return error 102 when hash is incorrect by path with binary file', () => {
    expect.assertions(1);

    let code = null;
    try {
      execSync(`node index.js ${LOCAL_PATH}/binaryFileWithWrongHash.png`);
    } catch (e) {
      code = e.status;
    }

    expect(code).toStrictEqual(102);
  });

  it('should return error 102 when hash is incorrect by url with binary file', () => {
    expect.assertions(1);

    let code = null;
    try {
      execSync(`node index.js ${GITHUB_URL}/binaryFileWithWrongHash.png`);
    } catch (e) {
      code = e.status;
    }

    expect(code).toStrictEqual(102);
  });

  it('should return code 0 when hashes are equal by path with text file', () => {
    expect.assertions(1);

    expect(() => execSync(`node index.js ${LOCAL_PATH}/textFileWithRightHash.txt`)).not.toThrow();
  });

  it('should return code 0 when hashes are equal by url with text file', () => {
    expect.assertions(1);

    expect(() => execSync(`node index.js ${GITHUB_URL}/textFileWithRightHash.txt`)).not.toThrow();
  });

  it('should return code 0 when hashes are equal by path with binary file', () => {
    expect.assertions(1);

    expect(() => execSync(`node index.js ${LOCAL_PATH}/binaryFileWithRightHash.png`)).not.toThrow();
  });

  it('should return code 0 when hashes are equal by url with binary file', () => {
    expect.assertions(1);

    expect(() => execSync(`node index.js ${GITHUB_URL}/binaryFileWithRightHash.png`)).not.toThrow();
  });
});
