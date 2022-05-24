const fs = require('fs/promises');

async function readRecursive(currPath) {
  const files = await fs.readdir(currPath, { withFileTypes: true });
  for (let file of files) {
    if (file.isFile()) {
      let stats = await fs.stat(`${currPath}/${file.name}`);
      console.log(
        file.name
          .split('.')
          .splice(0, file.name.split('.').length - 1)
          .join('.') || 'system file (has no name)',
        '-',
        file.name.split('.').pop(),
        '-',
        (stats.size / 1024).toFixed(3) + ' Kb'
      );
    }
  }
}

readRecursive('./03-files-in-folder/secret-folder');
