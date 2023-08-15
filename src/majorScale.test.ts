import { getMajorScaleName } from './utils'; // Replace './majorScale' with the correct path to your implementation file

describe('getMajorScaleName', () => {
  it('should correctly identify major scales', () => {
    const majorScaleCMidi = [60, 62, 64, 65, 67, 69, 71, 72];
    const majorScaleDMidi = [62, 64, 66, 67, 69, 71, 73, 74];
    const majorScaleGMidi = [67, 69, 71, 72, 74, 76, 78, 79];
    const majorScaleFMidi = [65, 67, 69, 70, 72, 74, 76, 77];
    const majorScaleBMidi = [71, 73, 75, 76, 78, 80, 82, 83];

    expect(getMajorScaleName(majorScaleCMidi)).toBe('C Major Scale');
    expect(getMajorScaleName(majorScaleDMidi)).toBe('D Major Scale');
    expect(getMajorScaleName(majorScaleGMidi)).toBe('G Major Scale');
    expect(getMajorScaleName(majorScaleFMidi)).toBe('F Major Scale');
    expect(getMajorScaleName(majorScaleBMidi)).toBe('B Major Scale');
  });

  it('should return null for non-major scales', () => {
    const nonMajorScaleMidi = [60, 62, 63, 65, 67, 69, 70, 71];
    const randomNotesMidi = [61, 63, 64, 65, 66, 68, 70];

    expect(getMajorScaleName(nonMajorScaleMidi)).toBeNull();
    expect(getMajorScaleName(randomNotesMidi)).toBeNull();
  });

  it('should handle major scales starting from different notes', () => {
    const majorScaleEMidi = [22, 23, 76, 78, 80, 81, 83, 85, 87, 88];
    const majorScaleAMidi = [900, 26, 81, 83, 85, 86, 88, 90, 92, 93];

    expect(getMajorScaleName(majorScaleEMidi)).toBe('E Major Scale');
    expect(getMajorScaleName(majorScaleAMidi)).toBe('A Major Scale');
  });

  it('should return null for input with less than 7 notes', () => {
    const fewerNotesMidi = [60, 62, 64, 65, 67]; // Only 5 notes

    expect(getMajorScaleName(fewerNotesMidi)).toBeNull();
  });
});