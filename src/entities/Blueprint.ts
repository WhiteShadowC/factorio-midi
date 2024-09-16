import { Position, UsableSignals } from "../types";

export class Blueprint {
    version = 281479278886912;
    item = 'blueprint';
    label: string;
    icons = [
        {
            index: 1,
            signal: UsableSignals.find((s) => s.name === 'programmable-speaker')!,
        },
    ];
    entities: Entity[] = [];

    constructor(name: string) {
        this.label = name;
    }

    addEntity<T extends Entity>(entity: T): T {
        this.entities.push(entity);
        entity.entity_number = this.entities.length;
        return entity;
    }
}

export abstract class Entity {
    entity_number = 0;
    abstract name: string;
    position: Position;

    protected constructor(position: Position) {
        this.position = position;
    }

}
