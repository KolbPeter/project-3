import fetch from "node-fetch";
import settings from "../../modules/settings.js";

let name = "Elvis";

let url = settings.url + ":" + settings.port + "/hello/" + name;
console.log("Fetching " + url);

fetch(url)
  .then((res) => res.text())
  .then((text) => console.log("Our server said: " + text));

let file = "prooba.txt";
let number = 888;
let file1url =
  settings.url + ":" + settings.port + "/write/" + file + "/" + number;
fetch(file1url, { method: "POST" })
  .then((res) => res.text())
  .then((text) => console.log(text));

let file2url = settings.url + ":" + settings.port + "/write/" + file;
fetch(file2url, { method: "GET" })
  .then((res) => res.text())
  .then((text) => console.log(text));
