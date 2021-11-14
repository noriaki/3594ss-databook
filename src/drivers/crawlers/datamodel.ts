export type Status = {
  attack: string;
  intelligence: string;
  defense: string;
  velocity: string;
  admin: string;
  charm: string;
};

export type GWCharactorBaseTypes = {
  name: string;
  url: string;
  gwId: string;
};

export type GWCharactorTypes = Omit<GWCharactorBaseTypes, 'url'> & {
  rarity: string;
  cost: string;
  team: string;
  types: string;
  apt: {
    cavalry: string;
    shield: string;
    bow: string;
    spear: string;
    siege: string;
  };
  status: {
    min: Status;
    max: Status;
  };
  description: string;
};

export class GWCharactor<T extends GWCharactorTypes> {
  name: GWCharactorTypes['name'];
  rarity: GWCharactorTypes['rarity'];
  cost: GWCharactorTypes['cost'];
  team: GWCharactorTypes['team'];
  types: GWCharactorTypes['types'];
  apt: GWCharactorTypes['apt'];
  status: GWCharactorTypes['status'];
  description: GWCharactorTypes['description'];
  gwId: GWCharactorTypes['gwId'];

  constructor({
    name,
    rarity,
    cost,
    team,
    types,
    apt,
    status,
    description,
    gwId,
  }: GWCharactorTypes) {
    this.name = name;
    this.rarity = rarity;
    this.cost = cost;
    this.team = team;
    this.types = types;
    this.apt = apt;
    this.status = status;
    this.description = description;
    this.gwId = gwId;
  }

  static assertProps(obj: any): asserts obj is GWCharactorTypes {
    const errs: string[] = [];
    for (const prop of ['name', 'rarity', 'cost', 'team', 'types']) {
      if (obj[prop] === undefined) {
        errs.push(prop);
      }
    }
    for (const aptProp of ['cavalry', 'shield', 'bow', 'spear', 'siege']) {
      if (obj.apt[aptProp] === undefined) {
        errs.push(`apt.${aptProp}`);
      }
    }
    for (const statusProp of [
      'attack',
      'intelligence',
      'defense',
      'velocity',
      'admin',
      'charm',
    ]) {
      if (obj.status.max[statusProp] === undefined) {
        errs.push(`status.max.${statusProp}`);
      }
      if (obj.status.min[statusProp] === undefined) {
        errs.push(`status.min.${statusProp}`);
      }
    }
    for (const otherProp of ['description', 'gwId']) {
      if (obj[otherProp] === undefined) {
        errs.push(otherProp);
      }
    }
    if (errs.length > 0) {
      throw new Error(
        `GWCharactor Assertion Error: Expected props not to be undefined. [${errs.toString()}]`
      );
    }
    return obj;
  }
}
