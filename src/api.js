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
} from "./utils.js";

function linksWithOptionValidate(link, routeFileMD) {
  // console.log('link:', link);
  return new Promise(function (resolve, reject) {
    statusHttp(link.href, resultStatusHttp);
    function resultStatusHttp(statusData) {
      const arrayLinks = [];
      const messageOk = statusData >= 200 && statusData < 300 ? "ok" : "fail";
      arrayLinks.push({
        href: link.href,
        text: link.textContent,
        file: routeFileMD,
        status: statusData,
        ok: messageOk,
      });
      // console.log('arrayLinks:', arrayLinks);
      resolve(arrayLinks);
    }
  });
}

function fileToLinks(data, routeFileMD, optionsData) {
  return new Promise(function (resolve, reject) {
    let promises = [];
    const arrayLinks = [];
    const fileHTML = fileConvertedInHTML(data);
    const hrefData = linksInFile(fileHTML);
    if (hrefData.length > 0) {
      hrefData.forEach((link, index) => {
        if (optionsData.validate == true) {
          promises[index] = new Promise(function (resolve, reject) {
            linksWithOptionValidate(link, routeFileMD).then((result) => {
              resolve(result);
            });
          });
        } else {
          arrayLinks.push({
            href: link.href,
            text: link.textContent,
            file: routeFileMD,
          });
          return resolve(arrayLinks);
        }
      });
      // Ready foreach links
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
    if (hrefData.length == 0) {
      resolve(arrayLinks);
    }
  });
}

const mdLinks = (pathData, optionsData) => {
  return new Promise(function (resolve, reject) {
    if (pathData == undefined || pathData == "") {
      return console.log('Path Invalid !!!');;
    }
    let arrayPromises = [];
    let flagContent = "";
    let filePromise;
    let pathResolve = absolutePath(pathData)
      ? pathData
      : absolutePathResolve(pathData);
    let pathContent = pathDetails(pathResolve);
    flagContent =
      pathContent.ext === ""
        ? "directory"
        : pathContent.ext === ".md"
        ? "fileMD"
        : "fileNoMD";

    if (flagContent === "fileNoMD") {
      reject(console.log("Do not exist MD file"));
    }

    if (flagContent === "fileMD") {
      filePromise = new Promise(function (resolve, reject) {
        readFileData(pathResolve, (data) => {
          resolve(
            fileToLinks(data, pathResolve, optionsData || { validate: false })
          );
          reject("Error reading MD file");
        });
      });
      resolve(
        filePromise
      );
    }

    if (flagContent === "directory") {
      readDirectoriesRecursive(pathResolve, readAllFilesMD);
      function readAllFilesMD(files) {
        // console.log('files:', files);
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
              resolve(
                fileToLinks(
                  data,
                  routeFileMD,
                  optionsData || { validate: false }
                )
              );
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
