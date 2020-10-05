const express = require("express");
const router = express.Router();
const qs = require("qs");
const https = require("https");
const uniqid = require("uniqid");
const { generatorRandom, hash } = require("../lib/util");

router.get("/", (req, res, next) => {
  res.end("sms");
});

/* GET home page. */
router.post("/send", async function (req, res, next) {
  const { to } = req.body;
  const random = generatorRandom(6);
  const options = {
    method: "POST",
    hostname: "sms.gabia.com",
    path: "/api/send/sms",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: process.env.SMS_API_KEY,
      // "Basic DckviEksLs6ZXlKMGVYQWlPaUpLVhiR2NpT2lKU1V6STFOaUo5LmV5SnBjM01pT2lKb2RIUndjenBjTDF3dmMyMXpMbWRoWW1saExtTnZiVnd2SWl3aVlYVmtJam9pWEM5dllYVjBhRnd2ZEc5clpXNGlMQ0pshWFhnT2pBNG5uVkVuLWtnVEJoRGpPeWc=",
    },
  };

  const hashed = await hash(random);

  try {
    const request = await https.request(options, (msg) => {
      const chunks = [];

      msg.on("data", (chunk) => {
        chunks.push(chunk);
      });
      msg.on("error", function (error) {
        console.error({ error });
        next(error);
      });
      msg.on("end", (chunk) => {
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
    const postData = qs.stringify({
      phone: to,
      callback: "01030363420",
      message: "SMS 인증번호: " + random,
      refkey: uniqid(),
    });
    // request Gabia SMS rest api !
    request.write(postData);
    request.end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
