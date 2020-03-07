require("dotenv").config();
const https = require("https");
const fs = require("fs");
const express = require("express");
const passport = require("passport");
const MicrosoftAuthCodeStrategy = require("passport-microsoft-authcode")
  .Strategy;

const app = express();

passport.use(
  new MicrosoftAuthCodeStrategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
      const user = { accessToken, refreshToken, profile };
      console.log(user);
      return done(null, user);
    }
  )
);
app.use(require("body-parser").json());
app.use(passport.initialize());

app.get("/", function(req, res) {
  res.writeHeader(200, { "Content-Type": "text/html" });
  res.write(`<a href='https://login.microsoftonline.com/common/oauth2/authorize?
client_id=${process.env.MICROSOFT_CLIENT_ID}
&response_type=code
&redirect_uri=${encodeURI(process.env.CALLBACK_URL)}
&response_mode=query
&state=12345'>Click here to create an auth code </a>`);
  res.end();
});
app.get(`${new URL(process.env.CALLBACK_URL).pathname}`, function(req, res) {
  res.writeHeader(200, { "Content-Type": "text/html" });
  res.write(`
  <b>use this code in postman import (turn off ssl verification in postman to work with https)</b>

  <pre style="border:thin solid #000">
  curl --location --request POST 'https://localhost:3000/auth/microsoft/authcode' \\
        --header 'Content-Type: application/json' \\
        --data '{
          "code":"${req.query.code}"
        }'
  </pre>`);
  res.end();
});
app.post(
  "/auth/microsoft/authcode",
  passport.authenticate("microsoft-authcode", { session: false }),
  function(req, res) {
    res.send(req.user ? req.user : 401);
  }
);

https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
      passphrase: "passphrase"
    },
    app
  )
  .listen(3000, function() {
    console.log(
      "Example app listening on port 3000! Go to https://localhost:3000/"
    );
  });
