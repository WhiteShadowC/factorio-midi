export type Signal = {
  'type'?: 'recipe' | 'entity' | 'space-location' | 'fluid' | 'virtual' | 'quality';
  'name': string;
  quality?: Quality
};

export type Quality = 'normal' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export type Position = {
  x: number;
  y: number;
}

export type Connection = {
  red?: WireConnection[];
  green?: WireConnection[];
}

export type WireConnection = {
  entity_id: number;
  /** Side of connection */
  circuit_id?: 1 | 2;
}
