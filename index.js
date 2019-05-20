const config = require("config");
const express = require("express");
const expbhs = require("express-handlebars");
const nodemailer = require("nodemailer");

const app = express();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sidsbrmnn@gmail.com",
    pass: config.get("contactPass")
  }
});

app.engine("handlebars", expbhs());
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/guidelines", (req, res) => {
  res.render("guidelines");
});

app.post("/submit", (req, res) => {
  transporter
    .sendMail({
      from: '"Contact Form" <sidsbrmnn@gmail.com>',
      to: "jssncait2019@gmail.com",
      subject: "Message from contact form",
      text: `${req.body.message}
    
From
${req.body.name}
${req.body.email}`
    })
    .then(success => res.send("Mail sent."))
    .catch(error => {
      console.log(error);
      res.send("Mail cannot be sent at the moment.");
    });
});

app.get("*", (req, res) => {
  res.render("404");
});

const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`Listening on port ${port}...`));
