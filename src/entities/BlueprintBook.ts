import { Blueprint } from "./Blueprint.ts";
import { Signals } from "../types";

type IndexedBlueprint = (Blueprint | BlueprintBook) & { index: number };

export class BlueprintBook {
    blueprint_book = {
        version: 281479278886912,
        item: 'blueprint-book',
        label: '',
        icons: [
            {
                index: 1,
                signal: Signals.ProgrammableSpeaker,
            },
        ],
        active_index: 0,
        blueprints: [] as IndexedBlueprint[],
    };

    constructor(name: string) {
        this.blueprint_book.label = name;
    }

    addBlueprint(blueprint: Blueprint | BlueprintBook): void {
        const index = this.blueprint_book.blueprints.length;
        this.setBlueprint(index, blueprint);
    }

    setBlueprint(index: number, blueprint: Blueprint | BlueprintBook): void {
        (blueprint as IndexedBlueprint).index = index;
        this.blueprint_book.blueprints[index] = blueprint as IndexedBlueprint;
    }
}
