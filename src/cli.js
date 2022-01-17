import { mdLinks } from "./api.js";
import chalk from "chalk";
import figlet from "figlet";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const cli = (data) => {
  // console.log('data recibida en cli:', data);
  if (data.pathData == "") {
    console.log(
      chalk.inverse.yellow(
        "Please enter a valid path. Example: md-links <path-to-file> [options]"
      )
    );
  } else {
    // console.log('(Object.keys(data.optionsData):', (Object.keys(data.optionsData)));
    let arrOptions = Object.keys(data.optionsData);
    // console.log('incluye solo validate:', arrOptions.includes('validate'), 'legth:', arrOptions.length);

    if (arrOptions.length == 1) {
      // option validate
      if ( arrOptions.includes('validate')) {
        figlet("M D - L I N K S", function (err, banner) {
          if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
          }
          console.log(chalk.bold.green(banner));
        });
        mdLinks(data.pathData, data.optionsData)
          .then((links) => {
            console.log(chalk.inverse.green(" *** RESULT: *** "));
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
                if (property == 'href') {

                  uniqueArray.push(`${property}: ${link[property]}`);
                }
              }
             })

            //  console.log('uniqueArray', uniqueArray);
              var unique = uniqueArray.filter( onlyUnique );
              // console.log("🚀 ~ file: cli.js ~ line 56 ~ .then ~ unique", unique)
              console.log(chalk.bold.cyan(" *** STATS MD-LINK *** "));
              console.log('Total:', links.length);
              console.log('Unique:', unique.length);
              // => [{ href, text, file, status, ok }, ...]
            })
            .catch(console.error);

      }
    }
    if (arrOptions.length == 2){
      // option stats
      mdLinks(data.pathData, data.optionsData)
      .then((links) => {

        let uniqueArray = [];
        let brokenArray = [];
       links.filter((link) => {
        for (const property in link) {
          if (property == 'href') {

            uniqueArray.push(`${property}: ${link[property]}`);
          }
          if (property == 'ok') {

            brokenArray.push(`${link[property]}`);
          }
        }
       })

      //  console.log('uniqueArray', uniqueArray);
        var unique = uniqueArray.filter( onlyUnique );
        var broken = brokenArray.filter( b => b.includes('fail'));
        // console.log("🚀 ~ file: cli.js ~ line 56 ~ .then ~ unique", unique)
        console.log(chalk.bold.blue(" *** STATS MD-LINK *** "));
        console.log('Total:', links.length);
        console.log('Unique:', unique.length);
        console.log('Broken:', broken.length);
        // => [{ href, text, file, status, ok }, ...]
      })
      .catch(console.error);
    }

  }
};

export { cli };
