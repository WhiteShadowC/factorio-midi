export type Song = {
  name: string;
  bpm: number;
  subdivision: number;
  length: number;
  tracks: Track[];
};

export enum Instrument {
  None = 0,
  DrumKit = 2,
  Piano = 3,
  Bass = 4,
  Lead = 5,
  Saw = 6,
  Square = 7,
  Celesta = 8,
  Vibraphone = 9,
  Plucked = 10,
  SteelDrum = 11,
}

export type Track = {
  instrument: number;
  notes: Note[];
}

export type Note = number;
