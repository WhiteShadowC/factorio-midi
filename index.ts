import MidiManager, { MidiSetTempoEvent, MidiTimeSignatureEvent } from "midi-file";
import { Blueprint } from "./src/entities";
import { Instrument, Note, Song, Track } from "./src/types";
import * as BlueprintConstructor from './src/blueprint';
import * as path from "node:path";
import pako from "pako";

const PIANO_MIDI_NOTE_OFFSET = 40;
const BASS_MIDI_NOTE_OFFSET = 28;
const LEAD_MIDI_NOTE_OFFSET = 28;
const SAW_MIDI_NOTE_OFFSET = 28;
const SQUARE_MIDI_NOTE_OFFSET = 28;
const CELESTA_MIDI_NOTE_OFFSET = 64;
const VIBRAPHONE_MIDI_NOTE_OFFSET = 52;
const PLUCKED_MIDI_NOTE_OFFSET = 52;
const STEEL_DRUM_MIDI_NOTE_OFFSET = 40;
const OCTAVE = 12;

const midiFilePath = Bun.argv[2];
let blueprint;
try {
    blueprint = convertMidiFile(midiFilePath);
} catch (e) {
    console.error(e);
    process.exit(1);
}
console.log(exportBlueprint(await blueprint));

function exportBlueprint(blueprint: Blueprint): string {
    return '0' + Buffer.from(
        pako.deflate(
            JSON.stringify(blueprint)
        )
    ).toString('base64');
}

async function convertMidiFile(filePath: string): Promise<Blueprint> {
    const midi = MidiManager.parseMidi(Buffer.from(await Bun.file(filePath).arrayBuffer()))

    // convert to internal structure
    const tempoEvents = midi.tracks.flatMap(t => t.filter(e => e.type === 'setTempo') as MidiSetTempoEvent[]);
    const timeSignatureEvents = midi.tracks.flatMap(t => t.filter(e => e.type === 'timeSignature') as MidiTimeSignatureEvent[]);

    if (tempoEvents.length > 1 || timeSignatureEvents.length > 1) {
        throw new Error('File has multiple tempo or time signature events. Cannot parse.');
    }

    const song: Song = {
        name: path.parse(filePath).name,
        bpm: Math.round(60_000_000 / tempoEvents[0].microsecondsPerBeat),
        subdivision: timeSignatureEvents[0].denominator,
        length: 0,
        tracks: [],
    };

    if (midi.header.ticksPerBeat === undefined) {
        console.error('ticksPerBeat is undefined. Cannot parse.');
        process.exit(1);
    }

    const ticksPerNote = midi.header.ticksPerBeat / song.subdivision;
    let programNumber = 0;
    let channel = 9;
    for (let track of midi.tracks) {
        let currentTick = 0;
        let tracks: Track[] = [];

        let lowestNote = Infinity;
        let highestNote = -Infinity;
        for (let event of track) {
            if (event.type === 'programChange' && lowestNote === Infinity && highestNote === -Infinity) {
                programNumber = event.programNumber;
                channel = event.channel;
            } else if (event.type === 'noteOn') {
                lowestNote = Math.min(lowestNote, event.noteNumber);
                highestNote = Math.max(highestNote, event.noteNumber);
                channel = event.channel;
            }
        }
        if (channel !== 9 && !rangeFitsInFactorio(programNumber, lowestNote, highestNote)) {
            throw new Error('Track spans more than full range factorio can represent.');
        }

        let offset = 0;
        while (lowestNote !== Infinity && lowestNote + offset * OCTAVE - PIANO_MIDI_NOTE_OFFSET <= 0) offset++;
        while (highestNote !== -Infinity && highestNote + offset * OCTAVE - PIANO_MIDI_NOTE_OFFSET > 48) offset--;

        for (let event of track) {
            currentTick += event.deltaTime;
            song.length = Math.max(song.length, currentTick / ticksPerNote);
            if (event.type === 'noteOn') {
                let { instrument, note } = convertNote(channel, programNumber, event.noteNumber, offset);
                if (instrument === Instrument.None) continue;
                addNoteToTracks(currentTick / ticksPerNote, note, instrument, song.tracks);
            }
        }
        song.tracks.push(...tracks);
    }
    song.tracks = song.tracks.filter(t => t.notes.filter(n => !!n).length > 0);

    return BlueprintConstructor.generate(song);
}

