export type GWTacticsBase = {
  name: string;
  url: string;
  gwId: string;
};

export type GWTacticsType = Omit<GWTacticsBase, 'url'> & {
  type: string;
  quality: string;
  rate: string;
  aptitude: string;
  description: {
    max: string;
    min: string;
  };
  specifiedCommanders: string[];
  inheritableCommanders: string[];
  gwId: string;
};

export class GWTactics<T extends GWTacticsType = GWTacticsType> {
  name: T['name'];
  type: T['type'];
  quality: T['quality'];
  rate: T['rate'];
  aptitude: T['aptitude'];
  description: T['description'];
  specifiedCommanders: T['specifiedCommanders'];
  inheritableCommanders: T['inheritableCommanders'];
  gwId: T['gwId'];

  constructor({
    name,
    type,
    quality,
    rate,
    aptitude,
    description,
    specifiedCommanders,
    inheritableCommanders,
    gwId,
  }: T) {
    this.name = name;
    this.type = type;
    this.quality = quality;
    this.rate = rate;
    this.aptitude = aptitude;
    this.description = description;
    this.specifiedCommanders = specifiedCommanders;
    this.inheritableCommanders = inheritableCommanders;
    this.gwId = gwId;
  }

  static assertProps(obj: any): asserts obj is GWTacticsType {
    const errs: string[] = [];
    for (const prop of ['name', 'type', 'quality', 'rate', 'aptitude', 'gwId']) {
      if (obj[prop] === undefined) {
        errs.push(prop);
      }
    }
    if (errs.length > 0) {
      throw new Error(
        `GWTactics Assertion Error: Expected props not to be undefined. [${errs.toString()}]`
      );
    }
    return obj;
  }
}
