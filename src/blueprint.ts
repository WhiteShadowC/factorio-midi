import { Signal, Signals, Song, Track, UsableSignals } from './types';
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

export function generate(song: Song): Blueprint {
    const blueprint = new Blueprint(song.name);

    const nps = song.bpm * song.subdivision;
    const tpn = Math.round(3600 / nps);
    const resetLimit = tpn * Math.ceil(song.length)

    const controlConstant = blueprint.addEntity(new ConstantCombinatorEntity(0, 0))
        .setOn(false)
        .setDescription(song.name)
        .setSignal(1, 1, Signals.SignalDot)
        .setSignal(5, tpn, Signals.SignalPink)
        .setSignal(6, resetLimit, Signals.SignalBlack);
    const loopDecider = blueprint.addEntity(new DeciderCombinatorEntity(1, 0))
        .setDirection(Direction.Right)
        .setCondition(0, Signals.SignalDot, Signals.SignalBlack, '<')
        .addOutput(Signals.SignalDot, true)
        .addConnection(controlConstant, 'red', 1, 1);
    loopDecider.addConnection(loopDecider, 'red', 1, 2);
    const noteTickArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(2, 1))
        .setDirection(Direction.Right)
        .setConditions(Signals.SignalDot, Signals.SignalPink, '/', Signals.SignalDot)
        .addConnection(loopDecider, 'red', 1, 2);

    const {
        signalsPerCombinator,
        firstNoteSwitchDecider,
        firstNoteKeyConstant,
        firstNoteFilterDecider
    } = generateNotes(blueprint, song.tracks);
    const noteLoadSwitcherArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(3, 2))
        .setDirection(Direction.Down)
        .setConditions(Signals.SignalDot, NOTES_PER_SIGNAL * signalsPerCombinator, '/', Signals.SignalCheck)
        .addConnection(noteTickArithmetic, 'red', 1, 2)
        .addConnection(firstNoteSwitchDecider, 'red', 2, 1);

    const noteModuloArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(3, 0))
        .setDirection(Direction.Right)
        .setConditions(Signals.SignalDot, NOTES_PER_SIGNAL, '%', Signals.SignalInfo)
        .addConnection(noteTickArithmetic, 'red', 1, 2);
    const noteShiftAmountArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(4, 1))
        .setDirection(Direction.Right)
        .setConditions(Signals.SignalInfo, 6, '*', Signals.SignalInfo)
        .addConnection(noteModuloArithmetic, 'red', 1, 2);
    const noteShifterArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(5, 0))
        .setDirection(Direction.Right)
        .setConditions(Signals.SignalEach, Signals.SignalInfo, '>>', Signals.SignalEach)
        .addConnection(noteShiftAmountArithmetic, 'red', 1, 2)
        .addConnection(firstNoteSwitchDecider, 'green', 1, 2);
    const pulseArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(7, 0))
        .setDirection(Direction.Down)
        .setConditions(Signals.SignalDot, 0, '+', Signals.SignalInfo)
        .addConnection(noteModuloArithmetic, 'red', 1, 1)
        .addConnection(noteShifterArithmetic, 'green', 2, 2);
    const pulseDecider = blueprint.addEntity(new DeciderCombinatorEntity(8, 0))
        .setDirection(Direction.Down)
        .setCondition(0, Signals.SignalDot, Signals.SignalInfo, '≠')
        .addOutput(Signals.SignalEverything, true)
        .addConnection(pulseArithmetic, 'red', 1, 1)
        .addConnection(pulseArithmetic, 'green', 1, 2);
    const delayArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(9, 0))
        .setDirection(Direction.Down)
        .setConditions(Signals.SignalEach, 0, '+', Signals.SignalEach)
        .addConnection(pulseDecider, 'green', 1, 2);

    const signalPickerDivideArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(4, 2))
        .setDirection(Direction.Right)
        .setConditions(Signals.SignalDot, NOTES_PER_SIGNAL, '/', Signals.SignalInfo)
        .addConnection(noteLoadSwitcherArithmetic, 'red', 1, 1);
    const signalPickerModuloArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(4, 3))
        .setDirection(Direction.Right)
        .setConditions(Signals.SignalInfo, signalsPerCombinator, '%', Signals.SignalInfo)
        .addConnection(signalPickerDivideArithmetic, 'red', 1, 2);
    const additionHelperConstant = blueprint.addEntity(new ConstantCombinatorEntity(6, 3))
        .setSignal(1, 1, Signals.SignalInfo)
        .addConnection(firstNoteKeyConstant, 'green', 1, 1);
    const signalFilterDecider = blueprint.addEntity(new DeciderCombinatorEntity(6, 1))
        .setDirection(Direction.Up)
        .setCondition(0, Signals.SignalEach, Signals.SignalInfo, '=')
        .addOutput(Signals.SignalEach, false)
        .addConnection(signalPickerModuloArithmetic, 'red', 1, 2)
        .addConnection(additionHelperConstant, 'green', 1, 1);
    const signalFilterArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(7, 2))
        .setDirection(Direction.Right)
        .setConditions(Signals.SignalEach, -2147483648, '*', Signals.SignalEach)
        .addConnection(signalFilterDecider, 'green', 1, 2);

    const activeSignalFilterDecider = blueprint.addEntity(new DeciderCombinatorEntity(9, 2))
        .setDirection(Direction.Down)
        .setCondition(0, Signals.SignalEach, 0, '<')
        .addOutput(Signals.SignalEach, true)
        .addConnection(delayArithmetic, 'red', 1, 2)
        .addConnection(signalFilterArithmetic, 'red', 1, 2);
    blueprint.addEntity(new ArithmeticCombinatorEntity(7, 3))
        .setDirection(Direction.Left)
        .setConditions(Signals.SignalEach, 0b00111111, 'AND', Signals.SignalEach)
        .addConnection(activeSignalFilterDecider, 'red', 1, 2)
        .addConnection(firstNoteFilterDecider, 'red', 2, 1);

    return blueprint;
}

