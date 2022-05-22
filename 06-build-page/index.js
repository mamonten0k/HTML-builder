const fs = require('fs/promises');
const { createWriteStream, createReadStream } = require('fs');

async function createChunk(entry, content, name) {
  const writableStream = createWriteStream(`${content}/${name}`);
  const files = await fs.readdir(entry, { withFileTypes: true });

  //reverse, потому что стили для footer в ином случае не читаются
  files.reverse().forEach((file) => {
    if (file.isFile() && file.name.split('.')[1] === 'css') {
      createReadStream(`${entry}/${file.name}`, 'utf8').pipe(writableStream);
    }
  });
}

async function createHtml(entry, content) {
  let template = await fs.readFile(`${__dirname}/template.html`, 'utf8');
  const refEntries = template.match(/{{.*}}/gi);
  const writableStream = createWriteStream(`${content}/index.html`);

  for (let ref of refEntries) {
    let fillingContent = await fs.readFile(
      `${entry}/${ref.slice(2, -2)}.html`,
      'utf8'
    );
    template = template.replace(ref, fillingContent);
  }

  writableStream.write(template);
}

async function copyAssets(entry, prod) {
  const assets = await fs.readdir(entry, { withFileTypes: true });
  await fs.mkdir(`${prod}`);

  for (let file of assets) {
    if (file.isFile()) {
      fs.copyFile(`${entry}/${file.name}`, `${prod}/${file.name}`);
    } else {
      copyAssets(`${entry}/${file.name}`, `${prod}/${file.name}`);
    }
  }
}

async function createDistSafe(path) {
  await fs.rm(path, { recursive: true, force: true });
  await fs.mkdir(path);
}

async function compileProd() {
  const cssEntry = `${__dirname}/styles`;
  const htmlEntry = `${__dirname}/components`;
  const assetsEntry = `${__dirname}/assets`;
  const distDir = `${__dirname}/project-dist`;

  await createDistSafe(distDir);
  await createChunk(cssEntry, distDir, 'style.css');
  await createHtml(htmlEntry, distDir);
  await copyAssets(assetsEntry, `${distDir}/assets`);
}

compileProd();
