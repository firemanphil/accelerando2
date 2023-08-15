import React, { createContext, useState, useContext, useEffect } from 'react';
import { MidiEventRecorder } from './MidiRecorder';
import { asciiCodeToMidi, detectScales, noteToNoteName } from './utils';

interface MockMidiContextValue {
  mockMidi: boolean;
  setMockMidi: React.Dispatch<React.SetStateAction<boolean>>;
  recorder: MidiEventRecorder;
}
const MockMidiContext = createContext<MockMidiContextValue | null>(null);

const MockMidiProvider = ({ children }: { children: React.ReactNode }) => {
  const [mockMidi, setMockMidi] = useState(false);
  const [recorder, setRecorder] = useState(new MidiEventRecorder());
  useEffect(() => {

    async function connectMIDI() {
        try {
          if (mockMidi) {
            document.addEventListener('keydown', handleMockMIDIMessage);
          } else if (navigator.requestMIDIAccess) {
            const access = await navigator.requestMIDIAccess();
            const inputs = access.inputs.values();
  
            for (let input of inputs) {
              input.onmidimessage = (message: WebMidi.MIDIMessageEvent) => {
                 handleMIDIMessage(message.data);
              };
            }
          }
        } catch (error) {
          console.error('MIDI access request failed:', error);
        }
      }

      function handleMockMIDIMessage(event: { keyCode: number } ) {
        
        const { keyCode } = event;
        console.log(keyCode);
        const note = keyCode + 21; // Map computer keyboard keys to MIDI note numbers
        console.log(note);
        if (keyCode >= 65 && keyCode <= 90) {
          handleMIDIMessage(new Uint8Array([144, asciiCodeToMidi(keyCode), 127]));
          setTimeout(() => {
            handleMIDIMessage(new Uint8Array([144, asciiCodeToMidi(keyCode), 0]));
          }, 100);
        }
      }

      function handleMIDIMessage(data: Uint8Array): any {
      
        const [status, note, velocity] = data;
  
        if (status === 144 && velocity > 0) {
            recorder.recordEvent({
            note,
            velocity,
            timestamp: Date.now()
  
          })
         
        }
        
      }
    connectMIDI();

    return () => {
    //   // Clean up listener when component unmounts or mockMidi is toggled off
    //   window.removeEventListener('midiMessage', midiMessageListener);
    };
  }, [mockMidi, recorder]);
  
  return (
    <MockMidiContext.Provider value={{ mockMidi, setMockMidi, recorder }}>
      {children}
    </MockMidiContext.Provider>
  );
};

export { MockMidiContext, MockMidiProvider };

export const useMockMidi = (): MockMidiContextValue => {
  const context = useContext(MockMidiContext);
  if (!context) {
    throw new Error('useMockMidi must be used within a MockMidiProvider');
  }
  return context;
};