function generateNotes(
    blueprint: Blueprint,
    tracks: Track[]
): {
    signalsPerCombinator: number,
    firstNoteSwitchDecider: DeciderCombinatorEntity,
    firstNoteKeyConstant: ConstantCombinatorEntity,
    firstNoteFilterDecider: DeciderCombinatorEntity,
} {
    tracks = compressNotes(tracks);
    let unusedSignals = structuredClone(UsableSignals)
        .flatMap(signal => ([
            { ...signal, quality: "legendary" },
            { ...signal, quality: "epic" },
            { ...signal, quality: "rare" },
            { ...signal, quality: "uncommon" },
            { ...signal, quality: "normal" },
        ] as Signal[]));

    const output = {
        signalsPerCombinator: findMaxSignalCountPerCombinator(tracks, unusedSignals.length),
        firstNoteSwitchDecider: undefined as unknown as DeciderCombinatorEntity,
        firstNoteKeyConstant: undefined as unknown as ConstantCombinatorEntity,
        firstNoteFilterDecider: undefined as unknown as DeciderCombinatorEntity,
    };

    let previous: DeciderCombinatorEntity;
    const maxSignalsInTrack = tracks.reduce((max, track) => Math.max(max, track.notes.length), 0);
    for (let i = 0; i < Math.ceil(maxSignalsInTrack / output.signalsPerCombinator); i++) {
        let current = blueprint.addEntity(new DeciderCombinatorEntity(2 - i, 2))
            .setDirection(Direction.Up)
            .setCondition(0, Signals.SignalCheck, i, '=')
            .addOutput(Signals.SignalEverything, true);
        if (i === 0) {
            output.firstNoteSwitchDecider = current;
        } else {
            current.addConnection(previous!, 'red', 1, 1)
                .addConnection(previous!, 'green', 2, 2);
        }
        previous = current;
    }

    let previousKeyConstant: ConstantCombinatorEntity;
    let previousFilterDecider: DeciderCombinatorEntity;
    for (let trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
        const track = tracks[trackIndex];

        const keyConstant = blueprint.addEntity(new ConstantCombinatorEntity(3, 4 + trackIndex));
        track.notes
            .reduce((needed, note, i) => {
                if (note > 0) {
                    needed[i % output.signalsPerCombinator] = true;
                }
                return needed;
            }, [] as boolean[])
            .map((needed, i) =>
                ({ signal: unusedSignals.shift()!, count: i + 1, index: i + 1 })
            )
            .filter(f => f !== undefined)
            .forEach(f => {
                keyConstant.setSignal(keyConstant.getAllSignals().length + 1, f.count, f.signal)
            });

        const filterDecider = blueprint.addEntity(new DeciderCombinatorEntity(5, 4 + trackIndex))
            .setDirection(Direction.Right)
            .setCondition(0, Signals.SignalInfo, 0, '=')
            .setCondition(1, Signals.SignalInfo, 0, '≠');
        keyConstant.getAllSignals().forEach(
            signal =>
                filterDecider.addOutput({ name: signal.name, type: signal.type, quality: signal.quality }, true)
        )

        const converterArithmetic = blueprint.addEntity(new ArithmeticCombinatorEntity(7, 4 + trackIndex))
            .setDirection(Direction.Right)
            .setConditions(Signals.SignalEach, 0, '+', Signals.SignalCheck)
            .addConnection(filterDecider, 'red', 1, 2);

        const speaker = blueprint.addEntity(new ProgrammableSpeakerEntity(9, 4 + trackIndex))
            .setPlaybackMode('global')
            .setPolyphony(true)
            .setSignalValueIsPitch(true)
            .setFirstSignal(Signals.SignalCheck)
            .setInstrument(track.instrument)
            .addConnection(converterArithmetic, 'red', 1, 2);
        if (track.instrument === Instrument.Sawtooth)
            speaker.setVolume(0.8);
        else if (track.instrument === Instrument.Square)
            speaker.setVolume(0.5);

        if (trackIndex === 0) {
            output.firstNoteKeyConstant = keyConstant;
            output.firstNoteFilterDecider = filterDecider;
        } else {
            keyConstant.addConnection(previousKeyConstant!, 'green', 1, 1);
            filterDecider.addConnection(previousFilterDecider!, 'red', 1, 1);
        }
        previousKeyConstant = keyConstant;
        previousFilterDecider = filterDecider;

        let combinatorIndex = 1;
        let combinator!: ConstantCombinatorEntity;
        for (let signalIndex = 0; signalIndex < track.notes.length; signalIndex++) {
            const signal = track.notes[signalIndex] ?? 0;

            if (signalIndex % output.signalsPerCombinator === 0) {
                if (trackIndex === 0) {
                    combinator = blueprint.addEntity(new ConstantCombinatorEntity(3 - combinatorIndex, 4));
                    const entity = blueprint.getEntityAt(3 - combinatorIndex, 3);
                    if (entity && typeof (entity as Entity & Connected)['addConnection'] === 'function') {
                        combinator.addConnection(entity as Entity & Connected, 'green', 1, 1);
                    }
                } else {
                    let found = false;
                    for (let i = trackIndex - 1; !found && i >= 0; i--) {
                        combinator = blueprint.getEntityAt(3 - combinatorIndex, 4 + i) as ConstantCombinatorEntity;
                        if (combinator) found = true;
                    }
                }
                combinatorIndex++;
            }
            if (signal === 0) continue;

            const keySignal = keyConstant.getAllSignals()
                .find(signal => signal.count === (signalIndex % output.signalsPerCombinator) + 1)!;

            combinator.setSignal(
                combinator.getAllSignals().length + 1,
                signal,
                {
                    type: keySignal.type,
                    name: keySignal.name,
                    quality: keySignal.quality,
                },
            );
        }
    }

    return output;
}

