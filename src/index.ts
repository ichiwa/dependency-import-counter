#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

type ImportCounts = {
  [key: string]: number;
};

export async function countDependencies(): Promise<void> {
  const packageJsonPath = path.resolve(process.cwd(), './package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error('Error: package.json not found.');
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const packageJson = require(path.resolve(process.cwd(), './package.json'));
  if (!packageJson.dependencies) {
    console.error('Error: dependencies not found.');
    return;
  }
  const dependencies = Object.keys(packageJson.dependencies);
  const importCounts: ImportCounts = {};

  for (const dependency of dependencies) {
    importCounts[dependency] = 0;
  }

  const targetDirectories = process.argv.slice(2);
  if (targetDirectories.length === 0) {
    targetDirectories.push('./src');
  }

  for (const targetDirectory of targetDirectories) {
    const files = await getJavaScriptFiles(targetDirectory);

    for (const file of files) {
      const content = await fs.promises.readFile(file, 'utf8');
      for (const dependency of dependencies) {
        const regexImport = new RegExp(`from '${dependency}(/[^']*)?'`, 'g');
        const regexRequire = new RegExp(`require\\('${dependency}(/[^']*)?'\\)`, 'g');
        const matchesImport = content.match(regexImport);
        const matchesRequire = content.match(regexRequire);
        if (matchesImport) {
          importCounts[dependency] += matchesImport.length;
        }
        if (matchesRequire) {
          importCounts[dependency] += matchesRequire.length;
        }
      }
    }
  }

  const sortedImportCounts = Object.entries(importCounts).sort((a, b) => a[1] - b[1]);
  console.log('');
  for (const [dependency, count] of sortedImportCounts) {
    console.log(`${dependency}: ${count}`);
  }
}

async function getJavaScriptFiles(dir: string): Promise<string[]> {
  let results: string[] = [];
  const list = await fs.promises.readdir(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      const res = await getJavaScriptFiles(filePath);
      results = results.concat(res);
    } else if (filePath.endsWith('.js') || filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      results.push(filePath);
    }
  }
  return results;
}

countDependencies().catch(console.error);
