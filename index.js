import {
  readDirectoriesRecursive,
  absolutePath,
  absolutePathResolve,
  pathDetails,
  readFileData,
  linksInFile,
  fileConvertedInHTML,
  extMD,
  statusHttp,
} from "./src/utils.js";

function linksWithOptionValidate(link, routeFileMD) {
  return new Promise(function (resolve, reject) {
    statusHttp(link.href, resultStatusHttp);
    function resultStatusHttp(statusData) {
      const arrayLinks = [];
      const messageOk = (statusData >= 200 && statusData < 300 ) ? 'ok' : 'fail'
      arrayLinks.push({
        href: link.href,
        text: link.textContent,
        file: routeFileMD,
        status: statusData,
        ok: messageOk,
      });
      resolve(arrayLinks);
    }
  });
}

function fileToLinks(data, routeFileMD, optionsData) {
  return new Promise (function(resolve, reject) {
    let promises = [];
    const arrayLinks = [];
    const fileHTML = fileConvertedInHTML(data);
    const hrefData = linksInFile(fileHTML);
    console.log(hrefData.length);
    if (hrefData.length > 0 ) {
      hrefData.forEach((link, index) => {

        if (optionsData.validate == true ) {
          promises[index] = new Promise (function (resolve, reject) {
            linksWithOptionValidate(link, routeFileMD).then((result) => {
              resolve(result)
            });
          })
        }
        else {
          arrayLinks.push({
            href: link.href,
            text: link.textContent,
            file: routeFileMD,
          });
          return resolve(arrayLinks)
        }
      });
      // Ready foreach
        Promise.all([...promises]).then((result) => {
          let todoLinks = [];
          result.forEach((promise) => {
            promise.forEach((link) => {
              todoLinks.push(link);
            });
          });
          resolve(todoLinks);
      });

    }
  })

}

const mdLinks = (pathData, optionsData) => {
  return new Promise(function (resolve, reject) {
    let arrayPromises = [];
    let flagContent = '';
    let filePromise;
    let pathResolve = absolutePath(pathData)
      ? pathData
      : absolutePathResolve(pathData);
    let pathContent = pathDetails(pathResolve);
    flagContent = (pathContent.ext === "")
        ? "directory"
        : pathContent.ext === ".md"
        ? "fileMD"
        : "fileNoMD";

        console.log('flagContent::::', flagContent);

    if (flagContent === "fileNoMD") {
      reject(console.log("Do not exist MD file"));
    }

    if (flagContent === "fileMD") {
      filePromise = new Promise(function (resolve, reject) {
        readFileData(pathResolve, (data) => {
          resolve(fileToLinks(data, pathResolve, optionsData || { validate : false}));
          reject("Error reading MD file");
        });
      });
      resolve(filePromise);
    }

    if (flagContent === "directory") {
      readDirectoriesRecursive(pathResolve, readAllFilesMD);
      function readAllFilesMD(files) {
        const conditionFilesMD = files.filter((file) => extMD(file));
        const existFilesMD =
          conditionFilesMD.length > 0
            ? conditionFilesMD
            : "Do not exist MD file in this directory";

        for (let index = 0; index < existFilesMD.length; index++) {
          const fileMD = existFilesMD[index];
          const routeFileMD = fileMD;
          arrayPromises[index] = new Promise(function (resolve, reject) {
            readFileData(routeFileMD, (data) => {
              resolve(fileToLinks(data, routeFileMD, optionsData || { validate : false}));
            });
          });
        }

        Promise.all([...arrayPromises]).then((resolvePromises) => {
          let todoLinks = [];
          resolvePromises.forEach((promise) => {
            promise.forEach((link) => {
              todoLinks.push(link);
            });
          });
          resolve(todoLinks);
        });
      }
    }
  });
};

export { mdLinks };
