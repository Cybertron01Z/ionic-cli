import * as path from 'path';

import * as replace from 'replace';

const pluginName = process.argv[2];
const pluginPath = path.join(__dirname, `../packages/${pluginName}`);
const plugin = require(pluginPath);
const pkg = require(path.join(pluginPath, 'package.json'));
const versionMatchStr = '__VERSION__';

if (!plugin.version) {
  throw new Error(`Plugin ${pluginName} MUST define and export a 'version' attribute`);
}

console.log(`Replacing '${versionMatchStr}' with '${pkg.version}' for ${pluginName}... (file should be listed if replaced):`);

replace({ regex: versionMatchStr, replacement: pkg.version, paths: [path.join(pluginPath, 'dist', 'index.js')], recursive: false });
