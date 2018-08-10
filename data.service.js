const fs = require('fs');

function readJson(name, callbackFn) {
  fs.readFile(`json/${name}.json`, 'utf8', function (err, data) {
    if (err) {
      console.error(err.message);
    }
		callbackFn(JSON.parse(data), err);
  });
}

function writeJson(name, data, callbackFn) {
  fs.writeFile(`json/${name}.json`, JSON.stringify(data, null, 4), function (err, data) {
    if (err) {
      console.error(err.message);
    }
    callbackFn(data, err);
  });
}

module.exports = {readJson, writeJson};