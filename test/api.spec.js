
import { mdLinks } from '../src/api.js'

const absolutePathData = 'C:/www/LIM016-md-links/src/some/some1/example3.md'
const pathError = 'C:/www/LIM016-md-links/src/some/some1/example.md'
const absolutePathDataDirectory = 'C:/www/LIM016-md-links/src/some/some2'
const mdlinksValidateTrue = [
  {
    href: 'https://nodejs.org/es/',
    text: 'Node.js',
    file: 'C:/www/LIM016-md-links/src/some/some1/example3.md',
    status: 200,
    ok: 'ok'
  }
]
const mdlinksDirectoryValidateTrue = [
  {
    'href': 'https://nodejs.org/es/',
    'text': 'Node.js',
    'file': "C:\\www\\LIM016-md-links\\src\\some\\some2\\example3.md",
    'status': 200,
    'ok': 'ok'
  }
]
const mdlinksValidateFalse = [
  {
    href: 'https://nodejs.org/es/',
    text: 'Node.js',
    file: 'C:/www/LIM016-md-links/src/some/some1/example3.md'
  }
]

describe('mdLinks', () => {
  it('it is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('return objects array [{href, text, file}]', () => {
    return mdLinks(absolutePathData, {validate: false})
      .then((res) => {
        expect(res).toEqual(mdlinksValidateFalse);
      })
  });
  // it('return error', () => {
  //   mdLinks(pathError, {validate: false})
  //     .then((res, rej) => {
  //       const error = 'ENOENT'
  //       // expect(rej).toEqual(error);
  //     })
  // });
  it('return objects array with http status [{href, text, file, status, statusText}]', () => {
    return mdLinks(absolutePathData, {validate: true})
      .then((res) => {
        expect(res).toEqual(mdlinksValidateTrue);
      })
  });
  it('return objects array with http status [{href, text, file, status, statusText}] from directory', () => {
    return mdLinks(absolutePathDataDirectory, {validate: true})
      .then((res) => {
        expect(res).toEqual(mdlinksDirectoryValidateTrue);
      })
  });
});
