const express = require('express');
const path = require('path');
const helmet = require('helmet');
const port = process.env.PORT || 8080;
const rateLimit = require("express-rate-limit");
// deepcode ignore UseCsurfForExpress: Used to build prod environment to cloud
const app = express();


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(helmet());
app.use(limiter);


app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {

  res.sendFile(path.join(__dirname, 'build', 'index.html'));

});

app.listen(port, function () {
  
  console.info('React Server App listening on port ' + port);  

});
