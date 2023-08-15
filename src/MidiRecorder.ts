
export interface MidiEvent {
    timestamp: number;
    note: number;
    velocity: number;
  }
  
export class MidiEventRecorder {
    private events: MidiEvent[] = [];
    private listeners: ((events: MidiEvent[]) => void)[] = [];
    recordEvent(event: MidiEvent): void {
        this.events.push(event);
        console.log(event.note);
        if (this.events.length > 100) {
            this.events.shift(); // Remove the oldest event if more than 100 events are stored
        }
        this.listeners.forEach(listener => listener(this.events));
    }

    getRecordedEvents(): MidiEvent[] {
        return this.events;
    }

    addEventListener(listener: (events: MidiEvent[]) => void) {
        this.listeners.push(listener)
    } 
}
