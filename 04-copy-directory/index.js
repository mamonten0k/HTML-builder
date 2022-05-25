const fs = require('fs/promises');

async function copyAssets(source, dest) {
  const assets = await fs.readdir(source, { withFileTypes: true });
  await fs.mkdir(`${dest}`);

  for (let file of assets) {
    if (file.isFile()) {
      fs.copyFile(`${source}/${file.name}`, `${dest}/${file.name}`);
    } else {
      copyAssets(`${source}/${file.name}`, `${dest}/${file.name}`);
    }
  }
}

async function copyDir() {
  const source = `${__dirname}/files`;
  const dest = `${__dirname}/files-copy`;

  await fs.rm(dest, { recursive: true, force: true });

  copyAssets(source, dest);
}

copyDir();
