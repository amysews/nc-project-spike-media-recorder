var fs = require('fs'),
  cloudconvert = new (require('cloudconvert'))('o99BwbnAY5Uc2Wqn0f2Sow-h0BeCi7YEVRjPREuJvAzBjNBCaL1nSgRwlIgBqQitSs29re2rt1QIYOGnsAK1CQ');


fs.createReadStream('example-audio-file.webm')
  .pipe(cloudconvert.convert({
    "inputformat": "webm",
    "outputformat": "mp3",
    "input": "upload"
  }))
  .pipe(fs.createWriteStream('outputfile.mp3'));