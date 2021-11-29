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
  description: string;
  specifiedCommander?: string;
  inheritableCommander?: string;
};

export class GWTactics<T extends GWTacticsType = GWTacticsType> {
  name: T['name'];
  type: T['type'];
  quality: T['quality'];
  rate: T['rate'];
  aptitude: T['aptitude'];
  description: T['description'];
  specifiedCommander: T['specifiedCommander'];
  inheritableCommander: T['inheritableCommander'];

  constructor({
    name,
    type,
    quality,
    rate,
    aptitude,
    description,
    specifiedCommander,
    inheritableCommander,
  }: T) {
    this.name = name;
    this.type = type;
    this.quality = quality;
    this.rate = rate;
    this.aptitude = aptitude;
    this.description = description;
    this.specifiedCommander = specifiedCommander;
    this.inheritableCommander = inheritableCommander;
  }
}
