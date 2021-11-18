import {
  aptitudeKeys,
  Aptitudes,
  calcStatusDelta,
  Cost,
  isValidAptitudes,
  isValidCost,
  isValidRarity,
  isValidSpecialities,
  isValidStatus,
  isValidTeam,
  isValidTypes,
  Rarity,
  Speciality,
  SpecType,
  Status,
  statusKeys,
  StatusMap,
  Team,
} from '~/models/Commander';

export const translateName = (text: string): string => text.trim();

export const translateRarity = (text: string): Rarity => {
  const m = text.trim().match(/星([1-5])/);
  if (m) {
    const rarity = parseInt(m[1], 10);
    if (isValidRarity(rarity)) {
      return rarity;
    }
  }
  throw new Error(`Can't translate [Rarity]: ${text}`);
};

export const translateCost = (text: string): Cost => {
  const cost = parseInt(text.trim(), 10);
  if (isValidCost(cost)) {
    return cost;
  }
  throw new Error(`Can't translate [Cost]: ${text}`);
};

export const translateTeam = (text: string): Team => {
  const team = text.trim()[0];
  if (isValidTeam(team)) {
    return team;
  }
  throw new Error(`Can't translate [Team]: ${text}`);
};

export const translateTypes = (text: string): SpecType[] => {
  const types = text.trim().split('・');
  if (isValidTypes(types)) {
    return types;
  }
  throw new Error(`Can't translate [Type]: ${text}`);
};

export const translateSpecialties = (text: string): Speciality[] => {
  const m = text.trim().match(/シーズン(\d)/);
  if (m) {
    const specialities = [`S${m[1]}`];
    if (isValidSpecialities(specialities)) {
      return specialities;
    }
    throw new Error(`Can't translate [Specialities]: ${text}`);
  }
  return [];
};

type Apt = { [k in typeof aptitudeKeys[number]]: string };
export const translateAptitudes = (obj: {
  [key in string]: string;
}): Aptitudes => {
  const aptitudes = aptitudeKeys.reduce<Partial<Apt>>(
    (acc, key) => ({
      ...acc,
      [key]: obj[key].trim(),
    }),
    {}
  );
  if (isValidAptitudes(aptitudes)) {
    return aptitudes;
  }
  throw new Error(`Can't translate [Aptitudes]: ${Object.entries(obj)}`);
};

export const translateStatus = (obj: {
  min: { [k in string]: string };
  max: { [k in string]: string };
}): StatusMap => {
  const status: {
    min: Partial<Status>;
    max: Partial<Status>;
    delta: Partial<Status>;
  } = {
    min: {},
    max: {},
    delta: {},
  };
  for (const key of statusKeys) {
    const min = parseFloat(obj.min[key].trim());
    const max = parseFloat(obj.max[key].trim());
    const delta = calcStatusDelta(min, max);
    status.min[key] = min;
    status.max[key] = max;
    status.delta[key] = delta;
  }
  if (isValidStatus(status)) {
    return status;
  }
  console.log(status, obj);
  throw new Error(`Can't translate [Status]: ${Object.entries(obj)}`);
};

export const translateDescription = (text: string): string =>
  text.trim().split(/\n\n/).join('\n');

export const translateGwId = (text: string): number => parseInt(text, 10);
