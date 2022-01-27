import { readFile, readFileSync } from "fs";
import { JSDOM } from "jsdom";
import { Remarkable } from "remarkable";
import path from "path";
import dir from "node-dir";
import fetch from "node-fetch";
var md = new Remarkable();

// P TESTED :Uniques Links
const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
}

// TESTED :HTTP status
const statusHttp = (link, callback) => {
  let status;
  fetch(link)
    .then((res) => {
      status = res.status;
      callback(status);
    })
    .catch(() => {
      status = 404;
      callback(status);
    });
};

// TESTED :Reading directory recursive
const readDirectoriesRecursive = (directory, allFilesMD) => {
  dir.files(directory, function (err, files) {
    if (err) throw err;
    allFilesMD(files.filter((file) => extMD(file)));
  });
};


// TESTED :Absolute route?
const absolutePath = (pathData) => {
  return path.isAbsolute(pathData);
};

// TESTED :Convert in Absolute route
const absolutePathResolve = (pathData) => {
  return path.resolve(pathData);
};

// TESTED :Details path
const pathDetails = (pathData) => {
  return path.parse(pathData);
};

// P TESTED : Convert file in HTML
const fileConvertedInHTML = (data) => {
  return md.render(data);
};

// P TESTED :Search links
const linksInFile = (dataHTML) => {
  // console.log('dataHTML', dataHTML)
  const dom = new JSDOM(dataHTML);
  const hrefData = dom.window.document.querySelectorAll("a");
  // console.log('linksInFile:',hrefData[0].textContent);
  return hrefData;
};

// TESTED : Read file
const readFileData = (url, printFile) => {
  // readFile(url, "utf8", (err, data) => {
  //   if (err) {
  //     throw err;
  //   }
  //   printFile(data);
  // });
  const data = readFileSync(url);
  printFile(data);
};

// PF con Marianao
// Estrategia para convertir funciones asincronas
// Incialmente usando callbacks ahora usando promesas
// Y viceversa podemos convertir promesas en callbacks
// const readFileDataPromise = (url) => {
//   return new Promise((reject, resolve) => {
//     readFile(url, "utf8", (err, data) => {
//       if (err) reject(err);
//       resolve(data);
//     });
//   })
// };

// TESTED : Ext file ".md"
const extMD = (file) => path.extname(file) == ".md";

export {
  readDirectoriesRecursive,
  absolutePath,
  absolutePathResolve,
  pathDetails,
  fileConvertedInHTML,
  readFileData,
  linksInFile,
  extMD,
  statusHttp,
  onlyUnique,
};
