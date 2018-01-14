const start = document.getElementById('start');
const stop = document.getElementById('stop');

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia supported');
  navigator.mediaDevices.getUserMedia ({ audio: true })
    .then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      start.onclick = () => {
        mediaRecorder.start();
        console.log(mediaRecorder.state);
        console.log('recorder started');
      }
      stop.onclick = () => {
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
        console.log('recorder stopped');
      }
      mediaRecorder.ondataavialable = (e) => {
        console.log(event.data)
        console.log('data available')
        const audio = document.getElementById('audio');
        audio.src = URL.createObjectURL(e.data);
        audio.play();
      }
    })
    .catch((err) => console.log('The following gUM error occured: ' + err));
} else console.log('getUserMedia not supported on your browser');