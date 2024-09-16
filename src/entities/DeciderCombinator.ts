import { Connected, Direction, Entity } from "./Blueprint.ts";
import { Connection, Position, Signal } from "../types";

export type Comparator = '>' | '<' | '=' | '≥' | '≤' | '≠';

export class DeciderCombinatorEntity extends Entity implements Connected {
    name = 'decider-combinator';
    direction = Direction.Left;
    control_behavior = {
        decider_conditions: {
            first_signal: undefined as Signal | undefined,
            second_signal: undefined as Signal | undefined,
            constant: 0 as number | undefined,
            comparator: '<' as Comparator,
            output_signal: undefined as Signal | undefined,
            copy_count_from_input: true,
        }
    };
    connections = {
        '1': {} as Connection,
        '2': {} as Connection,
    };

    constructor(position: Position) {
        super(position);
    }

    setDirection(direction: Direction): DeciderCombinatorEntity {
        if (
            (this.direction === Direction.Left || this.direction === Direction.Right)
            && (direction === Direction.Up || direction === Direction.Down)
        ) {
            this.position.x -= 0.5;
            this.position.y += 0.5;
        }
        if (
            (this.direction === Direction.Up || this.direction === Direction.Down)
            && (direction === Direction.Left || direction === Direction.Right)
        ) {
            this.position.x += 0.5;
            this.position.y -= 0.5;
        }

        this.direction = direction;

        return this;
    }

    setConditions(
        firstSignal: Signal | null,
        secondSignal: Signal | number,
        comparator: Comparator,
        outputSignal: Signal | null,
        copyCount: boolean
    ): DeciderCombinatorEntity {
        return this.setFirstSignal(firstSignal)
            .setSecondSignal(secondSignal)
            .setComparator(comparator)
            .setOutputSignal(outputSignal)
            .setCopyCount(copyCount);
    }

    setFirstSignal(signal: Signal | null): DeciderCombinatorEntity {
        if (signal === null)
            delete this.control_behavior.decider_conditions.first_signal;
        else
            this.control_behavior.decider_conditions.first_signal = signal;

        return this;
    }

    setSecondSignal(signal: Signal | number): DeciderCombinatorEntity {
        if (typeof signal === 'number') {
            this.control_behavior.decider_conditions.constant = signal;
            delete this.control_behavior.decider_conditions.second_signal;
        } else {
            this.control_behavior.decider_conditions.second_signal = signal;
            delete this.control_behavior.decider_conditions.constant;
        }

        return this;
    }

    setComparator(comparator: Comparator): DeciderCombinatorEntity {
        this.control_behavior.decider_conditions.comparator = comparator;

        return this;
    }

    setOutputSignal(signal: Signal | null): DeciderCombinatorEntity {
        if (signal === null)
            delete this.control_behavior.decider_conditions.output_signal;
        else
            this.control_behavior.decider_conditions.output_signal = signal;

        return this;
    }

    setCopyCount(copyCount: boolean): DeciderCombinatorEntity {
        this.control_behavior.decider_conditions.copy_count_from_input = copyCount;

        return this;
    }

    addConnection(
        entity: Entity & Connected,
        wire: 'red' | 'green',
        thisSide: 1 | 2,
        otherSide: 1 | 2,
        createOpposite = true
    ): this {
        if (this.entity_number === 0 || entity.entity_number === 0) {
            throw new Error('Entity does not have an id yet. Cannot create connection.')
        }

        if (this.connections[thisSide][wire] === undefined)
            this.connections[thisSide][wire] = [];
        this.connections[thisSide][wire]!.push({
            entity_id: entity.entity_number,
            circuit_id: otherSide,
        });

        if (createOpposite)
            entity.addConnection(this, wire, otherSide, thisSide, false);

        return this;
    }
}
