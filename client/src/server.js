import path from 'path';
import fs from 'fs';
import express from 'express';
import cheerio from 'cheerio';
import serialize from 'serialize-javascript';

import routing from './utils/ServerRender.jsx';

function fileLoad(relPath) {
  return fs.readFileSync(relPath, {
    encoding: 'utf8'
  });
}

const buildPath = path.resolve(__dirname, '../build');
const $ = cheerio.load(fileLoad(`${buildPath}/index.html`))
  // $('#root').text('Hello there!');

const app = express();

app.use(express.static(buildPath, {
  index: false
}));

app.use((req, res, next) => {
  console.log(req.path);

  routing(req, res)
    .then(function(result) {
      $('#server').html(`window.INITIAL_STATE = ${serialize(result.state)};`);
      res.send($.html());
    })
    .catch(function(defect) {
      console.error('Can`t serverRender');
      console.log(defect);

      if (defect.error.code === 301) {
        res.redirect(defect.context);
      } else if (defect.error.code === 404) {
        next();
      } else {
        next(defect);
      }
    });
});

app.get('*', function(req, res) {
  res.status(404).end('404: Not Found');
});

app.use(function(error, req, res, next) {
  console.error(error);
  res.status(500).end('500: Internal Server Error');
});

app.listen(7777, () => {
  console.log(`The server is running at http://localhost:7777/`);
});
