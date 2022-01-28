
# LIBRARY MG - LINKS 
![mglinks_banner](https://user-images.githubusercontent.com/74887104/151600044-e1081daa-c58a-45cd-b6dc-8994cff2d584.jpg)

It is a library that allows you to validate URLs inside markdown files. It will allow you to obtain: link status, total links, unique links and broken links.

## Author ✒️
[Mariana Guanda](https://github.com/marianagdeveloper)

***
## Getting started 🚀
These instructions will allow you to install the library on your local machine for development.

See Deployment for the library developed with Node.js.

### Installation 🔧
You can install it by npm:

```
$ npm i mg-links
```

## Guide to use ⚙️
You can run the library through the terminal:

```
mg-links <path-to-file> [options]
```

The paths entered can be **relative** or **absolute** and the options you can use are: `--help  -h`, `--stats  -s`, `--validate  -v`, or use both together `--stats --validate   -s -v`.

Case 1: `mg-links <path-to-file>`

![case1](https://user-images.githubusercontent.com/74887104/151602513-e840e3ad-eca2-488b-8ee5-15bae39fa3f7.png)

Case 2: `mg-links <path-to-file> --validate`

![case2](https://user-images.githubusercontent.com/74887104/151602746-8e0db320-287c-4c3e-b1ff-cc9735807a95.jpg)

Case 3: `mg-links <path-to-file> --stats`

![case3](https://user-images.githubusercontent.com/74887104/151602905-af398617-1dc1-465a-88f0-8023c8768cc3.jpg)

Case 4: `mg-links <path-to-file> --stats --validate` or `md-links <path-to-file> --validate --stats`

![case4](https://user-images.githubusercontent.com/74887104/151603035-603e5f5a-4862-41bd-87cd-85d8a0e3355f.jpg)

Case 5: `mg-links --help`

![case5](https://user-images.githubusercontent.com/74887104/151603205-f727b7dc-3cf9-4cc7-a95a-77a59525b5fb.jpg)

Case 6: When information is omitted or incorrect

![case6](https://user-images.githubusercontent.com/74887104/151603979-3ca3768d-e3e4-43dc-9182-4c083df009da.jpg)

## Flowcharts

API-flowchart

![Flowchart API MDLINKS](https://user-images.githubusercontent.com/74887104/151604403-2ea2ddb0-a2f4-4106-a6bf-92902a2eed06.jpg)

CLI-flowchart

![Flowchart CLI MDLINKS](https://user-images.githubusercontent.com/74887104/151604440-b2386c38-7d0e-427c-aadf-e4b1a6a4f6af.jpg)


## Built with 🛠️
* [Node.js](https://nodejs.org/en/) - Used to create the library
* [NPM](https://www.npmjs.com/) - Manage packages
* [Figlet](https://github.com/patorjk/figlet.js) - Generate banner
* [Chalk](https://github.com/chalk/chalk) - Used to style terminal output
* [CommonJS](https://nodejs.org/docs/latest/api/modules.html#modules-commonjs-modules) - Handle modules
* [node-fetch](https://www.npmjs.com/package/node-fetch) - Make HTTP calls

