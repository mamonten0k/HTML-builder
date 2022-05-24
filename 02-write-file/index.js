const { createWriteStream } = require('fs');
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const writableStream = createWriteStream(`${__dirname}/text.txt`);

console.log('Type something on console, please: \n');

rl.on('line', (data) => {
  if (data.toString() === 'exit') {
    rl.close();
    return;
  }
  writableStream.write(`${data.toString()}\r\n`);
});

rl.on('close', onClose);

function onClose() {
  console.log('Thanks for you coomperation!!!');
}
