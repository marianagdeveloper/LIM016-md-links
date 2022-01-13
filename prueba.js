//md-links
import {mdLinks} from "./index.js";

// mdLinks("./src/some/example.md")
//   .then(links => {
//     console.log('prueba:', links); // => [{ href, text, file }, ...]
//   })
//   .catch(console.error);

// mdLinks("./src/some/example.md", { validate: true })
//   .then(links => {
//     console.log('prueba:', links);
//     // => [{ href, text, file, status, ok }, ...]
//   })
//   .catch(console.error);

  // mdLinks("README.md", { validate: true })
  // .then(links => {
  //   console.log(links);
  //   // => [{ href, text, file, status, ok }, ...]
  // })
  // .catch(console.error);

  // mdLinks("./src/some/example.txt", { validate: true })
  // .then(links => {
  //   console.log(links);
  //   // => [{ href, text, file, status, ok }, ...]
  // })
  // .catch(console.error);

mdLinks("./src/some")
  .then(links => {
    console.log(links);
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);