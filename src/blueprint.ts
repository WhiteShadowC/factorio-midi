import { Signals, Song, Track, UsableSignals } from './types';
import {
    ArithmeticCombinatorEntity,
    Blueprint,
    Connected,
    ConstantCombinatorEntity,
    DeciderCombinatorEntity,
    Direction,
    Entity,
    Instrument,
    ProgrammableSpeakerEntity
} from "./entities";

const NOTES_PER_SIGNAL = 5;
const SIGNALS_PER_COMBINATOR = 20;

export function generate(song: Song): Blueprint {
    const blueprint = new Blueprint(song.name);
    const controlConstant = blueprint.addEntity(new ConstantCombinatorEntity(0, 0))
        .setOn(false)
        .setSignal(1, 1, Signals.SignalDot)
        .setSignal(4, song.subdivision, Signals.SignalT)
        .setSignal(5, song.bpm, Signals.SignalInfo)
        .setSignal(6, Math.ceil(song.length), Signals.SignalRed);
    const npsArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(0, 1))
        .setDirection(Direction.Right)
        .setConditions(Signals.SignalInfo, Signals.SignalT, '*', Signals.SignalInfo)
        .addConnection(controlConstant, 'red', 1, 1);
    const tpnArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(1, 0))
        .setDirection(Direction.Right)
        .setConditions(3600, Signals.SignalInfo, '/', Signals.SignalPink)
        .addConnection(npsArithmetic, 'red', 1, 2);
    const resetLimitArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(2, 1))
        .setDirection(Direction.Right)
        .setConditions(Signals.SignalPink, Signals.SignalRed, '*', Signals.SignalBlack)
        .addConnection(controlConstant, 'red', 1, 1)
        .addConnection(tpnArithmetic, 'green', 1, 2)
    const loopDecider = blueprint.addEntity(new DeciderCombinatorEntity(3, 0))
        .setDirection(Direction.Right)
        .setConditions(Signals.SignalDot, Signals.SignalBlack, '<', Signals.SignalDot, true)
        .addConnection(resetLimitArithmetic, 'red', 1, 1)
        .addConnection(resetLimitArithmetic, 'green', 1, 2);
    loopDecider.addConnection(loopDecider, 'red', 1, 2);
    const noteTickArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(4, 1))
        .setDirection(Direction.Right)
        .setConditions(Signals.SignalDot, Signals.SignalPink, '/', Signals.SignalDot)
        .addConnection(loopDecider, 'red', 1, 2)
        .addConnection(tpnArithmetic, 'green', 1, 2);

    const noteLoadSwitcherArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(5, 2))
        .setDirection(Direction.Down)
        .setConditions(Signals.SignalDot, 100, '/', Signals.SignalCheck)
        .addConnection(noteTickArithmetic, 'red', 1, 2);
    generateNotes(blueprint, song.tracks);
    const firstNoteSwitchDecider = blueprint.getEntityAt(4, 2) as DeciderCombinatorEntity;
    const firstNoteKeyConstant = blueprint.getEntityAt(5, 4) as ConstantCombinatorEntity;
    const firstNoteFilterDecider = blueprint.getEntityAt(7, 4) as DeciderCombinatorEntity;

    const noteModuloArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(5, 0))
        .setDirection(Direction.Right)
        .setConditions(Signals.SignalDot, NOTES_PER_SIGNAL, '%', Signals.SignalInfo)
        .addConnection(noteTickArithmetic, 'red', 1, 2);
    const noteShiftAmountArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(6, 1))
        .setDirection(Direction.Right)
        .setConditions(Signals.SignalInfo, 6, '*', Signals.SignalInfo)
        .addConnection(noteModuloArithmetic, 'red', 1, 2);
    const noteShifterArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(7, 0))
        .setDirection(Direction.Right)
        .setConditions(Signals.SignalEach, Signals.SignalInfo, '>>', Signals.SignalEach)
        .addConnection(noteShiftAmountArithmetic, 'red', 1, 2)
        .addConnection(firstNoteSwitchDecider, 'green', 1, 2);
    const pulseArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(9, 0))
        .setDirection(Direction.Down)
        .setConditions(Signals.SignalDot, 0, '+', Signals.SignalInfo)
        .addConnection(noteModuloArithmetic, 'red', 1, 1)
        .addConnection(noteShifterArithmetic, 'green', 2, 2);
    const pulseDecider = blueprint.addEntity(new DeciderCombinatorEntity(10, 0))
        .setDirection(Direction.Down)
        .setConditions(Signals.SignalDot, Signals.SignalInfo, '≠', Signals.SignalEverything, true)
        .addConnection(pulseArithmetic, 'red', 1, 1)
        .addConnection(pulseArithmetic, 'green', 1, 2);
    const delayArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(11, 0))
        .setDirection(Direction.Down)
        .setConditions(Signals.SignalEach, 0, '+', Signals.SignalEach)
        .addConnection(pulseDecider, 'green', 1, 2);

    const signalPickerDivideArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(6, 2))
        .setDirection(Direction.Right)
        .setConditions(Signals.SignalDot, NOTES_PER_SIGNAL, '/', Signals.SignalInfo)
        .addConnection(noteLoadSwitcherArithmetic, 'red', 1, 1);
    const signalPickerModuloArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(6, 3))
        .setDirection(Direction.Right)
        .setConditions(Signals.SignalInfo, SIGNALS_PER_COMBINATOR, '%', Signals.SignalInfo)
        .addConnection(signalPickerDivideArithmetic, 'red', 1, 2);
    const additionHelperConstant = blueprint.addEntity(new ConstantCombinatorEntity(8, 3))
        .setSignal(1, 1, Signals.SignalInfo)
        .addConnection(firstNoteKeyConstant, 'green', 1, 1);
    const signalFilterDecider = blueprint.addEntity(new DeciderCombinatorEntity(8, 1))
        .setDirection(Direction.Up)
        .setConditions(Signals.SignalEach, Signals.SignalInfo, '=', Signals.SignalEach, false)
        .addConnection(signalPickerModuloArithmetic, 'red', 1, 2)
        .addConnection(additionHelperConstant, 'green', 1, 1);
    const signalFilterArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(9, 2))
        .setDirection(Direction.Right)
        .setConditions(Signals.SignalEach, -2147483648, '*', Signals.SignalEach)
        .addConnection(signalFilterDecider, 'green', 1, 2);

    const activeSignalFilterDecider = blueprint.addEntity(new DeciderCombinatorEntity(11, 2))
        .setDirection(Direction.Down)
        .setConditions(Signals.SignalEach, 0, '<', Signals.SignalEach, true)
        .addConnection(delayArithmetic, 'red', 1, 2)
        .addConnection(signalFilterArithmetic, 'red', 1, 2);
    blueprint.addEntity(new ArithmeticCombinatorEntity(9, 3))
        .setDirection(Direction.Left)
        .setConditions(Signals.SignalEach, 0b00111111, 'AND', Signals.SignalEach)
        .addConnection(activeSignalFilterDecider, 'red', 1, 2)
        .addConnection(firstNoteFilterDecider, 'red', 2, 1);

    return blueprint;
}

