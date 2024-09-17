import { Connected, Entity } from "./Blueprint.ts";
import { Connection, Signal } from "../types";
import { Comparator } from "./DeciderCombinator.ts";

export enum Instrument {
    Alarms = 1,
    Miscellaneous = 1,
    Drumkit = 2,
    Piano = 3,
    Bass = 4,
    Lead = 5,
    Sawtooth = 6,
    Square = 7,
    Celesta = 8,
    Vibraphone = 9,
    PluckedStrings = 10,
    SteelDrum = 11,
}

export class ProgrammableSpeakerEntity extends Entity implements Connected {
    name = 'programmable-speaker';
    control_behavior = {
        circuit_condition: undefined as {
            first_signal?: Signal,
            constant: number,
            comparator: Comparator,
        } | undefined,
        circuit_parameters: {
            signal_value_is_pitch: false,
            instrument_id: Instrument.Alarms,
            note_id: 0,
        },
    };
    connections = {
        '1': {} as Connection,
    };
    parameters = {
        playback_volume: 1,
        playback_globally: false,
        allow_polyphony: false,
    };
    alert_parameters = {
        show_alert: false,
        show_on_map: false,
        alert_message: '',
    };

    constructor(x: number, y: number) {
        super({ x: x + 0.5, y: y + 0.5 });
    }

    setInstrument(instrument: Instrument): this {
        this.control_behavior.circuit_parameters.instrument_id = instrument;

        return this;
    }

    setSignalValueIsPitch(signalValueIsPitch: boolean): this {
        this.control_behavior.circuit_parameters.signal_value_is_pitch = signalValueIsPitch;

        return this;
    }

    setFirstSignal(signal: Signal | null): this {
        if (signal === null) {
            delete this.control_behavior.circuit_condition;
        } else {
            if (this.control_behavior.circuit_condition === undefined)
                this.control_behavior.circuit_condition = {
                    first_signal: signal,
                    constant: 0,
                    comparator: '<',
                };
            this.control_behavior.circuit_condition.first_signal = signal;
        }

        return this;
    }

    setVolume(volume: number): this {
        this.parameters.playback_volume = volume;

        return this;
    }

    setGlobalPlayback(playGlobally: boolean): this {
        this.parameters.playback_globally = playGlobally;

        return this;
    }

    setPolyphony(polyphony: boolean): this {
        this.parameters.allow_polyphony = polyphony;

        return this;
    }

    addConnection(
        entity: Entity & Connected,
        wire: 'red' | 'green',
        _thisSide: 1 | 2,
        otherSide: 1 | 2,
        createOpposite = true
    ): this {
        if (this.entity_number === 0 || entity.entity_number === 0) {
            throw new Error('Entity does not have an id yet. Cannot create connection.')
        }

        if (this.connections['1'][wire] === undefined)
            this.connections['1'][wire] = [];
        this.connections['1'][wire]!.push({
            entity_id: entity.entity_number,
            circuit_id: otherSide,
        });

        if (createOpposite)
            entity.addConnection(this, wire, otherSide, 1, false);

        return this;
    }
}
