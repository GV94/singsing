const fetch = require("node-fetch");
const cheerio = require("cheerio");
const http = require("http");

const scrape = async (artist, track) => {
  const artistSlug = artist
    .split(" ")
    .map((w) => {
      let [first, ...rest] = w;
      return `${first.toUpperCase()}${rest.join("")}`;
    })
    .join("-")
    .split(",")
    .join("");
  const trackSlug = track
    .split(" ")
    .map((w) => {
      let [first, ...rest] = w;
      return `${first.toUpperCase()}${rest.join("")}`;
    })
    .join("-")
    .split(",")
    .join("");
  console.log(
    "Finding ",
    `https://www.musixmatch.com/lyrics/${artistSlug}/${trackSlug}`
  );
  const response = await fetch(
    `https://www.musixmatch.com/lyrics/${artistSlug}/${trackSlug}`,
    {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en,en-US;q=0.9,sv;q=0.8",
        "cache-control": "no-cache",
      },
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
    }
  );

  const text = await response.text();
  const $ = cheerio.load(text);
  let nodes = $("span.lyrics__content__ok, span.lyrics__content__error");
  let data = "";
  nodes.map((n) => nodes[n].children.map((c) => (data += c.data)));
  data = data.split("\n");
  let parts = [[]];
  let currentPart = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] === "") {
      currentPart++;
      parts[currentPart] = [];
    } else {
      parts[currentPart].push(data[i]);
    }
  }
  const partToReturn = Math.random() * parts.length;
  const [firstLine, secondLine, ...rest] = parts[Math.floor(partToReturn)];
  return {
    youSing: [firstLine, secondLine],
    theySing: rest,
  };
};

function getReqData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      // listen to data sent by client
      req.on("data", (chunk) => {
        // append the string version to the body
        body += chunk.toString();
      });
      // listen till the end
      req.on("end", () => {
        // send back the data
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(error);
    }
  });
}

const server = http.createServer(async (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/api/getLyrics" && req.method === "POST") {
    const data = await getReqData(req);
    console.log(data, data.artist, data.track);
    if (!data.artist || !data.track) {
      res.writeHead(400);
      res.write("Bad Request");
      res.end();
      return;
    }

    const { artist, track } = data;
    scrape(artist, track).then((lyric) => {
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.write(JSON.stringify(lyric));
      res.end();
    });
  }
});

server.listen(process.env.PORT || 3001, () => {
  console.log("Server is listening on port", process.env.PORT || 3001);
});
