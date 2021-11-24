import commanderNames from '~/models/commanderNames.json';
import type {
  Aptitude,
  CommanderType,
  CommanderTypes,
  Status,
} from '~/models/Commander';

type StatusValue = Status[keyof Status];

export type GSSCommanderTypes = {
  id: string;
  no: number;
  name: CommanderTypes['name'];
  rarity: CommanderTypes['rarity'];
  cost: CommanderTypes['cost'];
  team: CommanderTypes['team'];
  'apt/cavalry': Aptitude;
  'apt/shield': Aptitude;
  'apt/bow': Aptitude;
  'apt/spear': Aptitude;
  'apt/siege': Aptitude;
  types: CommanderTypes['types'];
  specialities: CommanderTypes['specialities'];
  'status/min/attack': StatusValue;
  'status/min/intelligence': StatusValue;
  'status/min/defense': StatusValue;
  'status/min/velocity': StatusValue;
  'status/min/admin': StatusValue;
  'status/min/charm': StatusValue;
  'status/max/attack': StatusValue;
  'status/max/intelligence': StatusValue;
  'status/max/defense': StatusValue;
  'status/max/velocity': StatusValue;
  'status/max/admin': StatusValue;
  'status/max/charm': StatusValue;
  'status/delta/attack': StatusValue;
  'status/delta/intelligence': StatusValue;
  'status/delta/defense': StatusValue;
  'status/delta/velocity': StatusValue;
  'status/delta/admin': StatusValue;
  'status/delta/charm': StatusValue;
  description: CommanderTypes['description'];
  specificTactics: CommanderTypes['specificTactics'];
  inheritedTactics: CommanderTypes['inheritedTactics'];
  gwId: CommanderTypes['gwId'];
};

export class GSSCommander<T extends GSSCommanderTypes> {
  id: GSSCommanderTypes['id'];
  no: GSSCommanderTypes['no'];
  name: GSSCommanderTypes['name'];
  rarity: GSSCommanderTypes['rarity'];
  cost: GSSCommanderTypes['cost'];
  team: GSSCommanderTypes['team'];
  'apt/cavalry': GSSCommanderTypes['apt/cavalry'];
  'apt/shield': GSSCommanderTypes['apt/shield'];
  'apt/bow': GSSCommanderTypes['apt/bow'];
  'apt/spear': GSSCommanderTypes['apt/spear'];
  'apt/siege': GSSCommanderTypes['apt/siege'];
  types: GSSCommanderTypes['types'];
  specialities: GSSCommanderTypes['specialities'];
  'status/min/attack': GSSCommanderTypes['status/min/attack'];
  'status/min/intelligence': GSSCommanderTypes['status/min/intelligence'];
  'status/min/defense': GSSCommanderTypes['status/min/defense'];
  'status/min/velocity': GSSCommanderTypes['status/min/velocity'];
  'status/min/admin': GSSCommanderTypes['status/min/admin'];
  'status/min/charm': GSSCommanderTypes['status/min/charm'];
  'status/max/attack': GSSCommanderTypes['status/max/attack'];
  'status/max/intelligence': GSSCommanderTypes['status/max/intelligence'];
  'status/max/defense': GSSCommanderTypes['status/max/defense'];
  'status/max/velocity': GSSCommanderTypes['status/max/velocity'];
  'status/max/admin': GSSCommanderTypes['status/max/admin'];
  'status/max/charm': GSSCommanderTypes['status/max/charm'];
  'status/delta/attack': GSSCommanderTypes['status/delta/attack'];
  'status/delta/intelligence': GSSCommanderTypes['status/delta/intelligence'];
  'status/delta/defense': GSSCommanderTypes['status/delta/defense'];
  'status/delta/velocity': GSSCommanderTypes['status/delta/velocity'];
  'status/delta/admin': GSSCommanderTypes['status/delta/admin'];
  'status/delta/charm': GSSCommanderTypes['status/delta/charm'];
  description: GSSCommanderTypes['description'];
  specificTactics: GSSCommanderTypes['specificTactics'];
  inheritedTactics: GSSCommanderTypes['inheritedTactics'];
  gwId: GSSCommanderTypes['gwId'];

  constructor(c: CommanderType) {
    this.id = c.id;
    this.no = commanderNames.indexOf(c.name) + 1;
    this.name = c.name;
    this.rarity = c.rarity;
    this.cost = c.cost;
    this.team = c.team;
    this['apt/cavalry'] = c.apt.cavalry;
    this['apt/shield'] = c.apt.shield;
    this['apt/bow'] = c.apt.bow;
    this['apt/spear'] = c.apt.spear;
    this['apt/siege'] = c.apt.siege;
    this.types = c.types;
    this.specialities = c.specialities;
    this['status/min/attack'] = c.status.min.attack;
    this['status/min/intelligence'] = c.status.min.intelligence;
    this['status/min/defense'] = c.status.min.defense;
    this['status/min/velocity'] = c.status.min.velocity;
    this['status/min/admin'] = c.status.min.admin;
    this['status/min/charm'] = c.status.min.charm;
    this['status/max/attack'] = c.status.max.attack;
    this['status/max/intelligence'] = c.status.max.intelligence;
    this['status/max/defense'] = c.status.max.defense;
    this['status/max/velocity'] = c.status.max.velocity;
    this['status/max/admin'] = c.status.max.admin;
    this['status/max/charm'] = c.status.max.charm;
    this['status/delta/attack'] = c.status.delta.attack;
    this['status/delta/intelligence'] = c.status.delta.intelligence;
    this['status/delta/defense'] = c.status.delta.defense;
    this['status/delta/velocity'] = c.status.delta.velocity;
    this['status/delta/admin'] = c.status.delta.admin;
    this['status/delta/charm'] = c.status.delta.charm;
    this.description = c.description;
    this.specificTactics = c.specificTactics;
    this.inheritedTactics = c.inheritedTactics;
    this.gwId = c.gwId;
  }

  static getProperties() {
    return [
      'id',
      'no',
      'name',
      'rarity',
      'cost',
      'team',
      'apt/cavalry',
      'apt/shield',
      'apt/bow',
      'apt/spear',
      'apt/siege',
      'types',
      'specialities',
      'status/min/attack',
      'status/min/intelligence',
      'status/min/defense',
      'status/min/velocity',
      'status/min/admin',
      'status/min/charm',
      'status/max/attack',
      'status/max/intelligence',
      'status/max/defense',
      'status/max/velocity',
      'status/max/admin',
      'status/max/charm',
      'status/delta/attack',
      'status/delta/intelligence',
      'status/delta/defense',
      'status/delta/velocity',
      'status/delta/admin',
      'status/delta/charm',
      'description',
      'specificTactics',
      'inheritedTactics',
      'gwId',
    ];
  }
}
