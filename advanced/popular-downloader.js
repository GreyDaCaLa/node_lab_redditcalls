// first we did "npm init -y"
// then we did npm i isomorphic-fetch
// then we add to this file the --const fetch = require("isomorphic-fetch");

const fetch = require("isomorphic-fetch");
const { createWriteStream } = require("fs");

async function fetchredditarticles() {
  let artArray = [];

  const res = await fetch("https://reddit.com/r/popular.json");

  const arraybuffer = await res.arrayBuffer();
  const buffer = JSON.parse(Buffer.from(arraybuffer).toString());

  for (art of buffer.data.children) {
    artArray.push({
      title: art.data.title,
      author: art.data.author,
      url: art.data.url,
      id: art.data.id,
    });
  }

  console.log(artArray[0].url);
  console.log(artArray[0].url.endsWith(".jpg"));

  console.log(artArray[1].url);
  console.log(artArray[1].url.endsWith(".jpg"));
  console.log(artArray[2].url);
  console.log(artArray[2].url.endsWith(".jpg"));

  // const writeStream = createWriteStream("./popular-articles.json");
  // writeStream.write(Buffer.from(JSON.stringify(artArray))); // the write method can take a string or a buffer
  // return artArray;

  console.log("=====start");
  // console.log(artList)
  console.log("=====after fetch");
  let total = 0;
  let track = 0;
  for (art of artArray) {
    total += 1;
    if (art.url.endsWith(".jpg")) {
      track += 1;
      downloadmedia(art.url, "./download/" + art.id + ".jpg");
    } else if (art.url.endsWith(".gif")) {
      track += 1;
      downloadmedia(art.url, "./download/" + art.id + ".gif");
    } else if (art.url.endsWith(".png")) {
      track += 1;
      downloadmedia(art.url, "./download/" + art.id + ".png");
    }
  }

  console.log("total", total);
  console.log("track", track);
}

async function downloadmedia(mediaURL, destination) {
  const res = await fetch(mediaURL);
  const arraybuffer = await res.arrayBuffer();
  // const buffer = JSON.parse(Buffer.from(arraybuffer).toString());
  const buffer = Buffer.from(arraybuffer);

  const writeStream = createWriteStream(destination);
  writeStream.write(buffer); // the write method can take a string or a buffer
}



fetchredditarticles();