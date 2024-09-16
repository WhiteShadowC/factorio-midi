import { Connected, Direction, Entity } from "./Blueprint.ts";
import { Connection, Position, Signal } from "../types";
import { Comparator } from "./DeciderCombinator.ts";

export type Operation = '*' | '/' | '+' | '-' | '%' | '^' | '<<' | '>>' | 'AND' | 'OR' | 'XOR';

export class ArithmeticCombinatorEntity extends Entity implements Connected {
    name = 'arithmetic-combinator';
    direction = Direction.Left;
    control_behavior = {
        arithmetic_conditions: {
            first_signal: undefined as Signal | undefined,
            second_signal: undefined as Signal | undefined,
            first_constant: undefined as number | undefined,
            second_constant: 0 as number | undefined,
            operation: '*' as Operation,
            output_signal: undefined as Signal | undefined,
        }
    };
    connections = {
        '1': {} as Connection,
        '2': {} as Connection,
    };

    constructor(position: Position) {
        super(position);
    }

    setDirection(direction: Direction): this {
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
        firstSignal: Signal | number | null,
        secondSignal: Signal | number,
        operation: Operation,
        outputSignal: Signal | null
    ): this {
        return this.setFirstSignal(firstSignal)
            .setSecondSignal(secondSignal)
            .setOperation(operation)
            .setOutputSignal(outputSignal);
    }

    setFirstSignal(signal: Signal | number | null): this {
        if (signal === null) {
            delete this.control_behavior.arithmetic_conditions.first_signal;
            delete this.control_behavior.arithmetic_conditions.first_constant;
        } else if (typeof signal === 'number') {
            this.control_behavior.arithmetic_conditions.first_constant = signal;
            delete this.control_behavior.arithmetic_conditions.first_signal;
        } else {
            this.control_behavior.arithmetic_conditions.first_signal = signal;
            delete this.control_behavior.arithmetic_conditions.first_constant;
        }

        return this;
    }

    setSecondSignal(signal: Signal | number): this {
        if (typeof signal === 'number') {
            this.control_behavior.arithmetic_conditions.second_constant = signal;
            delete this.control_behavior.arithmetic_conditions.second_signal;
        } else {
            this.control_behavior.arithmetic_conditions.second_signal = signal;
            delete this.control_behavior.arithmetic_conditions.second_constant;
        }

        return this;
    }

    setOperation(operation: Operation): this {
        this.control_behavior.arithmetic_conditions.operation = operation;

        return this;
    }

    setOutputSignal(signal: Signal | null): this {
        if (signal === null)
            delete this.control_behavior.arithmetic_conditions.output_signal;
        else
            this.control_behavior.arithmetic_conditions.output_signal = signal;

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
