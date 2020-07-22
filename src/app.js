import schedule from 'node-schedule';
import MailSender from 'noodle-email';

import gmailCredentials from '../credentials/gmail.json';

const mailClient = new MailSender(gmailCredentials);

mailClient.setFrom('"HuelPicker" <ryankrol.m@gmail.com>');
mailClient.setTo('ryankrol.m@gmail.com');

const FLAVOURS = [
  'Salted Caramel',
  'Strawberry',
  'Banana',
  'Apple Cinnamon',
  'Chocolate',
  'Peanut Butter',
  'Gingerbread',
  'Chocolate Cherry',
  'Berry',
  'Mocha',
  'Pumpkin Spice',
  'Vanilla',
  'Rhubarb and Custard',
  'Toffee',
];

function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

function generateIndicesFromArray(array) {
  const indicesSet = new Set();

  while (indicesSet.size < 5) {
    indicesSet.add(randomNumber(array.length));
  }

  return indicesSet;
}

schedule.scheduleJob('0 0 7 * * *', async () => {
  try {
    const indicesArray = Array.from(generateIndicesFromArray(FLAVOURS));
    const flavours = indicesArray.map((index) => FLAVOURS[index]);
    mailClient.sendMail('Daily Huel Flavours!', JSON.stringify(flavours));
  } catch (error) {
    mailClient.sendMail('Failed to pick Huel flavours!', error.toString());
  }
});