function compressNotes(tracks: Track[]): Track[] {
    const compressedTracks = [];

    for (const track of tracks) {
        const compressedTrack: Track = {
            instrument: track.instrument,
            notes: [],
        }
        for (let i = 0; i < track.notes.length; i++) {
            if (Math.floor(i % NOTES_PER_SIGNAL) === 0)
                compressedTrack.notes[Math.floor(i / NOTES_PER_SIGNAL)] = 0;
            compressedTrack.notes[Math.floor(i / NOTES_PER_SIGNAL)] += track.notes[i] << (6 * (i % NOTES_PER_SIGNAL));
        }
        compressedTracks.push(compressedTrack);
    }

    return compressedTracks;
}

function findMaxSignalCountPerCombinator(compressedTracks: Track[], availableSignals: number): number {
    const maxSignalsInTrack = compressedTracks.reduce((max, track) => Math.max(max, track.notes.length), 0);

    let maxSignals = Math.floor(availableSignals / compressedTracks.length);
    if (maxSignalsInTrack <= maxSignals) {
        return maxSignalsInTrack;
    }

    function doesConfigWork(tracks: Track[], maxSignals: number, availableSignals: number): boolean {
        for (const track of tracks) {
            const split: number[][] = [];
            for (let i = 0; i < track.notes.length; i += maxSignals) {
                split.push(track.notes.slice(i, i + maxSignals))
            }

            for (let note = 0; note < split[0].length; note++) {
                for (let combinator = 0; combinator < split.length; combinator++) {
                    if (split[combinator][note] > 0) {
                        availableSignals--;
                        break;
                    }
                }
            }
        }

        return availableSignals >= 0;
    }

    maxSignals = maxSignalsInTrack;
    while (maxSignals > 1 && !doesConfigWork(compressedTracks, maxSignals, availableSignals)) {
        maxSignals--;
    }

    return maxSignals;
}
