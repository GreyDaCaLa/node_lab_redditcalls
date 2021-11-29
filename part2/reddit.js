// first we did "npm init -y"
// then we did npm i isomorphic-fetch
// then we add to this file the --const fetch = require("isomorphic-fetch");

const fetch = require("isomorphic-fetch");
const {createWriteStream}= require("fs");

async function fetchredditarticles() {
    let artArray=[];

    const res = await fetch("https://reddit.com/r/popular.json")

    const arraybuffer = await res.arrayBuffer();
    const buffer = JSON.parse(Buffer.from(arraybuffer).toString());

    for(art of buffer.data.children){
        artArray.push({"title":art.data.title, "author":art.data.author,"url":art.data.url});
    }


    // Buffer.from(JSON.stringify(artArray));



    const writeStream = createWriteStream("./popular-articles.json");
    // console.log(buffer.data.children[0].data.title)
    // console.log(buffer.data.children[0].data.author)
    // console.log(buffer.data.children[0].data.url)
    writeStream.write(Buffer.from(JSON.stringify(artArray))); // the write method can take a string or a buffer
}



fetchredditarticles();






