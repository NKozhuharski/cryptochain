const bodyParser = require("body-parser");
const { response } = require("express");
const express = require("express");
const request = require("request");
const Blockchain = require("./blockchain");
const PubSub = require("./app/pubsub");

const app = express();
const bitcoin = new Blockchain();
const pubsub = new PubSub({ blockchain: bitcoin });

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

app.use(bodyParser.json());

app.get("/api/blocks", (req, res) => {
  res.json(bitcoin.chain);
});

app.post("/api/mine", (req, res) => {
  const { data } = req.body;

  bitcoin.addBlock({ data });

  pubsub.broadcastChain();

  res.redirect("/api/blocks");
});

const syncChains = () => {
  request(
    { url: `${ROOT_NODE_ADDRESS}/api/blocks` },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const rootChain = JSON.parse(body);

        console.log("replace chain on a sync with", rootChain);
        bitcoin.replaceChain(rootChain);
      }
    }
  );
};

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
  console.log(`Server listen on port: ${PORT}`);

  if (PORT !== DEFAULT_PORT) {
    syncChains();
  }
});
