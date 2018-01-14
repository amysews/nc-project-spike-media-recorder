var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');

const { url, username, password } = require('./config/watson');

var speech_to_text = new SpeechToTextV1({
  username: username,
  password: password
});

var params = {
  // From file
  audio: fs.createReadStream('./outputfile.mp3'),
  content_type: 'audio/mp3'
};

speech_to_text.recognize(params, function (err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res.results[0].alternatives[0].transcript, null, 2));
});

// or streaming
// fs.createReadStream('./resources/speech.wav')
//   .pipe(speech_to_text.createRecognizeStream({ content_type: 'audio/l16; rate=44100' }))
//   .pipe(fs.createWriteStream('./transcription.txt'));