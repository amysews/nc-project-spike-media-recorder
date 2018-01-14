import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <section>
        <h1>Record Audio in Browser - Converts to text transcript</h1>
        <h2>Record</h2>
        <p>
          Press Start to start recording:
          <button id="start">Start</button>
        </p>
        <p>
          Press Stop to stop recording:
          <button id="stop">Stop</button>
        </p>
        <p>
          <p>Playback your recording</p>
          <audio id="audio" controls src=""></audio>
        </p>
        <p>
          Step 1: download your file - downloads as .webm file. Drag this file into the code folder
          <button id="download">Download</button>
        </p>
        <p>
          Step 2: convert your file from .webm into .mp3 using cloudconvert
          <button id="convert">Convert</button>
        </p>
        <p>
          Step 3: use IBM Watson Speech to Text to receive back text transcript of recording below
          <button id="transcribe">Transcribe</button>
        </p>
        <h2>Transcription</h2>
        <p id="text"></p>
      </section>
    );
  }
}

export default App;
