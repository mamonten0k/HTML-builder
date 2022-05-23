const fs = require('fs/promises');

async function readRecursive(currPath) {
  const files = await fs.readdir(currPath, { withFileTypes: true });
  for (let file of files) {
    if (file.isFile()) {
      let stats = await fs.stat(`${currPath}/${file.name}`);
      console.log(
        file.name.split('.')[0] || 'system file (has no name)',
        '-',
        file.name.split('.')[1],
        '-',
        (stats.size / 1024).toFixed(3) + ' Kb'
      );
    }
  }
}

readRecursive('./03-files-in-folder/secret-folder');
