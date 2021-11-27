export const rarityValues = [1, 2, 3, 4, 5] as const;
export type Rarity = typeof rarityValues[number];
export const isValidRarity = (rarity: number): rarity is Rarity =>
  rarityValues.includes(rarity as Rarity);

export const costValues = [1, 2, 3, 4, 5, 6, 7, 30] as const;
export type Cost = typeof costValues[number];
export const isValidCost = (cost: number): cost is Cost =>
  costValues.includes(cost as Cost);

export const teamValues = ['魏', '蜀', '呉', '群'] as const;
export type Team = typeof teamValues[number];
export const isValidTeam = (team: string): team is Team =>
  teamValues.includes(team as Team);

export const specTypeValues = [
  '武',
  '盾',
  '戦',
  '補',
  '控',
  '謀',
  '兼',
  '医',
  '蛮',
  '黄',
  '仙',
  '卒',
  '政',
  '魅',
] as const;
export type SpecType = typeof specTypeValues[number];
export const isValidTypes = (types: string[]): types is SpecType[] =>
  types.every((t) => specTypeValues.includes(t as SpecType));

export const specialityValues = ['S2', 'S3'] as const;
export type Speciality = typeof specialityValues[number];
export const isValidSpecialities = (
  specialities: string[]
): specialities is Speciality[] =>
  specialities.every((speciality) =>
    specialityValues.includes(speciality as Speciality)
  );

export const aptitudeKeys = [
  'cavalry',
  'shield',
  'bow',
  'spear',
  'siege',
] as const;
export const aptitudeValues = ['S', 'A', 'B', 'C'] as const;
export type Aptitude = typeof aptitudeValues[number];
export type Aptitudes = {
  [key in typeof aptitudeKeys[number]]: Aptitude;
};
export type AptitudeKey = keyof Aptitudes;
export const isValidAptitudes = (aptitudes: {
  [k in string]: string;
}): aptitudes is Aptitudes => {
  for (const [key, val] of Object.entries(aptitudes)) {
    if (
      !aptitudeKeys.includes(key as AptitudeKey) ||
      !aptitudeValues.includes(val as Aptitude)
    ) {
      return false;
    }
  }
  return true;
};

export const statusKeys = [
  'attack',
  'intelligence',
  'defense',
  'velocity',
  'admin',
  'charm',
] as const;
export type Status = {
  [key in typeof statusKeys[number]]: number;
};
export type StatusMap = {
  min: Status;
  max: Status;
  delta: Status;
};
export const calcStatusDelta = (min: number, max: number): number =>
  round2((max - min) / 49.0);
export const isValidStatus = (status: {
  min: { [key in string]: number };
  max: { [key in string]: number };
  delta: { [key in string]: number };
}): status is StatusMap => {
  for (const key of statusKeys) {
    const min = status.min[key];
    const max = status.max[key];
    const delta = status.delta[key];
    if (
      typeof min !== 'number' ||
      typeof max !== 'number' ||
      typeof delta !== 'number' ||
      delta !== calcStatusDelta(min, max)
    ) {
      return false;
    }
  }
  return true;
};

export type CommanderTypes = {
  name: string;
  rarity: Rarity;
  cost: Cost;
  team: Team;
  types: SpecType[];
  specialities: Speciality[];
  apt: Aptitudes;
  status: StatusMap;
  description: string;
  specificTactics: string;
  inheritedTactics?: string;
  gwId: number;
};

export default class Commander<T extends CommanderTypes> {
  id: string;
  name: CommanderTypes['name'];
  rarity: CommanderTypes['rarity'];
  cost: CommanderTypes['cost'];
  team: CommanderTypes['team'];
  types: CommanderTypes['types'];
  specialities: CommanderTypes['specialities'];
  apt: CommanderTypes['apt'];
  status: CommanderTypes['status'];
  description: CommanderTypes['description'];
  specificTactics: CommanderTypes['specificTactics'];
  inheritedTactics: CommanderTypes['inheritedTactics'];
  gwId: CommanderTypes['gwId'];

  constructor({
    name,
    rarity,
    cost,
    team,
    types,
    specialities,
    apt,
    status,
    description,
    specificTactics,
    inheritedTactics,
    gwId,
  }: CommanderTypes) {
    this.id = identify(rarity, name);
    this.name = name;
    this.rarity = rarity;
    this.cost = cost;
    this.team = team;
    this.specialities = specialities;
    this.types = types;
    this.apt = apt;
    this.status = status;
    this.description = description;
    this.specificTactics = specificTactics;
    this.inheritedTactics = inheritedTactics;
    this.gwId = gwId;
  }
}
export type CommanderType = Commander<CommanderTypes>;

// identifier
const identify = (
  rarity: CommanderTypes['rarity'],
  name: CommanderTypes['name']
): string => `☆${rarity}・${name}`;

// utils
const round2 = (num: number): number => Math.round(num * 100) / 100;
