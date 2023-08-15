import React from 'react';
import { useMockMidi } from './MockMidiProvider';

const ToggleMockMidi: React.FC = () => {
  const { mockMidi, setMockMidi } = useMockMidi();

  const toggleMockMidi = () => {
    setMockMidi((prevMockMidi) => !prevMockMidi);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mockMidi}
          onChange={toggleMockMidi}
        />
        Toggle "Mock Midi"
      </label>
    </div>
  );
};

export default ToggleMockMidi;