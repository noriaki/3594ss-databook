export const tacticsType = [
  '指揮',
  'アクティブ',
  '突撃',
  'パッシブ',
  '兵種',
  '陣法',
  '内政',
] as const;
export type TacticsType = typeof tacticsType[number];
export const isValidTacticsType = (type: unknown): type is TacticsType =>
  tacticsType.includes(type as TacticsType);

export const qualities = ['S', 'A', 'B', 'C', 'D'] as const;
export type Quality = typeof qualities[number];
export const isValidQuality = (quality: unknown): quality is Quality =>
  qualities.includes(quality as Quality);

export type TacticsProps = {
  name: string;
  type: TacticsType;
  quality: Quality;
};

export default class Tactics<T extends TacticsProps = TacticsProps> {
  name: T['name'];
  type: T['type'];
  quality: T['quality'];

  constructor({ name, type, quality }: T) {
    this.name = name;
    this.type = type;
    this.quality = quality;
  }
}
