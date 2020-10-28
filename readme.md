# Lesson 3

## Forget webpack (for a while)

Ok, we run forward a bit with using webpack for such a simple project we are working on recently. This was so obvious for me to use it, I forgot that you can work without using it. So, this is an other simple expressjs project, that works without webpack. I am sure, that webpack will be back soon, but for now we can stop using it.

So, there is no transpiling, compiling yet, our bare codes will be running.

A normal nodejs project uses **commonjs** modules, but we dont like that. It's much better to use **ES6** (Ecmascript 6) standard modules. To enable it in a nodejs project, you need to add the following line to the `package.json` file:

```js
"type": "module",
```

## Folder structure (add some complexity)

As you can see, I've changed the structure of our `src` folder. You can find two folders there. One of them is `app` where we store the applications we develop under the project. You can find the **server** and the **client** (it was your homework) app there too. Both application's _main_ file is their own `index.js`. You can find a `modules` three places under `src`. One for each appications - you can store application specific modules there - and there is one right under `src`. You can put _common modules_ for both of your applications. I've put a settings file there, which exports only a data scrutcture.

## Client

I've added `note-fetch` to the project. You can do this is multiple ways.

- add it to the `package.json` dependencies manually
- or using this command: `npm install -s node-fetch` (-s saves the module as dependency)

```js
// Load node-fetch as fetch
import fetch from "node-fetch";
// Load our settings as settings
import settings from "../../modules/settings.js";

let name = "Elvis";

// Let's construct our url
let url = settings.url + ":" + settings.port + "/hello/" + name;

// we are fetching an url
fetch(url) // it returns a promise
  // when it was successfull it resolves whit a response object
  .then((res) => res.text()) // we ask for the text from the response
  // if its ok, the promise resolves with the text
  .then((text) => console.log("Our server said: " + text)); // now we can print out the response text to the output
```

If you understand javascript promises, it simple as three lines of code.

## File read

Now we will improve our project a bit.

Add these lines to your server app:

```js
//import the filesystem module
import fs from "fs";
```

```js
// add a new route to our porject
app.get("/readfile", (req, res) => {
  // when it matches it reads a the "readme.md" (this) file from the project root
  let data = fs.readFileSync("./readme.md");
  // ands sends in the response
  res.send(data);
});
```

You can test it in your browser, just address `http://localhost:3000/Hello`.

You can test it in your browser, just address `http://localhost:3000/readfile`.

You can test it in your browser, just address `http://localhost:3000/readfilesync`.

## Homework

- read about the nodejs [file system api](https://nodejs.org/api/fs.html). You will se almost all methods have a _normal_ version and a **Sync** version. Normal versions are works with callbacks - not promises, but you can ["promisify"](https://javascript.info/promisify) tham if you have to. The **synced** versions are really not effective in a server environment - like ours - because it blocks the server, but much easyer to use!

- change the code to read the file with the _asyncronous_ `readFile` method!

- create a `data` folder in your porject!

- create an other route, that accepts `get`request with a file parameter (`/write/:file`). If the file does not exists in the `data` folder (_fs.isFile()_) create it, and write "1" into the file. If it exists, read it, increase the counter with one and write it back!

- create an other route, that accepst `post` request with two params (`/write/:file/:number`). Whether the file exists or not, write the _number_ parameter into the _file_!

- install the [postman](https://www.postman.com/) application. It's much easier to test your API with that!

- create methods to the client app to call the urls we defined prevously! (use the [fetch api](https://github.com/node-fetch/node-fetch)!)
