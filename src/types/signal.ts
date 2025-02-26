import type { Signal } from './blueprint.d.ts';

export const Signals: Record<string, Signal> = {
    WoodenChest: { 'type': 'item', 'name': 'wooden-chest' },
    IronChest: { 'type': 'item', 'name': 'iron-chest' },
    SteelChest: { 'type': 'item', 'name': 'steel-chest' },
    StorageTank: { 'type': 'item', 'name': 'storage-tank' },
    TransportBelt: { 'type': 'item', 'name': 'transport-belt' },
    FastTransportBelt: { 'type': 'item', 'name': 'fast-transport-belt' },
    ExpressTransportBelt: { 'type': 'item', 'name': 'express-transport-belt' },
    UndergroundBelt: { 'type': 'item', 'name': 'underground-belt' },
    FastUndergroundBelt: { 'type': 'item', 'name': 'fast-underground-belt' },
    ExpressUndergroundBelt: { 'type': 'item', 'name': 'express-underground-belt' },
    Splitter: { 'type': 'item', 'name': 'splitter' },
    FastSplitter: { 'type': 'item', 'name': 'fast-splitter' },
    ExpressSplitter: { 'type': 'item', 'name': 'express-splitter' },
    BurnerInserter: { 'type': 'item', 'name': 'burner-inserter' },
    Inserter: { 'type': 'item', 'name': 'inserter' },
    LongHandedInserter: { 'type': 'item', 'name': 'long-handed-inserter' },
    FastInserter: { 'type': 'item', 'name': 'fast-inserter' },
    FilterInserter: { 'type': 'item', 'name': 'filter-inserter' },
    StackInserter: { 'type': 'item', 'name': 'stack-inserter' },
    StackFilterInserter: { 'type': 'item', 'name': 'stack-filter-inserter' },
    SmallElectricPole: { 'type': 'item', 'name': 'small-electric-pole' },
    MediumElectricPole: { 'type': 'item', 'name': 'medium-electric-pole' },
    BigElectricPole: { 'type': 'item', 'name': 'big-electric-pole' },
    Substation: { 'type': 'item', 'name': 'substation' },
    Pipe: { 'type': 'item', 'name': 'pipe' },
    PipeToGround: { 'type': 'item', 'name': 'pipe-to-ground' },
    Pump: { 'type': 'item', 'name': 'pump' },
    Rail: { 'type': 'item', 'name': 'rail' },
    TrainStop: { 'type': 'item', 'name': 'train-stop' },
    RailSignal: { 'type': 'item', 'name': 'rail-signal' },
    RailChainSignal: { 'type': 'item', 'name': 'rail-chain-signal' },
    Locomotive: { 'type': 'item', 'name': 'locomotive' },
    CargoWagon: { 'type': 'item', 'name': 'cargo-wagon' },
    FluidWagon: { 'type': 'item', 'name': 'fluid-wagon' },
    ArtilleryWagon: { 'type': 'item', 'name': 'artillery-wagon' },
    Car: { 'type': 'item', 'name': 'car' },
    Tank: { 'type': 'item', 'name': 'tank' },
    Spidertron: { 'type': 'item', 'name': 'spidertron' },
    SpidertronRemote: { 'type': 'item', 'name': 'spidertron-remote' },
    LogisticRobot: { 'type': 'item', 'name': 'logistic-robot' },
    ConstructionRobot: { 'type': 'item', 'name': 'construction-robot' },
    LogisticChestActiveProvider: { 'type': 'item', 'name': 'logistic-chest-active-provider' },
    LogisticChestPassiveProvider: { 'type': 'item', 'name': 'logistic-chest-passive-provider' },
    LogisticChestStorage: { 'type': 'item', 'name': 'logistic-chest-storage' },
    LogisticChestBuffer: { 'type': 'item', 'name': 'logistic-chest-buffer' },
    LogisticChestRequester: { 'type': 'item', 'name': 'logistic-chest-requester' },
    Roboport: { 'type': 'item', 'name': 'roboport' },
    SmallLamp: { 'type': 'item', 'name': 'small-lamp' },
    RedWire: { 'type': 'item', 'name': 'red-wire' },
    GreenWire: { 'type': 'item', 'name': 'green-wire' },
    ArithmeticCombinator: { 'type': 'item', 'name': 'arithmetic-combinator' },
    DeciderCombinator: { 'type': 'item', 'name': 'decider-combinator' },
    ConstantCombinator: { 'type': 'item', 'name': 'constant-combinator' },
    PowerSwitch: { 'type': 'item', 'name': 'power-switch' },
    ProgrammableSpeaker: { 'type': 'item', 'name': 'programmable-speaker' },
    StoneBrick: { 'type': 'item', 'name': 'stone-brick' },
    Concrete: { 'type': 'item', 'name': 'concrete' },
    HazardConcrete: { 'type': 'item', 'name': 'hazard-concrete' },
    RefinedConcrete: { 'type': 'item', 'name': 'refined-concrete' },
    RefinedHazardConcrete: { 'type': 'item', 'name': 'refined-hazard-concrete' },
    Landfill: { 'type': 'item', 'name': 'landfill' },
    CliffExplosives: { 'type': 'item', 'name': 'cliff-explosives' },
    RepairPack: { 'type': 'item', 'name': 'repair-pack' },
    Blueprint: { 'type': 'item', 'name': 'blueprint' },
    DeconstructionPlanner: { 'type': 'item', 'name': 'deconstruction-planner' },
    UpgradePlanner: { 'type': 'item', 'name': 'upgrade-planner' },
    BlueprintBook: { 'type': 'item', 'name': 'blueprint-book' },
    Boiler: { 'type': 'item', 'name': 'boiler' },
    SteamEngine: { 'type': 'item', 'name': 'steam-engine' },
    SolarPanel: { 'type': 'item', 'name': 'solar-panel' },
    Accumulator: { 'type': 'item', 'name': 'accumulator' },
    NuclearReactor: { 'type': 'item', 'name': 'nuclear-reactor' },
    HeatPipe: { 'type': 'item', 'name': 'heat-pipe' },
    HeatExchanger: { 'type': 'item', 'name': 'heat-exchanger' },
    SteamTurbine: { 'type': 'item', 'name': 'steam-turbine' },
    BurnerMiningDrill: { 'type': 'item', 'name': 'burner-mining-drill' },
    ElectricMiningDrill: { 'type': 'item', 'name': 'electric-mining-drill' },
    OffshorePump: { 'type': 'item', 'name': 'offshore-pump' },
    Pumpjack: { 'type': 'item', 'name': 'pumpjack' },
    StoneFurnace: { 'type': 'item', 'name': 'stone-furnace' },
    SteelFurnace: { 'type': 'item', 'name': 'steel-furnace' },
    ElectricFurnace: { 'type': 'item', 'name': 'electric-furnace' },
    AssemblingMachine1: { 'type': 'item', 'name': 'assembling-machine-1' },
    AssemblingMachine2: { 'type': 'item', 'name': 'assembling-machine-2' },
    AssemblingMachine3: { 'type': 'item', 'name': 'assembling-machine-3' },
    OilRefinery: { 'type': 'item', 'name': 'oil-refinery' },
    ChemicalPlant: { 'type': 'item', 'name': 'chemical-plant' },
    Centrifuge: { 'type': 'item', 'name': 'centrifuge' },
    Lab: { 'type': 'item', 'name': 'lab' },
    Beacon: { 'type': 'item', 'name': 'beacon' },
    SpeedModule: { 'type': 'item', 'name': 'speed-module' },
    SpeedModule2: { 'type': 'item', 'name': 'speed-module-2' },
    SpeedModule3: { 'type': 'item', 'name': 'speed-module-3' },
    EffectivityModule: { 'type': 'item', 'name': 'effectivity-module' },
    EffectivityModule2: { 'type': 'item', 'name': 'effectivity-module-2' },
    EffectivityModule3: { 'type': 'item', 'name': 'effectivity-module-3' },
    ProductivityModule: { 'type': 'item', 'name': 'productivity-module' },
    ProductivityModule2: { 'type': 'item', 'name': 'productivity-module-2' },
    ProductivityModule3: { 'type': 'item', 'name': 'productivity-module-3' },
    RocketSilo: { 'type': 'item', 'name': 'rocket-silo' },
    Satellite: { 'type': 'item', 'name': 'satellite' },
    Wood: { 'type': 'item', 'name': 'wood' },
    Coal: { 'type': 'item', 'name': 'coal' },
    Stone: { 'type': 'item', 'name': 'stone' },
    IronOre: { 'type': 'item', 'name': 'iron-ore' },
    CopperOre: { 'type': 'item', 'name': 'copper-ore' },
    UraniumOre: { 'type': 'item', 'name': 'uranium-ore' },
    RawFish: { 'type': 'item', 'name': 'raw-fish' },
    IronPlate: { 'type': 'item', 'name': 'iron-plate' },
    CopperPlate: { 'type': 'item', 'name': 'copper-plate' },
    SolidFuel: { 'type': 'item', 'name': 'solid-fuel' },
    SteelPlate: { 'type': 'item', 'name': 'steel-plate' },
    PlasticBar: { 'type': 'item', 'name': 'plastic-bar' },
    Sulfur: { 'type': 'item', 'name': 'sulfur' },
    Battery: { 'type': 'item', 'name': 'battery' },
    Explosives: { 'type': 'item', 'name': 'explosives' },
    CrudeOilBarrel: { 'type': 'item', 'name': 'crude-oil-barrel' },
    HeavyOilBarrel: { 'type': 'item', 'name': 'heavy-oil-barrel' },
    LightOilBarrel: { 'type': 'item', 'name': 'light-oil-barrel' },
    LubricantBarrel: { 'type': 'item', 'name': 'lubricant-barrel' },
    PetroleumGasBarrel: { 'type': 'item', 'name': 'petroleum-gas-barrel' },
    SulfuricAcidBarrel: { 'type': 'item', 'name': 'sulfuric-acid-barrel' },
    WaterBarrel: { 'type': 'item', 'name': 'water-barrel' },
    CopperCable: { 'type': 'item', 'name': 'copper-cable' },
    IronStick: { 'type': 'item', 'name': 'iron-stick' },
    IronGearWheel: { 'type': 'item', 'name': 'iron-gear-wheel' },
    EmptyBarrel: { 'type': 'item', 'name': 'empty-barrel' },
    ElectronicCircuit: { 'type': 'item', 'name': 'electronic-circuit' },
    AdvancedCircuit: { 'type': 'item', 'name': 'advanced-circuit' },
    ProcessingUnit: { 'type': 'item', 'name': 'processing-unit' },
    EngineUnit: { 'type': 'item', 'name': 'engine-unit' },
    ElectricEngineUnit: { 'type': 'item', 'name': 'electric-engine-unit' },
    FlyingRobotFrame: { 'type': 'item', 'name': 'flying-robot-frame' },
    RocketControlUnit: { 'type': 'item', 'name': 'rocket-control-unit' },
    LowDensityStructure: { 'type': 'item', 'name': 'low-density-structure' },
    RocketFuel: { 'type': 'item', 'name': 'rocket-fuel' },
    NuclearFuel: { 'type': 'item', 'name': 'nuclear-fuel' },
    Uranium235: { 'type': 'item', 'name': 'uranium-235' },
    Uranium238: { 'type': 'item', 'name': 'uranium-238' },
    UraniumFuelCell: { 'type': 'item', 'name': 'uranium-fuel-cell' },
    UsedUpUraniumFuelCell: { 'type': 'item', 'name': 'used-up-uranium-fuel-cell' },
    AutomationSciencePack: { 'type': 'item', 'name': 'automation-science-pack' },
    LogisticSciencePack: { 'type': 'item', 'name': 'logistic-science-pack' },
    MilitarySciencePack: { 'type': 'item', 'name': 'military-science-pack' },
    ChemicalSciencePack: { 'type': 'item', 'name': 'chemical-science-pack' },
    ProductionSciencePack: { 'type': 'item', 'name': 'production-science-pack' },
    UtilitySciencePack: { 'type': 'item', 'name': 'utility-science-pack' },
    SpaceSciencePack: { 'type': 'item', 'name': 'space-science-pack' },
    Pistol: { 'type': 'item', 'name': 'pistol' },
    SubmachineGun: { 'type': 'item', 'name': 'submachine-gun' },
    Shotgun: { 'type': 'item', 'name': 'shotgun' },
    CombatShotgun: { 'type': 'item', 'name': 'combat-shotgun' },
    RocketLauncher: { 'type': 'item', 'name': 'rocket-launcher' },
    Flamethrower: { 'type': 'item', 'name': 'flamethrower' },
    LandMine: { 'type': 'item', 'name': 'land-mine' },
    FirearmMagazine: { 'type': 'item', 'name': 'firearm-magazine' },
    PiercingRoundsMagazine: { 'type': 'item', 'name': 'piercing-rounds-magazine' },
    UraniumRoundsMagazine: { 'type': 'item', 'name': 'uranium-rounds-magazine' },
    ShotgunShell: { 'type': 'item', 'name': 'shotgun-shell' },
    PiercingShotgunShell: { 'type': 'item', 'name': 'piercing-shotgun-shell' },
    CannonShell: { 'type': 'item', 'name': 'cannon-shell' },
    ExplosiveCannonShell: { 'type': 'item', 'name': 'explosive-cannon-shell' },
    UraniumCannonShell: { 'type': 'item', 'name': 'uranium-cannon-shell' },
    ExplosiveUraniumCannonShell: { 'type': 'item', 'name': 'explosive-uranium-cannon-shell' },
    ArtilleryShell: { 'type': 'item', 'name': 'artillery-shell' },
    Rocket: { 'type': 'item', 'name': 'rocket' },
    ExplosiveRocket: { 'type': 'item', 'name': 'explosive-rocket' },
    AtomicBomb: { 'type': 'item', 'name': 'atomic-bomb' },
    FlamethrowerAmmo: { 'type': 'item', 'name': 'flamethrower-ammo' },
    Grenade: { 'type': 'item', 'name': 'grenade' },
    ClusterGrenade: { 'type': 'item', 'name': 'cluster-grenade' },
    PoisonCapsule: { 'type': 'item', 'name': 'poison-capsule' },
    SlowdownCapsule: { 'type': 'item', 'name': 'slowdown-capsule' },
    DefenderCapsule: { 'type': 'item', 'name': 'defender-capsule' },
    DistractorCapsule: { 'type': 'item', 'name': 'distractor-capsule' },
    DestroyerCapsule: { 'type': 'item', 'name': 'destroyer-capsule' },
    LightArmor: { 'type': 'item', 'name': 'light-armor' },
    HeavyArmor: { 'type': 'item', 'name': 'heavy-armor' },
    ModularArmor: { 'type': 'item', 'name': 'modular-armor' },
    PowerArmor: { 'type': 'item', 'name': 'power-armor' },
    PowerArmorMk2: { 'type': 'item', 'name': 'power-armor-mk2' },
    SolarPanelEquipment: { 'type': 'item', 'name': 'solar-panel-equipment' },
    FusionReactorEquipment: { 'type': 'item', 'name': 'fusion-reactor-equipment' },
    BatteryEquipment: { 'type': 'item', 'name': 'battery-equipment' },
    BatteryMk2Equipment: { 'type': 'item', 'name': 'battery-mk2-equipment' },
    BeltImmunityEquipment: { 'type': 'item', 'name': 'belt-immunity-equipment' },
    ExoskeletonEquipment: { 'type': 'item', 'name': 'exoskeleton-equipment' },
    PersonalRoboportEquipment: { 'type': 'item', 'name': 'personal-roboport-equipment' },
    PersonalRoboportMk2Equipment: { 'type': 'item', 'name': 'personal-roboport-mk2-equipment' },
    NightVisionEquipment: { 'type': 'item', 'name': 'night-vision-equipment' },
    EnergyShieldEquipment: { 'type': 'item', 'name': 'energy-shield-equipment' },
    EnergyShieldMk2Equipment: { 'type': 'item', 'name': 'energy-shield-mk2-equipment' },
    PersonalLaserDefenseEquipment: { 'type': 'item', 'name': 'personal-laser-defense-equipment' },
    DischargeDefenseEquipment: { 'type': 'item', 'name': 'discharge-defense-equipment' },
    DischargeDefenseRemote: { 'type': 'item', 'name': 'discharge-defense-remote' },
    StoneWall: { 'type': 'item', 'name': 'stone-wall' },
    Gate: { 'type': 'item', 'name': 'gate' },
    GunTurret: { 'type': 'item', 'name': 'gun-turret' },
    LaserTurret: { 'type': 'item', 'name': 'laser-turret' },
    FlamethrowerTurret: { 'type': 'item', 'name': 'flamethrower-turret' },
    ArtilleryTurret: { 'type': 'item', 'name': 'artillery-turret' },
    ArtilleryTargetingRemote: { 'type': 'item', 'name': 'artillery-targeting-remote' },
    Radar: { 'type': 'item', 'name': 'radar' },
    Water: { 'type': 'fluid', 'name': 'water' },
    CrudeOil: { 'type': 'fluid', 'name': 'crude-oil' },
    Steam: { 'type': 'fluid', 'name': 'steam' },
    HeavyOil: { 'type': 'fluid', 'name': 'heavy-oil' },
    LightOil: { 'type': 'fluid', 'name': 'light-oil' },
    PetroleumGas: { 'type': 'fluid', 'name': 'petroleum-gas' },
    SulfuricAcid: { 'type': 'fluid', 'name': 'sulfuric-acid' },
    Lubricant: { 'type': 'fluid', 'name': 'lubricant' },
    Signal0: { 'type': 'virtual', 'name': 'signal-0' },
    Signal1: { 'type': 'virtual', 'name': 'signal-1' },
    Signal2: { 'type': 'virtual', 'name': 'signal-2' },
    Signal3: { 'type': 'virtual', 'name': 'signal-3' },
    Signal4: { 'type': 'virtual', 'name': 'signal-4' },
    Signal5: { 'type': 'virtual', 'name': 'signal-5' },
    Signal6: { 'type': 'virtual', 'name': 'signal-6' },
    Signal7: { 'type': 'virtual', 'name': 'signal-7' },
    Signal8: { 'type': 'virtual', 'name': 'signal-8' },
    Signal9: { 'type': 'virtual', 'name': 'signal-9' },
    SignalA: { 'type': 'virtual', 'name': 'signal-A' },
    SignalB: { 'type': 'virtual', 'name': 'signal-B' },
    SignalC: { 'type': 'virtual', 'name': 'signal-C' },
    SignalD: { 'type': 'virtual', 'name': 'signal-D' },
    SignalE: { 'type': 'virtual', 'name': 'signal-E' },
    SignalF: { 'type': 'virtual', 'name': 'signal-F' },
    SignalG: { 'type': 'virtual', 'name': 'signal-G' },
    SignalH: { 'type': 'virtual', 'name': 'signal-H' },
    SignalI: { 'type': 'virtual', 'name': 'signal-I' },
    SignalJ: { 'type': 'virtual', 'name': 'signal-J' },
    SignalK: { 'type': 'virtual', 'name': 'signal-K' },
    SignalL: { 'type': 'virtual', 'name': 'signal-L' },
    SignalM: { 'type': 'virtual', 'name': 'signal-M' },
    SignalN: { 'type': 'virtual', 'name': 'signal-N' },
    SignalO: { 'type': 'virtual', 'name': 'signal-O' },
    SignalP: { 'type': 'virtual', 'name': 'signal-P' },
    SignalQ: { 'type': 'virtual', 'name': 'signal-Q' },
    SignalR: { 'type': 'virtual', 'name': 'signal-R' },
    SignalS: { 'type': 'virtual', 'name': 'signal-S' },
    SignalT: { 'type': 'virtual', 'name': 'signal-T' },
    SignalU: { 'type': 'virtual', 'name': 'signal-U' },
    SignalV: { 'type': 'virtual', 'name': 'signal-V' },
    SignalW: { 'type': 'virtual', 'name': 'signal-W' },
    SignalX: { 'type': 'virtual', 'name': 'signal-X' },
    SignalY: { 'type': 'virtual', 'name': 'signal-Y' },
    SignalZ: { 'type': 'virtual', 'name': 'signal-Z' },
    SignalRed: { 'type': 'virtual', 'name': 'signal-red' },
    SignalGreen: { 'type': 'virtual', 'name': 'signal-green' },
    SignalBlue: { 'type': 'virtual', 'name': 'signal-blue' },
    SignalYellow: { 'type': 'virtual', 'name': 'signal-yellow' },
    SignalPink: { 'type': 'virtual', 'name': 'signal-pink' },
    SignalCyan: { 'type': 'virtual', 'name': 'signal-cyan' },
    SignalWhite: { 'type': 'virtual', 'name': 'signal-white' },
    SignalGrey: { 'type': 'virtual', 'name': 'signal-grey' },
    SignalBlack: { 'type': 'virtual', 'name': 'signal-black' },
    SignalCheck: { 'type': 'virtual', 'name': 'signal-check' },
    SignalInfo: { 'type': 'virtual', 'name': 'signal-info' },
    SignalDot: { 'type': 'virtual', 'name': 'signal-dot' },
    SignalAnything: { 'type': 'virtual', 'name': 'signal-anything' },
    SignalEach: { 'type': 'virtual', 'name': 'signal-each' },
    SignalEverything: { 'type': 'virtual', 'name': 'signal-everything' },
}

