const express = require("express");
const router = express.Router();
const qs = require("qs");
const https = require("https");
const uniqid = require("uniqid");
const base64 = require("base-64");

const { generatorRandom, hash } = require("../lib/util");

router.get("/", (req, res, next) => {
  res.end("sms");
});

/* GET home page. */
router.post("/send", async function (req, res, next) {
  const { to } = req.body;
  // console.log({ to, apiKey: process.env.SMS_API_KEY });
  const authorization = base64.encode(`spring3420:${process.env.SMS_API_KEY}`);
  // console.log({ authorization });
  const random = generatorRandom(6);

  const postData = qs.stringify({
    phone: to,
    callback: "01030363420",
    message: `[playlist-M] SMS 인증번호: ${random}`,
    refkey: uniqid(),
  });
  // console.log({ postData });

  const options = {
    method: "POST",
    hostname: "sms.gabia.com",
    path: "/api/send/sms",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(postData),
      Authorization: `Basic ${authorization}`,
    },
  };
  console.log({ options });
  const hashed = await hash(random);

  try {
    const request = await https.request(options, (msg) => {
      const chunks = [];

      msg.on("data", (chunk) => {
        // console.log({ chunk: chunk.toString() });
        chunks.push(chunk);
      });
      msg.on("error", function (error) {
        console.error({ error });
        next(error);
      });
      msg.on("end", () => {
        const body = Buffer.concat(chunks);

        console.log("send end...");
        res.status(200).json({
          msg: "SEND_OK",
          server: hashed,
          dev: random,
          body: body.toString(),
        });
      });
    });

    // request Gabia SMS rest api !
    request.write(postData);
    request.end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
