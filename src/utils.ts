export function noteToNoteName(note: number) {
    const noteNames = [
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
      'A',
      'A#',
      'B',
    ];
    const octave = Math.floor(note / 12) - 1;
    const noteIndex = note % 12;
    return noteNames[noteIndex] + octave;
  }

  function formsMajorScale(majorScaleIntervals: number[], notes: number[]) {
    return (rootNote: number): boolean => {
        for (let i = 0; i < 7; i++) {
            const expectedNote = rootNote + majorScaleIntervals[i];
            if (!notes.includes(expectedNote)) {
                return false; // Interval not found in the list
            }
        }
        return true;
    };
}

export function getMajorScaleName(notes: number[]): string | null {
    console.log("CHECKING")
    if (notes.length < 8) {
      return null; // A major scale should have at least 7 notes
    }
  
    // Define the expected intervals for a major scale
    const majorScaleIntervals = [2, 4, 5, 7, 9, 11, 12];
  
    // Find the index of the root note in the 'notes' list
    for (let i = 0; i < notes.length; i++) {
      const rootNote = notes[i];
      let isMajorScale = true;
  
      // Check if the notes starting from the root form a major scale
      for (let j = 0; j < majorScaleIntervals.length - 1; j++) {
        const currentInterval = majorScaleIntervals[j];
        const expectedNote = rootNote + currentInterval;
  
        // Find the next note in the 'notes' list that matches the expected note
        const nextNoteIndex = notes.indexOf(expectedNote, i + 1);
  
        if (nextNoteIndex === -1 || nextNoteIndex !== i + 1) {
          isMajorScale = false;
          break;
        }
  
        i = nextNoteIndex; // Update the index to the found note to continue checking the next interval
      }
  
      if (isMajorScale) {
        // Assuming the notes in the 'notes' list form a major scale
        // Return the name of the major scale based on the root note
        const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        const rootNoteName = noteNames[rootNote % 12];
        return `${rootNoteName} Major Scale`;
      }
    }
  
    return null; // No major scale found in the 'notes' list
  }
  



  export function detectScales(noteName: string) {
    // Replace this with your scale detection logic
    // For demonstration purposes, returning a predefined scale
    return [{ name: 'C Major' }];
  }

  export function asciiCodeToMidi(asciiCode: number): number {
    // MIDI code for 'A'
    const midiCodeA = 57; // A3 MIDI code
  
    // Calculate the difference in semitones between MIDI notes and ASCII codes
    const semitonesOffset = 0;
  
    // Map ASCII codes to their corresponding MIDI note numbers
    const codeToMidiMap: { [key: number]: number } = {
      65: 69, // A5 MIDI code
      66: 71, // B5 MIDI code
      67: 60, // C4 MIDI code
      68: 62, // D4 MIDI code
      69: 64, // E4 MIDI code
      70: 65, // F4 MIDI code
      71: 67, // G4 MIDI code
      72: 72, // C6 MIDI code
      73: 71, // B5 MIDI code
      74: 72, // C6 MIDI code
    };
  
    // Return the corresponding MIDI note or null if the input is not a valid ASCII code
    if (codeToMidiMap.hasOwnProperty(asciiCode)) {
      const midiNote = codeToMidiMap[asciiCode] + semitonesOffset;
      console.log ("Midi note " + midiNote);
      if (asciiCode >= 65 && asciiCode <= 71) {
        // If the input ASCII code corresponds to uppercase A to G, adjust for sharp
        return midiNote + 1;
      } else {
        return midiNote;
      }
    }
    console.log ("No match " + asciiCode);
    return 0;
  }
  