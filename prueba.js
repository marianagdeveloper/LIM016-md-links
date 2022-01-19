import {mdLinks} from "./index.js";
import chalk from 'chalk';
import figlet from 'figlet';

figlet('M G - L I N K S', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.bold.green(data))
    console.log(chalk.inverse.green(' *** RESULT: *** '))
});

// var string = 'C:\\www\\LIM016-md-links\\src\\some\\some1\\example3.md'
// var length = 8;
// var trimmedString = string.substring(0, length);
// console.log( trimmedString)

// let file = 'C:\\www\\LIM016-md-links\\src\\some\\some1\\example3.md'
// console.log('file.length', file.length )
// let fref = 'https://es.wikipedia.org/wiki/Markdown'
// console.log('fref', fref.length);


// ----------------md file whitout links
// mdLinks("./src/some/some1/example4.md")
//   .then(links => {
//     console.log('links:', links); // => [{ href, text, file }, ...]
//   })
//   .catch(console.error);

// //---------------- md file whit one link without validate
// mdLinks("./src/some/example.md")
//   .then(links => {
//     console.table(links);
//     // => [{ href, text, file, status, ok }, ...]
//   })
//   .catch(console.error);

// ----------------md file whit 2 links
mdLinks("./src/some/example2.md", { validate: true })
  .then(links => {
    console.table(links);
    console.log(links);
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

// // ----------------md file whit one fail link
// mdLinks("./src/some/some1/example5.md", { validate: true })
//   .then(links => {
//     console.log('md file whit file link:', links);
//     // => [{ href, text, file, status, ok }, ...]
//   })
//   .catch(console.error);

// // ----------------md file whit one fail link
// mdLinks("./src/some/some1/example5.md", { validate: true })
//   .then(links => {
//     console.log('md file whit file link:', links);
//     // => [{ href, text, file, status, ok }, ...]
//   })
//   .catch(console.error);

// // ----------------Readme
  // mdLinks("README.md", { validate: false })
  // .then(links => {
  //   console.log(links);
  //   // => [{ href, text, file, status, ok }, ...]
  // })
  // .catch(console.error);

  // ----------------txt File
  // mdLinks("./src/some/example.txt", { validate: true })
  // .then(links => {
  //   console.log('txt File', links);
  // })
  // .catch(console.error);

// ----------------Directory
// mdLinks("./src/some/", { validate : true})
//   .then(links => {
//     console.log('Directory', links);
//   })
//   .catch(console.error);

// // ----------------Directory
// mdLinks("./src/some/some1", { validate : false})
//   .then(links => {
//     console.table(links);
//   })
//   .catch(console.error);
