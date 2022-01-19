import { mdLinks } from "./api.js";
import { onlyUnique } from "./utils.js";
import {
  printBanner,
  logWarning,
  logResults,
  logResultsCyan,
} from './messages.js'


const cli = (data) => {
  // console.log("data recibida en cli:", data);
  if (data.pathData == "" || data.pathData == "''") {
    logWarning(
      "Please enter a valid path. Example: md-links <path-to-file> [options]"
    );
  } else {
    printBanner();
    let arrOptions = Object.keys(data.optionsData);
    if (arrOptions.length == 1) {
      // option validate
      if (arrOptions.includes("validate")) {
        mdLinks(data.pathData, data.optionsData)
          .then((links) => {
            console.log(logResults("*** RESULT: *** "));
            console.table(links);
            // => [{ href, text, file, status, ok }, ...]
          })
          .catch(console.error);
      } else {
        // option stats
        mdLinks(data.pathData, data.optionsData)
          .then((links) => {
            let uniqueArray = [];
            links.filter((link) => {
              for (const property in link) {
                if (property == "href") {
                  uniqueArray.push(`${property}: ${link[property]}`);
                }
              }
            });

            var unique = uniqueArray.filter(onlyUnique);
            console.log(logResultsCyan("*** STATS MD-LINKS *** "));
            console.log("Total:", links.length);
            console.log("Unique:", unique.length);
            // => [{ href, text, file, status, ok }, ...]
          })
          .catch(console.error);
      }
    }
    if (arrOptions.length == 2) {
      // option stats
      mdLinks(data.pathData, data.optionsData)
        .then((links) => {
          let uniqueArray = [];
          let brokenArray = [];
          links.filter((link) => {
            for (const property in link) {
              if (property == "href") {
                uniqueArray.push(`${property}: ${link[property]}`);
              }
              if (property == "ok") {
                brokenArray.push(`${link[property]}`);
              }
            }
          });

          let unique = uniqueArray.filter(onlyUnique);
          let broken = brokenArray.filter((b) => b.includes("fail"));
          console.log(logResultsCyan("*** VALIDATE AND STATS MD-LINKS *** "));
          console.log("Total:", links.length);
          console.log("Unique:", unique.length);
          console.log("Broken:", broken.length);
          // => [{ href, text, file, status, ok }, ...]
        })
        .catch(console.error);
    }
  }
};

export { cli };
