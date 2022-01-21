import {
  absolutePath,
  extMD,
  absolutePathResolve,
  readFileData,
  pathDetails,
  readDirectoriesRecursive,
} from '../src/utils';

const absolutePathData = 'C:/www/LIM016-md-links/src/some/some1/example3.md'
const relativePathData = './src/some/example2.md'
const pathRelativeToAbsolute = "C:\\www\\LIM016-md-links\\src\\some\\example2.md"
const extMDData = 'example2.md'
const extMDDataIsFalse = 'example2.txt'
const pathDetailsData = {
  root: 'C:/',
  dir: 'C:/www/LIM016-md-links/src/some/some1',
  base: 'example3.md',
  ext: '.md',
  name: 'example3'
}
const pathDirectoryRecursiveData = 'C:/www/LIM016-md-links/src/some/some1'
const readDirectoriesRecursiveData = [
  'C:\\www\\LIM016-md-links\\src\\some\\some1\\example3.md',
  'C:\\www\\LIM016-md-links\\src\\some\\some1\\example4.md',
  'C:\\www\\LIM016-md-links\\src\\some\\some1\\example5.md'
];
const fileMarkdown = 'C:/www/LIM016-md-links/src/some/some1/example3.md'

describe('absolutePath', () => {
  it('return true if path is absolute', () => {
    expect(absolutePath(absolutePathData)).toBe(true);
  });
  it('return false if path is not absolute', () => {
    expect(absolutePath(relativePathData)).toBe(false);
  });
});

describe('extMD', () => {
  it('return true if extension file is .md', () => {
    expect(extMD(extMDData)).toBe(true);
  });
  it('return false if extension file is not .md', () => {
    expect(extMD(extMDDataIsFalse)).toBe(false);
  });
});

describe('absolutePathResolve', () => {
  it('return absolute path if the path is relative', () => {
    expect(absolutePathResolve(relativePathData)).toEqual(pathRelativeToAbsolute);
  });
});

// describe.only and fit en vez de it me permite solo testear esa funcion
describe('readFileData', () => {
  it('if function callback printfile receive file from readFile', (done) => {
    function callback(data) {
      expect(data).toBe('[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript.\r\n')
      done();
    }
    readFileData(absolutePathData, callback);
  });
});

describe('pathDetails', () => {
  it('return object with details of path: root, dir, base, ext, name', () => {
      expect(pathDetails(absolutePathData)).toEqual(pathDetailsData);
  });
 });

 // describe.only and fit en vez de it me permite solo testear esa funcion
describe.only('readDirectoriesRecursive', (done) => {
  fit('if function callback allFilesMD receive only files .md from a directory', (done) => {
    function callback(data) {
      // console.log(data);
      expect(data).toEqual(readDirectoriesRecursiveData)
      done();
    }
    readDirectoriesRecursive(pathDirectoryRecursiveData, callback);
  });
});





