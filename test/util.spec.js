import {
  absolutePath,
  extMD,
  absolutePathResolve,
  readFileData,
  pathDetails,
  readDirectoriesRecursive,
  fileConvertedInHTML,
  linksInFile,
  onlyUnique,
  statusHttp
} from '../src/utils';

const fileHTML = '<p><a href="https://nodejs.org/es/">Node.js</a> es un entorno de ejecución para JavaScript.</p>';
const absolutePathData = 'C:/www/LIM016-md-links/src/some/some1/example3.md'
const errorPathData = 'C:/www/LIM016-md-links/src/some/some1/example8.md'
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
const pathDirectoryRecursiveData = 'C:/www/LIM016-md-links/src/some/some2'
const readDirectoriesRecursiveData = [
  "C:\\www\\LIM016-md-links\\src\\some\\some2\\example3.md",
];
const fileMarkdown = '[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript.\r\n'

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
  it('if function callback printfile receive file from readFile', () => {
    function callback(data) {
      expect(data).toBe(fileMarkdown)
      // done();
    }
    readFileData(absolutePathData, callback);
  });
  // it('error readFile', () => {
  //   function callback(error1) {
  //     const errorENOENT = 'ENOENT'
  //     // expect(error1).toBe(errorENOENT)
  //   }
  //   readFileData(errorPathData, callback);
  // });
});

describe('pathDetails', () => {
  it('return object with details of path: root, dir, base, ext, name', () => {
      expect(pathDetails(absolutePathData)).toEqual(pathDetailsData);
  });
 });

describe('readDirectoriesRecursive', () => {
  it('if function callback allFilesMD receive files from a directory', () => {
    function callback(data) {
      // console.log(data);
      expect(data).toEqual(readDirectoriesRecursiveData)
      // done();
    }
    readDirectoriesRecursive(pathDirectoryRecursiveData, callback);
  });
});

// tested
describe.only('fileConvertedInHTML', () => {
  fit('return file Markdonw converted in HTML', () => {
    const result = fileConvertedInHTML(fileMarkdown)
    // console.log(result.toString());
    expect(result.toString().trim()).toEqual(fileHTML.trim())
  });
 });

 // PENDING
describe('linksInFile', () => {
  it('return file Markdonw converted in HTML', () => {
    const result = linksInFile(`[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript.`)
    // console.log(result.toString());
    // const resultado = result[0].textContent;
    // expect(resultado).toEqual('Node.js')
  });
 });

 // PENDING
 describe.only('onlyUnique', () => {
  it.only('unique link', () => {
    const link = onlyUnique('https://nodejs.org/es/',0,['href: https://nodejs.org/es/'])
    expect(link).toBe(true);
  });
  // it('return false if path is not absolute', () => {
  //   expect(absolutePath(relativePathData)).toBe(false);
  // });
});

describe('statusHttp', () => {
  it('return status http 200', () => {
    function callback(data) {
      if (data == 200) {
        expect(data).toBe(200)
        done();
      } else {
        expect(data).toBe(404)
        done();
      }
    }
    statusHttp(absolutePathData, callback);
  });
});





