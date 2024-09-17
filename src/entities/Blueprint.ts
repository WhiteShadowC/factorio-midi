import { Connection, Position, Signals } from "../types";

export class Blueprint {
    version = 281479278886912;
    item = 'blueprint';
    label: string;
    icons = [
        {
            index: 1,
            signal: Signals.ProgrammableSpeaker,
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

    getEntityAt(x: number, y: number): Entity | undefined {
        return this.entities.find(e =>
            (e.position.x === x + 0.5 && e.position.y === y + 0.5) ||
            (e.position.x === x + 1 && e.position.y === y + 0.5) ||
            (e.position.x === x + 0.5 && e.position.y === y + 1) ||
            (e.position.x === x && e.position.y === y + 0.5) ||
            (e.position.x === x + 0.5 && e.position.y === y)
        );
    }
}

export enum Direction {
    Up = 0,
    Right = 2,
    Down = 4,
    Left = 6,
}

export abstract class Entity {
    entity_number = 0;
    abstract name: string;
    position: Position;

    protected constructor(position: Position) {
        this.position = position;
    }
}

export interface Connected {
    connections: {
        '1': Connection,
        '2'?: Connection,
    };

    addConnection(
        entity: Entity & Connected,
        wire: 'red' | 'green',
        thisSide: 1 | 2,
        otherSide: 1 | 2,
        createOpposite: boolean
    ): this;
}
