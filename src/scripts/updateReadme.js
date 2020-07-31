import * as ejs from 'ejs';
import * as fs from 'fs';
import util from 'util';

import { FLAVOURS, README_TEMPLATE_LOCATION, README_LOCATION } from '../constants/constants';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function main() {
  const readmeTemplate = await readFile(README_TEMPLATE_LOCATION, 'utf8');
  const formattedFlavourString = FLAVOURS.reduce((acc, current) => `${acc}\n- ${current}`, '');
  const content = ejs.render(readmeTemplate, { flavours_string: formattedFlavourString });
  await writeFile(README_LOCATION, content);
}

main();
