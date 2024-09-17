export type Song = {
  name: string;
  bpm: number;
  subdivision: number;
  length: number;
  tracks: Track[];
};

export enum Instrument {
  DrumKit = 2,
  Piano = 3,
}

export type Track = {
  instrument: number;
  notes: Note[];
}

export type Note = number;
