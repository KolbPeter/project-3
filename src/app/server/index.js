import express from "express";
import settings from "../../modules/settings.js";
//import the filesystem module
import fs from "fs";
import path from "path";
import util from "util";

const app = express();
const readFileContent = util.promisify(fs.readFile);

app.get("/hello/:name", (req, res) =>
  res.send("Hello " + req.params.name + "!")
);

app.listen(settings.port);

// add a new route to our porject
app.get("/readfile", (req, res) => {
  // when it matches it reads a the "readme.md" (this) file from the project root
  let data = fs.readFileSync("../../../readme.md");
  // ands sends in the response
  res.send(data);
});

app.get("/readfilesync", (req, res) => {
  fs.readFile("../../../readme.md", (err, data) => {
    if (err) throw err;
    res.send(data);
    console.log(data);
  });
});

function CreateOrInc(file) {
  var content = 1;
  if (!fs.existsSync(file)) {
    fs.appendFile(file, content, () => {});
    return content;
  } else {
    readFileContent(file)
      .then((buff) => {
        let content = Number(buff) + 1;
        fs.writeFile(file, content, () => {});
        return content;
      })
      .catch((err) => {
        throw err;
      });
  }
}

app.get("/write/:file", (req, res) => {
  let file = path.join("Data", req.params.file);
  let data = CreateOrInc(file);
  console.log(data);
  res.send("Contents of file " + file + " modified to " + data + ".");
});

function WriteInFile(file, number) {
  if (!fs.existsSync(file)) {
    fs.appendFileSync(file, number);
  } else {
    fs.writeFileSync(file, number);
  }
}

app.post("/write/:file/:number", (req, res) => {
  let file = path.join("Data", req.params.file);
  WriteInFile(file, req.params.number);
  res.send(`Written into file: ${file}, number: ${req.params.number}`);
});
