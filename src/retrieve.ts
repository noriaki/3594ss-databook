export const retrieveRarity = (text: string): number => {
  const m = text.match(/星([1-5])/);
  if (m) {
    return parseInt(m[1], 10);
  }
  throw new Error('Cannot retrieve [Rarity]');
};

export const retrieveCost = (text: string): number => parseInt(text, 10);

export const retrieveTeam = (text: string): string => text[0];

export const retrieveTypes = (text: string): string[] => text.split(',');

export const retrieveSpecialties = (text: string): string[] => {
  const m = text.match(/シーズン(\d)/);
  if (m) {
    return [`S${m[1]}`];
  }
  return [];
};
