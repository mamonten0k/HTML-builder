const fs = require('fs');
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('What is your name? ', (data) => {
  appendToFile(data.toString());
  rl.close();
});

function appendToFile(data) {
  fs.writeFile('./02-write-file/text.txt', data, (err) => {
    if (err) {
      console.error(err);
    }
  });
}
