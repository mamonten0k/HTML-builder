const fs = require('fs/promises');

async function example() {
  try {
    const data = await fs.readFile('./01-read-file/text.txt', {
      encoding: 'utf8',
    });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

example();
