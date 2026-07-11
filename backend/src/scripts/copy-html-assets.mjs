import process from "node:process";
import { cp, mkdir, readdir, stat } from "node:fs/promises";
import { extname, join, relative, dirname } from "node:path";

const sourceDir = join(process.cwd(), "src");
const outputDir = join(process.cwd(), "dist");

async function copyHtmlFiles(currentDir) {
  const entries = await readdir(currentDir);

  for (const entry of entries) {
    const sourcePath = join(currentDir, entry);
    const sourceStat = await stat(sourcePath);

    if (sourceStat.isDirectory()) {
      await copyHtmlFiles(sourcePath);
      continue;
    }

    if (extname(sourcePath) !== ".html") {
      continue;
    }

    const relativePath = relative(sourceDir, sourcePath);
    const destinationPath = join(outputDir, relativePath);

    await mkdir(dirname(destinationPath), { recursive: true });
    await cp(sourcePath, destinationPath);
  }
}

await copyHtmlFiles(sourceDir);