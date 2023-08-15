import React, { useState, useEffect, useContext } from 'react';
import { MockMidiContext } from './MockMidiProvider';
import { MidiEvent } from './MidiRecorder';
import { detectScales, getMajorScaleName, noteToNoteName } from './utils';

type ScaleDisplayProps = {
    scales: string[]
}

export const ScaleDisplay = ({ scales }: ScaleDisplayProps) => {
  const [latestScale, setLatestScale] = useState<string|null>(null);
  const context = useContext(MockMidiContext);
  context?.recorder.addEventListener((events) =>  {
    const scale = getMajorScaleName(events.map(e => e.note));
    if (scale) {
        setLatestScale(scale);
    }
  });
  useEffect(() => {
    // When the `scales` prop changes, update the `latestScale` state with the latest scale.
    if (scales && scales.length > 0) {
      const latestMajorScale = scales[scales.length - 1];
      setLatestScale(latestMajorScale);
    }
  }, [scales]);

  return (
    <div>
      {latestScale && <div>Latest Major Scale: {latestScale}</div>}
    </div>
  );
};


