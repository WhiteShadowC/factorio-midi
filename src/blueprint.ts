import pako from 'pako';
import { Blueprint, Entity, Song, Track, UsableSignals } from './types';

function exportBlueprint(blueprint: Blueprint): string {
  return '0' + Buffer.from(
    pako.deflate(
      JSON.stringify({ blueprint })
    )
  ).toString('base64');
}

export function generate(song: Song): string {
  const blueprint: Blueprint = {
    version: 281479278297089,
    item: 'blueprint',
    label: song.name,
    icons: [{
      index: 1,
      signal: UsableSignals.find((s) => s.name === 'programmable-speaker')!,
    }],
    entities: [
      {
        entity_number: 1,
        name: 'constant-combinator',
        direction: 4,
        position: { x: 0.5, y: 0.5 },
        control_behavior: {
          filters: [
            {
              signal: { type: "virtual", name: "signal-dot" },
              count: 1,
              index: 1
            },
            {
              signal: { type: 'virtual', name: 'signal-T' },
              count: song.subdivision,
              index: 4
            },
            {
              signal: { type: "virtual", name: "signal-info" },
              count: song.bpm,
              index: 5
            },
            {
              signal: { type: "virtual", name: "signal-red" },
              count: song.tracks.reduce((max, t) => Math.max(max, t.notes.length), 0),
              index: 6
            }
          ]
        }
      }
    ],
  };

  generateNotes(blueprint, song.tracks);

  return exportBlueprint(blueprint);
}

function generateTracks(blueprint: Blueprint, tracks: Track[]): void {

}

function generateNotes(blueprint: Blueprint, tracks: Track[]): void {
  for (let trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
    const track = tracks[trackIndex];
    const constantCombinator: Entity = {
      entity_number: blueprint.entities!.length + 1,
      name: 'constant-combinator',
      direction: 4,
      position: { x: 0.5, y: 0.5 - trackIndex },
      control_behavior: {
        filters: UsableSignals
          .filter((s, i) => trackIndex * 20 <= i && i < (trackIndex + 1) * 20)
          .map((s, i) => ({ signal: s, count: i + 1, index: i + 1 })),
      },
    };
    blueprint.entities!.push(constantCombinator);

    let combinatorIndex = 1;
    let combinator: Entity;
    for (let noteIndex = 0; noteIndex < track.notes.length; noteIndex++) {
      const note = track.notes[noteIndex];

      if (noteIndex % 100 === 0) {
        combinator = structuredClone(constantCombinator);
        combinator.entity_number = blueprint.entities!.length + 1;
        combinator.position.x += combinatorIndex;
        combinator.control_behavior!.filters!.forEach((f) => f.count = 0);
        blueprint.entities!.push(combinator);
        combinatorIndex++;
      }

      const channelIndex = Math.floor(noteIndex % 100 / 5);
      // @ts-ignore
      combinator.control_behavior!.filters![channelIndex].count += note << (noteIndex % 5 * 6);
    }
  }
}
