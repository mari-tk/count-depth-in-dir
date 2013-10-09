var
  fs = require('fs'),
  path = require('path'),
  assert = require('assert');

function getListDirs(dir, maxLevel, currentLevel) {
  currentLevel = currentLevel || 1;

  if (!fs.lstatSync(dir).isDirectory()) {
    return [];
  }

  if (currentLevel >= maxLevel) {
    return [];
  }

  var
    listDirs = fs.readdirSync(dir),
    listAll = [],
    i;

  if (currentLevel === 1) {
    listAll.push(dir);
  }

  for (i = 0; i < listDirs.length; i++) {
    if (fs.lstatSync(path.join(dir, listDirs[i])).isDirectory()) {
      listAll.push(path.join(dir, listDirs[i]));
    }

    listAll = listAll.concat(getListDirs(path.join(dir, listDirs[i]), maxLevel, currentLevel + 1));
  }

  return listAll;
}

console.log('Length of dirs in "vico" with depth level 3:', getListDirs('vico', 3).length);
assert.deepEqual(getListDirs('vico', 3), ['vico', 'vico/bugfix', 'vico/bugfix/r4', 'vico/bugfix/r4tmp2', 'vico/rel', 'vico/rel/R4']);
assert.strictEqual(getListDirs('vico', 3).length, 6, 'Length is not 6.');