function generateNotes(blueprint: Blueprint, tracks: Track[]): void {
    let previous: Entity & Connected = blueprint.getEntityAt(5, 2) as ArithmeticCombinatorEntity;
    const maxNotesInTrack = tracks.reduce((max, track) => Math.max(max, track.notes.length), 0);
    for (let i = 0; i < Math.ceil(maxNotesInTrack / (NOTES_PER_SIGNAL * SIGNALS_PER_COMBINATOR)); i++) {
        let current = blueprint.addEntity(new DeciderCombinatorEntity(4 - i, 2))
            .setDirection(Direction.Up)
            .setConditions(Signals.SignalCheck, i, '=', Signals.SignalEverything, true);
        if (i === 0) {
            current.addConnection(previous, 'red', 1, 2);
        } else {
            current.addConnection(previous, 'red', 1, 1)
                .addConnection(previous, 'green', 2, 2);
        }
        previous = current;
    }

    let unusedSignals = structuredClone(UsableSignals);
    let previousKeyConstant: ConstantCombinatorEntity;
    let previousFilterDecider: DeciderCombinatorEntity;
    for (let trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
        const track = tracks[trackIndex];

        const keyConstant = blueprint.addEntity(new ConstantCombinatorEntity(5, 4 + trackIndex));
        track.notes
            .reduce((a, note, i) => {
                if (note !== 0) {
                    a[Math.floor(i % (NOTES_PER_SIGNAL * SIGNALS_PER_COMBINATOR) / NOTES_PER_SIGNAL)] = true;
                }
                return a;
            }, [] as boolean[])
            .map((needed, i) => ({ signal: unusedSignals.shift()!, count: i + 1, index: i + 1 }))
            .filter(f => f !== undefined)
            .forEach(f => keyConstant.setSignal(f.index, f.count, f.signal));

        const filterHelperConstant = blueprint.addEntity(new ConstantCombinatorEntity(6, 4 + trackIndex));
        filterHelperConstant.control_behavior.filters = structuredClone(keyConstant.control_behavior.filters);
        filterHelperConstant.control_behavior.filters.forEach(f => f.count = -2147483648);

        const filterDecider = blueprint.addEntity(new DeciderCombinatorEntity(7, 4 + trackIndex))
            .setDirection(Direction.Right)
            .setConditions(Signals.SignalEach, 0, '<', Signals.SignalEach, true)
            .addConnection(filterHelperConstant, 'green', 1, 1);

        const bitMaskArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(9, 4 + trackIndex))
            .setDirection(Direction.Right)
            .setConditions(Signals.SignalEach, 0b00111111, 'AND', Signals.SignalCheck)
            .addConnection(filterDecider, 'red', 1, 2);

        const speaker = blueprint.addEntity(new ProgrammableSpeakerEntity(11, 4 + trackIndex))
            .setGlobalPlayback(true)
            .setPolyphony(true)
            .setSignalValueIsPitch(true)
            .setFirstSignal(Signals.SignalCheck)
            .setInstrument(track.instrument)
            .addConnection(bitMaskArithmetic, 'red', 1, 2);
        if (track.instrument === Instrument.Sawtooth)
            speaker.setVolume(0.8);
        else if (track.instrument === Instrument.Square)
            speaker.setVolume(0.5);

        if (trackIndex > 0) {
            keyConstant.addConnection(previousKeyConstant!, 'green', 1, 1);
            filterDecider.addConnection(previousFilterDecider!, 'red', 1, 1);
        }
        previousKeyConstant = keyConstant;
        previousFilterDecider = filterDecider;

        let combinatorIndex = 1;
        let combinator: ConstantCombinatorEntity;
        for (let noteIndex = 0; noteIndex < maxNotesInTrack; noteIndex++) {
            const note = track.notes[noteIndex] ?? 0;

            if (noteIndex % (NOTES_PER_SIGNAL * SIGNALS_PER_COMBINATOR) === 0) {
                combinator = blueprint.addEntity(new ConstantCombinatorEntity(5 - combinatorIndex, 4 + trackIndex));
                combinator.control_behavior.filters = structuredClone(keyConstant.control_behavior.filters);
                combinator.control_behavior.filters.forEach(f => f.count = 0);
                const entity = blueprint.getEntityAt(5 - combinatorIndex, 4 + trackIndex - 1);
                if (entity && typeof (entity as Entity & Connected)['addConnection'] === 'function') {
                    combinator.addConnection(entity as Entity & Connected, 'green', 1, 1);
                }
                combinatorIndex++;
            }
            if (note === 0) continue;

            const channelIndex = Math.floor(noteIndex % (NOTES_PER_SIGNAL * SIGNALS_PER_COMBINATOR) / NOTES_PER_SIGNAL);
            combinator!.control_behavior.filters.find(f => f.index === channelIndex + 1)!.count += note << (noteIndex % NOTES_PER_SIGNAL * 6);
        }
    }
}
