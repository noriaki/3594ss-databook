import { build } from '~/drivers/spreadsheets/factory';

(async () => {
  const { doc, sheets } = await build();
  console.log(doc, sheets);
})();
