import { Connection, ConstantCombinatorFilter, Position, Signal } from "../types";
import { Connected, Entity } from "./Blueprint.ts";


export class ConstantCombinatorEntity extends Entity implements Connected {
    name = 'constant-combinator';
    direction = 4;
    control_behavior = {
        is_on: true,
        filters: [] as ConstantCombinatorFilter[],
    };
    connections = {
        '1': {} as Connection,
    };

    constructor(x: number, y: number) {
        super({ x: x + 0.5, y: y + 0.5 });
    }

    setOn(on: boolean): ConstantCombinatorEntity {
        this.control_behavior.is_on = on;

        return this;
    }

    setSignal(index: number, count: number, signal: Signal): ConstantCombinatorEntity {
        if (index < 1 || index > 20) {
            throw new RangeError(`Supplied index (${index}) is out of bounds.`);
        }

        let i = this.control_behavior.filters.findIndex(f => f.index === index);
        if (i === -1) {
            this.control_behavior.filters.push({
                signal: signal,
                count: count,
                index: index,
            } as ConstantCombinatorFilter);
        } else {
            this.control_behavior.filters[i].signal = signal;
            this.control_behavior.filters[i].count = count;
        }

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
