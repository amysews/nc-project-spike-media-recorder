const fs = require('fs');
const cloudconvert = require('cloudconvert');
const CCKEY = require('./config/cloudconvert');
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const S2TKEY = require('./config/watson');

const recordButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const audioElement = document.getElementById('audio');
const downloadButton = document.getElementById('download');
const convertButton = document.getElementById('convert');
const transcribeButton = document.getElementById('transcribe');
const textElement = document.getElementById('text');

recordButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);
stopButton.disabled = true;
downloadButton.addEventListener('click', downloadRecording);
downloadButton.disabled = true;
convertButton.addEventListener('click', convertRecording);
convertButton.disbaled = true;
transcribeButton.addEventListener('click', transcribeRecording);
transcribeButton.disabled = true;

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    recorder = new MediaRecorder(stream);
    recorder.addEventListener('dataavailable', recordingDetected)
  })

function startRecording() {
  recordButton.disabled = true;
  stopButton.disbaled = false;

  recorder.start();
}

function stopRecording() {
  stopButton.disabled = true;
  downloadButton.disbaled = false;

  recorder.stop();
}

function recordingDetected(e) {
  audio.src = URL.createObjectURL(e.data);
}

function downloadRecording() {
  downloadButton.disabled = true;
  convertButton.disabled = false;

  const temp = document.createElement('a');
  temp.setAttribute('href', audio.src);
  temp.setAttribute('download', 'audio-output');
  downloadButton.appendChild(temp);
  temp.click();
  downloadButton.removeChild(temp);
}

function convertRecording() {
  convertButton.disabled = true;
  transcribeButton.disabled = false;

  const converter = new cloudconvert(CCKEY);

  fs.createReadStream('audio-output.webm')
    .pipe(converter.convert({
      "inputformat": "webm",
      "outputformat": "mp3",
      "input": "upload"
    }))
    .pipe(fs.createWriteStream('audio-converted.mp3'));
}

function transcribeRecording() {
  transcribeButton.disabled = true;

  const speech_to_text = new SpeechToTextV1({
    username: S2TKEY.username,
    password: S2TKEY.password
  });

  const params = {
    audio: fs.createReadStream('./audio-converted.mp3'),
    content_type: 'audio/mp3'
  };

  speech_to_text.recognize(params, (err, res) => {
    if (err) console.log(err)
    else {
      const transcript = res.results[0].alternatives[0].transcript;
      text.innerText = transcript;
      fs.writeFile('./transcription.txt', transcript, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      })
    }
  })
}