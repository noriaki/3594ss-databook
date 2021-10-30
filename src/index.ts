import { sum } from '~/lib/calc';

const f = (a: string): string => a.toUpperCase();

const wait = async (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const main = async (): Promise<void> => {
  console.log(f('start'));
  await wait(1500);
  console.log(sum(1, 2));
  console.log(f('end'));
};

main();
