import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { MidiEventRecorder } from './MidiRecorder';
import {detectScales, noteToNoteName} from './utils';
import { ScaleDisplay } from './ScaleDisplay'
import { MockMidiProvider } from './MockMidiProvider';
import ToggleMockMidi from './ToggleMockMidi';

function App() {
  const [scales, setScales] = useState<string[]>([]);
  const midiRecorder = new MidiEventRecorder();
  
  return (
    <div className="App">
      <MockMidiProvider>
        <ToggleMockMidi/>
        <ScaleDisplay scales={scales}/>
      </MockMidiProvider>
      
    </div>
  );
}

export default App;
function prepareStartup() {
  new MidiEventRecorder();
  throw new Error('Function not implemented.');
}

