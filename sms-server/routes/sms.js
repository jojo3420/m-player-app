const express = require("express");
const router = express.Router();
const qs = require("qs");
const https = require("https");
const uniqid = require("uniqid");
const base64 = require("base-64");
const axios = require("axios");

const { generatorRandom, hash } = require("../lib/util");

// router.get("/", (req, res, next) => {
//   res.end("sms");
// });

async function auth() {
  const authorization = base64.encode(`spring3420:${process.env.SMS_API_KEY}`);

  const postData = qs.stringify({
    grant_type: "client_credentials",
  });

  const options = {
    method: "POST",
    hostname: "sms.gabia.com",
    path: "/oauth/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(postData),
      Authorization: `Basic ${authorization}`,
    },
  };
  try {
    const request1 = https.request(options, function (incomingMessage) {
      const chunks = [];

      incomingMessage.on("data", function (chunk) {
        chunks.push(chunk);
      });

      incomingMessage.on("end", async function (chunk) {
        const body = Buffer.concat(chunks);
        // console.log(body.toString());
        const json = JSON.parse(body.toString());
        // console.log({ json });
        const accessToken = json["access_token"];
        return accessToken;
      });

      incomingMessage.on("error", function (error) {
        console.error(error);
      });
    });

    request1.write(postData);
    request1.end();
  } catch (e) {
    console.error(e);
  }
}
/* GET home page. */
router.post("/send", async function (req, res, next) {
  const authorization = base64.encode(`spring3420:${process.env.SMS_API_KEY}`);

  const postData = qs.stringify({
    grant_type: "client_credentials",
  });

  const options = {
    method: "POST",
    hostname: "sms.gabia.com",
    path: "/oauth/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(postData),
      Authorization: `Basic ${authorization}`,
    },
  };
  try {
    const request1 = https.request(options, function (incomingMessage) {
      const chunks = [];

      incomingMessage.on("data", function (chunk) {
        chunks.push(chunk);
      });

      incomingMessage.on("end", async function (chunk) {
        const body = Buffer.concat(chunks);
        // console.log(body.toString());
        const json = JSON.parse(body.toString());
        // console.log({ json });
        const accessToken = json["access_token"];
        console.log({ accessToken });

        const { to } = req.body;
        const authorization = base64.encode(`spring3420:${accessToken}`);
        // console.log({ authorization });
        const random = generatorRandom(6);
        // console.log({ random });
        const hashed = await hash(random);

        const postData = qs.stringify({
          phone: to,
          callback: "01030363420",
          message: "[playlist-M] SMS 인증번호: " + random,
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
            Authorization: "Basic " + authorization,
          },
        };

        const request = https.request(options, function (incomingMessage) {
          const chunks = [];
          incomingMessage.on("data", (chunk) => {
            chunks.push(chunk);
          });
          incomingMessage.on("end", () => {
            const body = Buffer.concat(chunks);
            // console.log("send end..." + body.toString());

            res.status(200).json({
              msg: "SEND_OK",
              server: hashed,
              dev: random,
              body: body.toString(),
            });
          });
          incomingMessage.on("error", function (error) {
            console.error({ error });
          });
        });

        // request Gabia SMS rest api !
        request.write(postData);
        request.end();
      });

      incomingMessage.on("error", function (error) {
        console.error(error);
      });
    });

    request1.write(postData);
    request1.end();
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/send2", async (req, res, next) => {
  const { to } = req.body;
  console.log({ to, apiKey: process.env.SMS_API_KEY });
  const authorization = base64.encode("spring3420:" + process.env.SMS_API_KEY);
  console.log({ authorization });
  const random = generatorRandom(6);

  const postData = {
    phone: to,
    callback: "01030363420",
    message: "playlist-M SMS 인증번호 " + random,
    refkey: uniqid(),
  };
  // console.log({ postData });

  // const headers = {
  // "Content-Type": "application/x-www-form-urlencoded",
  // "Content-Length": postData.,
  // Authorization: `Basic ${authorization}`,
  // };
  // console.log({ options });
  const hashed = await hash(random);
  try {
    const options = {
      method: "POST",
      url: "https://sms.gabia.com/api/send/sms",
      postData,
      data: qs.stringify(postData),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${authorization}`,
      },
    };

    const response = await axios(options);
    console.log({ "data: ": response });
    res.json({ msg: "OK", hashed, random, response });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
