const express = require('express');
const url = require('url');
var bodyParser = require('body-parser');

var path = require('path');
const app = express()
const port = 3000

var metadatafile = require("./metadata.json");
var patientfile = require("./Patient.json");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/launch.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/launch.html'))
  })

app.get('/metadata', (req, res) => {
    res.json(metadatafile)
})

app.get('/Patient/56789', (req, res) => {
    console.log("/Patient/56789");
    console.log(req.headers.authorization);
    if (req.headers.authorization == "Bearer 1234567890") {
        res.json(patientfile);
    } else {
        res.statusCode = 403;
        res.send("Denied!");
    }
})

app.get('/authorize', (req, res) => {
    console.log("/authorize");
    console.log(req.query);
    res.redirect(url.format({
        pathname: "/index.html"
    })+"?code=1234&state="+req.query.state);
})

const id_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwcm9maWxlIjoiUHJhY3RpdGlvbmVyL3NtYXJ0LVByYWN0aXRpb25lci03MjA4MDQxNiIsInBhdGllbnQiOiIxMjMiLCJlbmNvdW50ZXIiOiI1NjciLCJzdWIiOiIzNmExMGJjNGQyYTczNThiNGFmZGFhYWY5YWYzMmJhY2NhY2JhYWJkMTA5MWJkNGE4MDI4NDJhZDVjYWRkMTc4IiwiaXNzIjoiaHR0cDovL2xhdW5jaC5zbWFydGhlYWx0aGl0Lm9yZyIsImlhdCI6MTU1OTM5MjI5NSwiZXhwIjoxNTU5Mzk1ODk1fQ.Gz4AkDYTyf848GURiHhY28cLJlSDTthADWqgUbCCrJK8SZHe_K1ihXDB0oM-P5_rioqnL5LlhSI83zqsNXYr_stZEXA-F9_tIaG74JTM5A-Gd7xixh8qh1DLh7AKCtgCswE6AgtNYq3dYvwhkaV0cLGIfHMvwEt4nmLYuM-GzUU";
app.post('/token',  (req, res) => {
    console.log("/token");
    console.log("<<<< " + JSON.stringify(req.body));
    const respuesta = {
        access_token: '1234567890',
        token_type: 'Bearer',
        scope: 'launch fhirUser patient/*.read',
        id_token: id_token,
        patient: '56789',
        encounter: '987654321'
    };
    console.log(">>>> " + JSON.stringify(respuesta));
    res.json(respuesta);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})