const fs = require('fs/promises');
const { createWriteStream, createReadStream } = require('fs');

const entry = './05-merge-styles/styles';
const prod = './05-merge-styles/project-dist';

async function makeCssBundle() {
  await fs.rm(`${prod}/bundle.css`, { force: true });
  const writableStream = createWriteStream(`${prod}/bundle.css`);
  const files = await fs.readdir(entry, { withFileTypes: true });

  files.forEach((file) => {
    if (file.isFile() && file.name.split('.')[1] === 'css') {
      createReadStream(`${entry}/${file.name}`, 'utf8').pipe(writableStream);
    }
  });
}

makeCssBundle();