export const UsableSignals: Signal[] = [
    Signals.WoodenChest,
    Signals.IronChest,
    Signals.SteelChest,
    Signals.StorageTank,
    Signals.TransportBelt,
    Signals.FastTransportBelt,
    Signals.ExpressTransportBelt,
    Signals.UndergroundBelt,
    Signals.FastUndergroundBelt,
    Signals.ExpressUndergroundBelt,
    Signals.Splitter,
    Signals.FastSplitter,
    Signals.ExpressSplitter,
    Signals.BurnerInserter,
    Signals.Inserter,
    Signals.LongHandedInserter,
    Signals.FastInserter,
    Signals.FilterInserter,
    Signals.StackInserter,
    Signals.StackFilterInserter,
    Signals.SmallElectricPole,
    Signals.MediumElectricPole,
    Signals.BigElectricPole,
    Signals.Substation,
    Signals.Pipe,
    Signals.PipeToGround,
    Signals.Pump,
    Signals.Rail,
    Signals.TrainStop,
    Signals.RailSignal,
    Signals.RailChainSignal,
    Signals.Locomotive,
    Signals.CargoWagon,
    Signals.FluidWagon,
    Signals.ArtilleryWagon,
    Signals.Car,
    Signals.Tank,
    Signals.Spidertron,
    Signals.SpidertronRemote,
    Signals.LogisticRobot,
    Signals.ConstructionRobot,
    Signals.LogisticChestActiveProvider,
    Signals.LogisticChestPassiveProvider,
    Signals.LogisticChestStorage,
    Signals.LogisticChestBuffer,
    Signals.LogisticChestRequester,
    Signals.Roboport,
    Signals.SmallLamp,
    Signals.RedWire,
    Signals.GreenWire,
    Signals.ArithmeticCombinator,
    Signals.DeciderCombinator,
    Signals.ConstantCombinator,
    Signals.PowerSwitch,
    Signals.ProgrammableSpeaker,
    Signals.StoneBrick,
    Signals.Concrete,
    Signals.HazardConcrete,
    Signals.RefinedConcrete,
    Signals.RefinedHazardConcrete,
    Signals.Landfill,
    Signals.CliffExplosives,
    Signals.RepairPack,
    Signals.Blueprint,
    Signals.DeconstructionPlanner,
    Signals.UpgradePlanner,
    Signals.BlueprintBook,
    Signals.Boiler,
    Signals.SteamEngine,
    Signals.SolarPanel,
    Signals.Accumulator,
    Signals.NuclearReactor,
    Signals.HeatPipe,
    Signals.HeatExchanger,
    Signals.SteamTurbine,
    Signals.BurnerMiningDrill,
    Signals.ElectricMiningDrill,
    Signals.OffshorePump,
    Signals.Pumpjack,
    Signals.StoneFurnace,
    Signals.SteelFurnace,
    Signals.ElectricFurnace,
    Signals.AssemblingMachine1,
    Signals.AssemblingMachine2,
    Signals.AssemblingMachine3,
    Signals.OilRefinery,
    Signals.ChemicalPlant,
    Signals.Centrifuge,
    Signals.Lab,
    Signals.Beacon,
    Signals.SpeedModule,
    Signals.SpeedModule2,
    Signals.SpeedModule3,
    Signals.EffectivityModule,
    Signals.EffectivityModule2,
    Signals.EffectivityModule3,
    Signals.ProductivityModule,
    Signals.ProductivityModule2,
    Signals.ProductivityModule3,
    Signals.RocketSilo,
    Signals.Satellite,
    Signals.Wood,
    Signals.Coal,
    Signals.Stone,
    Signals.IronOre,
    Signals.CopperOre,
    Signals.UraniumOre,
    Signals.RawFish,
    Signals.IronPlate,
    Signals.CopperPlate,
    Signals.SolidFuel,
    Signals.SteelPlate,
    Signals.PlasticBar,
    Signals.Sulfur,
    Signals.Battery,
    Signals.Explosives,
    Signals.CrudeOilBarrel,
    Signals.HeavyOilBarrel,
    Signals.LightOilBarrel,
    Signals.LubricantBarrel,
    Signals.PetroleumGasBarrel,
    Signals.SulfuricAcidBarrel,
    Signals.WaterBarrel,
    Signals.CopperCable,
    Signals.IronStick,
    Signals.IronGearWheel,
    Signals.EmptyBarrel,
    Signals.ElectronicCircuit,
    Signals.AdvancedCircuit,
    Signals.ProcessingUnit,
    Signals.EngineUnit,
    Signals.ElectricEngineUnit,
    Signals.FlyingRobotFrame,
    Signals.RocketControlUnit,
    Signals.LowDensityStructure,
    Signals.RocketFuel,
    Signals.NuclearFuel,
    Signals.Uranium235,
    Signals.Uranium238,
    Signals.UraniumFuelCell,
    Signals.UsedUpUraniumFuelCell,
    Signals.AutomationSciencePack,
    Signals.LogisticSciencePack,
    Signals.MilitarySciencePack,
    Signals.ChemicalSciencePack,
    Signals.ProductionSciencePack,
    Signals.UtilitySciencePack,
    Signals.SpaceSciencePack,
    Signals.Pistol,
    Signals.SubmachineGun,
    Signals.Shotgun,
    Signals.CombatShotgun,
    Signals.RocketLauncher,
    Signals.Flamethrower,
    Signals.LandMine,
    Signals.FirearmMagazine,
    Signals.PiercingRoundsMagazine,
    Signals.UraniumRoundsMagazine,
    Signals.ShotgunShell,
    Signals.PiercingShotgunShell,
    Signals.CannonShell,
    Signals.ExplosiveCannonShell,
    Signals.UraniumCannonShell,
    Signals.ExplosiveUraniumCannonShell,
    Signals.ArtilleryShell,
    Signals.Rocket,
    Signals.ExplosiveRocket,
    Signals.AtomicBomb,
    Signals.FlamethrowerAmmo,
    Signals.Grenade,
    Signals.ClusterGrenade,
    Signals.PoisonCapsule,
    Signals.SlowdownCapsule,
    Signals.DefenderCapsule,
    Signals.DistractorCapsule,
    Signals.DestroyerCapsule,
    Signals.LightArmor,
    Signals.HeavyArmor,
    Signals.ModularArmor,
    Signals.PowerArmor,
    Signals.PowerArmorMk2,
    Signals.SolarPanelEquipment,
    Signals.FusionReactorEquipment,
    Signals.BatteryEquipment,
    Signals.BatteryMk2Equipment,
    Signals.BeltImmunityEquipment,
    Signals.ExoskeletonEquipment,
    Signals.PersonalRoboportEquipment,
    Signals.PersonalRoboportMk2Equipment,
    Signals.NightVisionEquipment,
    Signals.EnergyShieldEquipment,
    Signals.EnergyShieldMk2Equipment,
    Signals.PersonalLaserDefenseEquipment,
    Signals.DischargeDefenseEquipment,
    Signals.DischargeDefenseRemote,
    Signals.StoneWall,
    Signals.Gate,
    Signals.GunTurret,
    Signals.LaserTurret,
    Signals.FlamethrowerTurret,
    Signals.ArtilleryTurret,
    Signals.ArtilleryTargetingRemote,
    Signals.Radar,
    Signals.Water,
    Signals.CrudeOil,
    Signals.Steam,
    Signals.HeavyOil,
    Signals.LightOil,
    Signals.PetroleumGas,
    Signals.SulfuricAcid,
    Signals.Lubricant,
    Signals.Signal0,
    Signals.Signal1,
    Signals.Signal2,
    Signals.Signal3,
    Signals.Signal4,
    Signals.Signal5,
    Signals.Signal6,
    Signals.Signal7,
    Signals.Signal8,
    Signals.Signal9,
    Signals.SignalA,
    Signals.SignalB,
    Signals.SignalC,
    Signals.SignalD,
    Signals.SignalE,
    Signals.SignalF,
    Signals.SignalG,
    Signals.SignalH,
    Signals.SignalI,
    Signals.SignalJ,
    Signals.SignalK,
    Signals.SignalL,
    Signals.SignalM,
    Signals.SignalN,
    Signals.SignalO,
    Signals.SignalP,
    Signals.SignalQ,
    Signals.SignalR,
    Signals.SignalS,
    Signals.SignalT,
    Signals.SignalU,
    Signals.SignalV,
    Signals.SignalW,
    Signals.SignalX,
    Signals.SignalY,
    Signals.SignalZ,
    Signals.SignalRed,
    Signals.SignalGreen,
    Signals.SignalBlue,
    Signals.SignalYellow,
    Signals.SignalPink,
    Signals.SignalCyan,
    Signals.SignalWhite,
    Signals.SignalGrey,
    Signals.SignalBlack,
];
