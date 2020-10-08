const express = require("express");
const router = express.Router();
const qs = require("qs");
const https = require("https");
const uniqid = require("uniqid");
const base64 = require("base-64");
const axios = require("axios");

// const { generatorRandom, hash } = require("../lib/util");

router.get("/", (req, res) => {
  res.end("/sms");
});

/**
 * SMS 전송전 사용자 인증 및 access_token 받기
 * @param req
 * @param res
 * @param next
 */
const auth = (req, res, next) => {
  const authorization = base64.encode(
    `${process.env.SMS_ID}:${process.env.SMS_API_KEY}`
  );

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
        const json = JSON.parse(body.toString());
        const accessToken = json["access_token"];
        res.locals.accessToken = accessToken;
        return next();
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
};

/**
 * Send SMS and Save DB
 */
router.post("/send", auth, async (req, res, next) => {
  const { accessToken } = res.locals;
  if (!accessToken) next({ message: "accessToken is empty..", status: 500 });

  const { to, from, message } = req.body;
  if (!to || !message)
    next({ message: "to || message is empty...", status: 500 });

  const authorization = base64.encode(`${process.env.SMS_ID}:${accessToken}`);
  // const random = generatorRandom(6);
  // const hashed = await hash(random);
  try {
    const postData = getPostData({ to, from, message });
    const options = getOptions(postData, authorization);

    const request = https.request(options, function (incomingMessage) {
      const chunks = [];
      incomingMessage.on("data", (chunk) => {
        chunks.push(chunk);
      });
      incomingMessage.on("end", () => {
        const body = Buffer.concat(chunks);
        res.status(200).json({
          msg: "SEND_OK",
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
  } catch (e) {
    console.error({ e });
    next(e);
  }
});
function getPostData({ to, from, message }) {
  return qs.stringify({
    phone: to,
    callback: from || "01030363420", // 보내는 사람, gabia 등록된 번호
    message: message,
    refkey: uniqid(),
  });
}

function getOptions(postData, authorization) {
  return {
    method: "POST",
    hostname: "sms.gabia.com",
    path: "/api/send/sms",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(postData),
      Authorization: `Basic ${authorization}`,
    },
  };
}

module.exports = router;