function addNoteToTracks(index: number, note: Note, instrument: Instrument, tracks: Track[]) {
    if (note <= 0) return;

    let track = null;
    for (let t = 0; t < tracks.length; t++) {
        if (tracks[t].instrument !== instrument) continue;
        if (typeof tracks[t].notes[index] === 'undefined' || tracks[t].notes[index] === 0) {
            tracks[t].notes[index] = note;
            track = t;
            break;
        }
    }
    if (track === null) {
        track = tracks.length;
        tracks.push({
            instrument: instrument,
            notes: [],
        });
        tracks[track].notes[index] = note;
    }
    // fill gap with 0's for easier export
    for (let i = index - 1; i >= 0; i--) {
        if (typeof tracks[track].notes[i] !== 'undefined') break;
        tracks[track].notes[i] = 0;
    }
}

function rangeFitsInFactorio(program: number, lowest: number, highest: number): boolean {
    if (lowest === Infinity || highest === -Infinity) return true;
    const octaves = Math.floor(highest / 12) - Math.floor(lowest / 12);

    if (program <= 8) {
        if (octaves <= 4) {
            return true;
        }
    }
    else if (program <= 119) {
        if (octaves <= 3) {
            return true;
        }
    }
    else {
        return true;
    }

    return false;
}

/**
 * Convert midi program+note to factorio instrument+note.
 * Program numbers taken from https://midiprog.com/program-numbers.
 * Drum Kit notes taken from https://musescore.org/sites/musescore.org/files/General%20MIDI%20Standard%20Percussion%20Set%20Key%20Map.pdf
 * and from https://miditorio.com.
 */
