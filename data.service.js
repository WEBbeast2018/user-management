const fs = require('fs');

function readJson(name, callbackFn) {
  fs.readFile(`json/${name}.json`, 'utf8', function (err, data) {
    if (err) {
      console.error(err.message);
    }
    callbackFn(data);
  });
}

function writeJson(name, callbackFn) {
  fs.writeFile(`json/${name}.json`, JSON.stringify(data), function (err, data) {
    if (err) {
      console.error(err.message);
    }
    callbackFn(data);
  });
}

module.exports = {readJson, writeJson};