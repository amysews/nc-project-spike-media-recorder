// This example uses MediaRecorder to record from a live audio stream,
// and uses the resulting blob as a source for an audio element.
//
// The relevant functions in use are:
//
// navigator.mediaDevices.getUserMedia -> to get audio stream from microphone
// MediaRecorder (constructor) -> create MediaRecorder instance for a stream
// MediaRecorder.ondataavailable -> event to listen to when the recording is ready
// MediaRecorder.start -> start recording
// MediaRecorder.stop -> stop recording (this will generate a blob of data)
// URL.createObjectURL -> to create a URL from a blob, which we can use as audio src

var fs = require('fs'),
  cloudconvert = new (require('cloudconvert'))('o99BwbnAY5Uc2Wqn0f2Sow-h0BeCi7YEVRjPREuJvAzBjNBCaL1nSgRwlIgBqQitSs29re2rt1QIYOGnsAK1CQ');

var recordButton, stopButton, recorder, downloadButton, container;

recordButton = document.getElementById('start');
stopButton = document.getElementById('stop');
downloadButton = document.getElementById('download');
container = document.getElementById('container');

// get audio stream from user's mic
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function (stream) {
    recordButton.disabled = false;
    recordButton.addEventListener('click', startRecording);
    stopButton.addEventListener('click', stopRecording);
    downloadButton.addEventListener('click', downloadRecording);
    recorder = new MediaRecorder(stream);
    //, {audioBitsPerSecond: 16000, mimeType : "audio/wav"});
    // recorder.recorderType = StereoAudioRecorder;
    // recorder.mimeType = 'audio/wav';

    // listen to dataavailable, which gets triggered whenever we have
    // an audio blob available
    recorder.addEventListener('dataavailable', onRecordingReady);
  });

function startRecording() {
  recordButton.disabled = true;
  stopButton.disabled = false;

  recorder.start();
}

function stopRecording() {
  recordButton.disabled = false;
  stopButton.disabled = true;

  // Stopping the recorder will eventually trigger the `dataavailable` event and we can complete the recording process
  recorder.stop();
}

function onRecordingReady(e) {
  var audio = document.getElementById('audio');
  console.log(e.data)
  // e.data contains a blob representing the recording
  audio.src = URL.createObjectURL(e.data);
  console.log(audio.src);
  // audio.play();
}

function downloadRecording() {
  const link = document.createElement('a');
  link.innerText = 'download here';
  link.setAttribute('href', audio.src);
  link.setAttribute('download', 'test');
  container.appendChild(link);

  // fs.createReadStream('example-audio-file.webm')
  //   .pipe(cloudconvert.convert({
  //     "inputformat": "webm",
  //     "outputformat": "mp3",
  //     "input": "upload"
  //   }))
  //   .pipe(fs.createWriteStream('outputfile.mp3'))
  //   .then(() => {

  //   });

}