function convertNote(channel: number, program: number, note: number, octaveOffset: number = 0): { instrument: Instrument, note: Note } {
    // Drum Kit
    if (channel === 9) {
        let convertedNote;
        switch (note) {
            case 36: // Bass Drum 1
                convertedNote = 1; // Kick 1
                break;
            case 35: // Acoustic Bass Drum
                convertedNote = 2; // Kick 2
                break;
            case 40: // Electric Snare
            case 41: // Low Floor Tom
            case 43: // High Floor Tom
            case 45: // Low Tom
            case 47: // Low-Mid Tom
            case 48: // Hi-Mid Tom
            case 50: // High Tom
                convertedNote = 4; // Snare 1
                break;
            case 38: // Acoustic Snare
                convertedNote = 5; // Snare 2
                break;
            case 42: // Closed Hi Hat
            case 51: // Ride Cymbal 1
            case 59: // Ride Cymbal 2
                convertedNote = 6; // Hi-hat 1
                break;
            case 44: // Pedal Hi-Hat
            case 46: // Open Hi-Hat
                convertedNote = 7; // Hi-hat 2
                break;
            case 27: // High Q
                convertedNote = 9; // High Q
                break;
            case 37: // Side Stick
            case 75: // Claves
            case 76: // Hi Wood Block
            case 77: // Low Wood Block
                convertedNote = 10; // Percussion 2
                break;
            case 49: // Crash Cymbal 1
            case 52: // Chinese Cymbal
            case 55: // Splash Cymbal
            case 57: // Crash Cymbal 2
                convertedNote = 12; // Crash
                break;
            case 39: // Hand Clap
                convertedNote = 14; // Clap
                break;
            case 54: // Tambourine
            case 69: // Cabasa
                convertedNote = 15; // Shaker
                break;
            case 53: // Ride Bell
            case 56: // Cowbell
                convertedNote = 16; // Cowbell
                break;
            case 81: // Open Triangle
                convertedNote = 17; // Triangle
                break;
            default:
                return {
                    instrument: Instrument.None,
                    note: 0,
                };
        }
        return {
            instrument: Instrument.DrumKit,
            note: convertedNote,
        }
    }

    // Piano
    if (program <= 8) {
        return {
            instrument: Instrument.Piano,
            note: note - PIANO_MIDI_NOTE_OFFSET + octaveOffset * OCTAVE,
        };
    }
    // Chromatic Percussion (Celesta)
    else if (program === 9) {
        return {
            instrument: Instrument.Celesta,
            note: note - CELESTA_MIDI_NOTE_OFFSET + octaveOffset * OCTAVE,
        };
    }
    // Chromatic Percussion
    else if (program <= 16) {
        return {
            instrument: Instrument.Vibraphone,
            note: note - VIBRAPHONE_MIDI_NOTE_OFFSET + octaveOffset * OCTAVE,
        };
    }
    // Organ
    else if (program <= 24) {
        return {
            instrument: Instrument.Square,
            note: note - SQUARE_MIDI_NOTE_OFFSET + octaveOffset * OCTAVE,
        };
    }
    // Guitar
    else if (program <= 32) {
        return {
            instrument: Instrument.Saw,
            note: note - SAW_MIDI_NOTE_OFFSET + octaveOffset * OCTAVE,
        };
    }
    // Bass
    else if (program <= 40) {
        return {
            instrument: Instrument.Bass,
            note: note - BASS_MIDI_NOTE_OFFSET + octaveOffset * OCTAVE,
        };
    }
    // Orchestra Solo
    else if (program <= 48) {
        return {
            instrument: Instrument.Lead,
            note: note - LEAD_MIDI_NOTE_OFFSET + octaveOffset * OCTAVE,
        };
    }
    // Orchestra Ensemble
    else if (program <= 56) {
        return {
            instrument: Instrument.Lead,
            note: note - LEAD_MIDI_NOTE_OFFSET + octaveOffset * OCTAVE,
        };
    }
    // Brass
    else if (program <= 64) {
        return {
            instrument: Instrument.Piano,
            note: note - PIANO_MIDI_NOTE_OFFSET + octaveOffset * OCTAVE,
        };
    }
    // Reed
    else if (program <= 72) {
        return {
            instrument: Instrument.Piano,
            note: note - PIANO_MIDI_NOTE_OFFSET + octaveOffset * OCTAVE,
        };
    }
    // Wind
    else if (program <= 80) {
        return {
            instrument: Instrument.Piano,
            note: note - PIANO_MIDI_NOTE_OFFSET + octaveOffset * OCTAVE,
        };
    }
    // Synth Lead (Square)
    else if (program === 81) {
        return {
            instrument: Instrument.Square,
            note: note - SQUARE_MIDI_NOTE_OFFSET + octaveOffset * OCTAVE,
        };
    }
    // Synth Lead (Saw)
    else if (program === 82) {
        return {
            instrument: Instrument.Saw,
            note: note - SAW_MIDI_NOTE_OFFSET + octaveOffset * OCTAVE,
        };
    }
    // Synth Lead
    else if (program <= 88) {
        return {
            instrument: Instrument.Lead,
            note: note - LEAD_MIDI_NOTE_OFFSET + octaveOffset * OCTAVE,
        };
    }
    // Synth Pad
    else if (program <= 96) {
        return {
            instrument: Instrument.Vibraphone,
            note: note - VIBRAPHONE_MIDI_NOTE_OFFSET + octaveOffset * OCTAVE,
        };
    }
    // Synth Sound FX
    else if (program <= 104) {
        return {
            instrument: Instrument.Saw,
            note: note - SAW_MIDI_NOTE_OFFSET + octaveOffset * OCTAVE,
        };
    }
    // Ethnic
    else if (program <= 112) {
        return {
            instrument: Instrument.Piano,
            note: note - PIANO_MIDI_NOTE_OFFSET + octaveOffset * OCTAVE,
        };
    }
    // Percussive
    else if (program <= 119) {
        return {
            instrument: Instrument.SteelDrum,
            note: note - STEEL_DRUM_MIDI_NOTE_OFFSET + octaveOffset * OCTAVE,
        };
    }
    // Percussive
    else if (program === 120) {
        return {
            instrument: Instrument.DrumKit,
            note: 13,
        };
    }
    // Sound Effect
    else if (program <= 128) {
        return {
            instrument: Instrument.None,
            note: 0,
        };
    }
    // Out of range
    else {
        throw new RangeError(`Program number (${program}) out of range.`);
    }
}
