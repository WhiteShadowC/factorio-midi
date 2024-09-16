import { Connection, ConstantCombinatorFilter, Position, Signal } from "../types";
import { Entity } from "./Blueprint.ts";


export class ConstantCombinatorEntity extends Entity {
    name = 'constant-combinator';
    direction = 4;
    control_behavior = {
        is_on: true,
        filters: [] as ConstantCombinatorFilter[],
    };
    connections = {
        '1': {} as Connection,
    };

    constructor(position: Position) {
        super(position);
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

    addConnection(entity: Entity, wire: 'red' | 'green', otherSide: 1 | 2, createOpposite = true): ConstantCombinatorEntity {
        if (this.entity_number === 0 || entity.entity_number === 0) {
            throw new Error('Entity does not have an id yet. Cannot create connection.')
        }

        if (entity instanceof ConstantCombinatorEntity) {
            if (this.connections['1'][wire] === undefined)
                this.connections['1'][wire] = [];
            this.connections['1'][wire]!.push({ entity_id: entity.entity_number });

            if (createOpposite)
                entity.addConnection(this, wire, 1, false);
        }

        return this;
    }
}
