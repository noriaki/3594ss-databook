import { CommanderTypes } from '~/models/Commander';
import commanderNames from '~/models/commanderNames.json';

export const translateNo = (name: string): number =>
  commanderNames.indexOf(name) + 1;

export const translateTypes = (types: CommanderTypes['types']): string =>
  types.join();

export const translateSpecialities = (
  specialities: CommanderTypes['specialities']
): string => specialities.join();
