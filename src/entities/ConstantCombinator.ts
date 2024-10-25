import { Connection, Quality, Signal } from "../types";
import { Connected, Direction, Entity } from "./Blueprint.ts";

type ConstantCombinatorFilter = {
    index: number;
    type: Signal['type'];
    name: string;
    quality: Quality;
    comparator: '=';
    count: number;
}

export const MAX_SIGNALS_PER_CONSTANT_COMBINATOR = 1000;

export class ConstantCombinatorEntity extends Entity implements Connected {
    name = 'constant-combinator';
    direction = Direction.Down;
    control_behavior = {
        is_on: true,
        sections: {
            sections: [
                {
                    index: 1,
                    filters: [] as ConstantCombinatorFilter[],
                },
            ],
        },
    };
    player_description?: string;
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

    setDescription(description: string | null): ConstantCombinatorEntity {
        if (description === null) {
            delete this.player_description;
        } else {
            this.player_description = description;
        }

        return this;
    }

    setSignal(index: number, count: number, signal: Signal, quality: Quality = 'normal'): ConstantCombinatorEntity {
        if (index < 1) {
            throw new RangeError(`Supplied index (${index}) is out of bounds.`);
        }

        let i = this.control_behavior.sections.sections[0].filters.findIndex(f => f.index === index);
        if (i === -1) {
            this.control_behavior.sections.sections[0].filters.push({
                index: index,
                type: signal.type,
                name: signal.name,
                quality: quality,
                comparator: '=',
                count: count,
            } as ConstantCombinatorFilter);
        } else {
            if (signal.type) this.control_behavior.sections.sections[0].filters[i].type = signal.type;
            else delete this.control_behavior.sections.sections[0].filters[i].type;
            this.control_behavior.sections.sections[0].filters[i].name = signal.name;
            this.control_behavior.sections.sections[0].filters[i].quality = quality;
            this.control_behavior.sections.sections[0].filters[i].count = count;
        }

        return this;
    }

    getSignal(index: number): ConstantCombinatorFilter | null {
        const filter = this.control_behavior.sections.sections[0].filters.find(f => f.index === index);
        if (filter === undefined) return null;

        return filter;
    }

    getAllSignals(): ConstantCombinatorFilter[] {
        return this.control_behavior.sections.sections[0].filters;
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
