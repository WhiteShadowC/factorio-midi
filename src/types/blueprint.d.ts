export type Signal = {
  'type': 'item' | 'virtual' | 'fluid';
  'name': string;
};

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

export type ConstantCombinatorFilter = {
  signal: Signal;
  count: number;
  index: number;
}
