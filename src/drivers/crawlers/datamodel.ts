import { CommanderTypes } from '~/models/Commander';

import {
  translateAptitudes,
  translateCost,
  translateDescription,
  translateGwId,
  translateName,
  translateRarity,
  translateSpecialties,
  translateStatus,
  translateTeam,
  translateTypes,
} from './translator';

export type Status = {
  attack: string;
  intelligence: string;
  defense: string;
  velocity: string;
  admin: string;
  charm: string;
};

export type GWCommanderBaseTypes = {
  name: string;
  url: string;
  gwId: string;
};

export type GWCommanderTypes = Omit<GWCommanderBaseTypes, 'url'> & {
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

export class GWCommander<T extends GWCommanderTypes> {
  name: GWCommanderTypes['name'];
  rarity: GWCommanderTypes['rarity'];
  cost: GWCommanderTypes['cost'];
  team: GWCommanderTypes['team'];
  types: GWCommanderTypes['types'];
  apt: GWCommanderTypes['apt'];
  status: GWCommanderTypes['status'];
  description: GWCommanderTypes['description'];
  gwId: GWCommanderTypes['gwId'];

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
  }: GWCommanderTypes) {
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

  asCommanderObject(): CommanderTypes {
    return {
      name: translateName(this.name),
      rarity: translateRarity(this.rarity),
      cost: translateCost(this.cost),
      team: translateTeam(this.team),
      types: translateTypes(this.types),
      specialities: translateSpecialties(this.rarity),
      apt: translateAptitudes(this.apt),
      status: translateStatus(this.status),
      description: translateDescription(this.description),
      gwId: translateGwId(this.gwId),
    };
  }

  static assertProps(obj: any): asserts obj is GWCommanderTypes {
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
        `GWCommander Assertion Error: Expected props not to be undefined. [${errs.toString()}]`
      );
    }
    return obj;
  }
}
