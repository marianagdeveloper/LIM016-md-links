import {absolutePath, extMD, absolutePathResolve} from '../src/utils';

const absolutePathData = 'C:/www/LIM016-md-links/src/some/example2.md'
const relativePathData = './src/some/example2.md'
const pathRelativeToAbsolute = "C:\\www\\LIM016-md-links\\src\\some\\example2.md"
const extMDData = 'example2.md'
const extMDDataIsFalse = 'example2.txt'

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




