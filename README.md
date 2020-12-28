# smart-on-fhir-test

$ npm install express --save
$ npm install body-parser --save
$ npm install nodemon -g

Iniciar el servidor con:
$ nodemon app.js  
    (o alternativamente con "npm app.js")


Lanzamiento del launch: http://localhost:3000/launch.html?iss=http%3A%2F%2Flocalhost%3A3000&launch=123

Intenta ir a:

http://localhost:3000/authorize?response_type=code&client_id=my_web_app&scope=launch%20openid%20fhirUser%20patient%2F*.read&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Findex.html&aud=http%3A%2F%2Flocalhost%3A3000&state=Dvw23qEIRnD23Xln&launch=123

De acuerdo a lo que dice https://hl7.org/fhir/smart-app-launch/index.html

Debemos mandarlo a http://localhost:3000/index.html?code=1234&state=Dvw23qEIRnD23Xln  el state tiene que coincidir con el que vino en la llamada al authorize.

FHIR.oauth2.ready()   Invoca por POST al /token con este cuerpo:

	{
	    code: '1234',
	    grant_type: 'authorization_code',
	    redirect_uri: 'http://localhost:3000/index.html',
	    client_id: 'my_web_app'
	}

Hay que responderle:
	{
	        access_token: '1234567890',
	        token_type: 'Bearer',
	        scope: 'launch fhirUser patient/*.read',
	        id_token: const id_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwcm9maWxlIjoiUHJhY3RpdGlvbmVyL3NtYXJ0LVByYWN0aXRpb25lci03MjA4MDQxNiIsInBhdGllbnQiOiIxMjMiLCJlbmNvdW50ZXIiOiI1NjciLCJzdWIiOiIzNmExMGJjNGQyYTczNThiNGFmZGFhYWY5YWYzMmJhY2NhY2JhYWJkMTA5MWJkNGE4MDI4NDJhZDVjYWRkMTc4IiwiaXNzIjoiaHR0cDovL2xhdW5jaC5zbWFydGhlYWx0aGl0Lm9yZyIsImlhdCI6MTU1OTM5MjI5NSwiZXhwIjoxNTU5Mzk1ODk1fQ.Gz4AkDYTyf848GURiHhY28cLJlSDTthADWqgUbCCrJK8SZHe_K1ihXDB0oM-P5_rioqnL5LlhSI83zqsNXYr_stZEXA-F9_tIaG74JTM5A-Gd7xixh8qh1DLh7AKCtgCswE6AgtNYq3dYvwhkaV0cLGIfHMvwEt4nmLYuM-GzUU",
	        patient: '56789',
	        encounter: '987654321'
	}

En el id_token va un token jwt que tiene el fhirUser.
