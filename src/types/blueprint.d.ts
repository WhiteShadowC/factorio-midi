export type Blueprint = {
  icons: Icon[];
  entities?: Entity[];
  item: 'blueprint';
  label?: string;
  version: number;
}

export type Icon = {
  index: 1 | 2 | 3 | 4;
  signal: Signal;
}

export type Signal = {
  'type': 'item' | 'virtual' | 'fluid';
  'name': string;
};

export type Entity = {
  entity_number: number;
  name: string;
  position: Position;
  direction?: number
  control_behavior?: ControlBehavior;
  connections?: Record<'1' | '2', Connection>;

  parameters?: {
    playback_volume?: number
    playback_globally?: boolean
    allow_polyphony?: boolean
  };
  alert_parameters?: {
    show_alert?: boolean
    show_on_map?: boolean
    alert_message?: string
  }
}

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
  circuit_id: 1 | 2;
}

export type ControlBehavior = {
  /** only present if entity is constant-combinator */
  is_on?: boolean;
  filters?: ConstantCombinatorFilter[];

  circuit_condition?: Condition;

  /** only present if entity is decider-combinator */
  decider_conditions?: DeciderConditions;

  /** only present if entity is arithmetic-combinator */
  arithmetic_conditions?: ArithmeticConditions;

  /** only present if entity is programmable-speaker */
  circuit_parameters?: {
    instrument_id?: number;
    note_id?: number;
    signal_value_is_pitch?: boolean;
  };
}

export type ConstantCombinatorFilter = {
  signal: Signal;
  count: number;
  index: number;
}
