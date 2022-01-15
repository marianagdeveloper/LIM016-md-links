//md-links
import {mdLinks} from "./index.js";

// md file whitout links
// mdLinks("./src/some/some1/example4.md")
//   .then(links => {
//     console.log('md file whitout links:', links); // => [{ href, text, file }, ...]
//   })
//   .catch(console.error);

// // md file whit one link without validate
// mdLinks("./src/some/example.md")
//   .then(links => {
//     console.log('md file whit 1 link:', links);
//     // => [{ href, text, file, status, ok }, ...]
//   })
//   .catch(console.error);

// md file whit one link
// mdLinks("./src/some/example2.md", { validate: true })
//   .then(links => {
//     console.log('md file whit 1 link:', links);
//     // => [{ href, text, file, status, ok }, ...]
//   })
//   .catch(console.error);

// md file whit one fail link
// mdLinks("./src/some/some1/example5.md", { validate: true })
//   .then(links => {
//     console.log('md file whit file link:', links);
//     // => [{ href, text, file, status, ok }, ...]
//   })
//   .catch(console.error);

// // Readme
//   mdLinks("README.md", { validate: true })
//   .then(links => {
//     console.log('README.md:', links);
//     // => [{ href, text, file, status, ok }, ...]
//   })
//   .catch(console.error);

  // txt File
  // mdLinks("./src/some/example.txt", { validate: true })
  // .then(links => {
  //   console.log('txt File', links);
  // })
  // .catch(console.error);

// Directory
mdLinks("./src/some/some1", { validate : false})
  .then(links => {
    console.log('Directory', links);
  })
  .catch(console.error);
