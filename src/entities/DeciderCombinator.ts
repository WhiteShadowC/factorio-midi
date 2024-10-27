import { Connected, Direction, Entity } from "./Blueprint.ts";
import { Connection, Position, Signal } from "../types";

type DeciderCombinatorCondition = {
    first_signal: Signal | undefined,
    second_signal: Signal | undefined,
    constant: number | undefined,
    comparator: Comparator,
    compare_type: 'and' | undefined,
}

type DeciderCombinatorOutput = {
    signal: Signal;
    copy_count_from_input: boolean;
}

export type Comparator = '>' | '<' | '=' | '≥' | '≤' | '≠';

export class DeciderCombinatorEntity extends Entity implements Connected {
    name = 'decider-combinator';
    direction = Direction.Left;
    control_behavior = {
        decider_conditions: {
            conditions: [] as DeciderCombinatorCondition[],
            outputs: [] as DeciderCombinatorOutput[],
        }
    };
    connections = {
        '1': {} as Connection,
        '2': {} as Connection,
    };

    constructor(x: number, y: number) {
        super({ x: x + 1, y: y + 0.5 });
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

    setCondition(
        index: number,
        firstSignal: Signal | null,
        secondSignal: Signal | number,
        comparator: Comparator,
        andPrevious: boolean = false,
    ): DeciderCombinatorEntity {
        const condition = {
            comparator: comparator,
        } as DeciderCombinatorCondition;

        if (firstSignal !== null)
            condition.first_signal = firstSignal;

        if (typeof secondSignal === 'number')
            condition.constant = secondSignal;
        else
            condition.second_signal = secondSignal;

        if (andPrevious)
            condition.compare_type = 'and';


        this.control_behavior.decider_conditions.conditions[index] = condition;

        return this;
    }

    addOutput(signal: Signal, copyCount: boolean): DeciderCombinatorEntity {
        this.removeOutput(signal);

        this.control_behavior.decider_conditions.outputs.push(
            {
                signal: signal,
                copy_count_from_input: copyCount,
            }
        );

        return this;
    }

    removeOutput(signal: Signal): DeciderCombinatorEntity {
        const index = this.control_behavior.decider_conditions.outputs.findIndex(
            output => {
                return output.signal.name === signal.name
                    && output.signal.type === signal.type
                    && output.signal.quality === signal.quality;
            }
        );

        if (index !== -1)
            this.control_behavior.decider_conditions.outputs.splice(index, 1);

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
