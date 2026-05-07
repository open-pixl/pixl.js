import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const localesDir = join(root, "locales");
const outDir = join(root, "generated", "firmware");
const checkOnly = process.argv.includes("--check");

function flatten(value, prefix = "", out = {}) {
  for (const [key, child] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (child && typeof child === "object" && !Array.isArray(child)) {
      flatten(child, path, out);
    } else {
      out[path] = String(child);
    }
  }
  return out;
}

function cString(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function idFor(key) {
  return `_L_${key.replace(/^firmware\./, "").replace(/[^A-Za-z0-9]+/g, "_").toUpperCase()}`;
}

const localeFiles = readdirSync(localesDir).filter((name) => name.endsWith(".json")).sort();
const localeData = localeFiles.map((file) => {
  const parsed = JSON.parse(readFileSync(join(localesDir, file), "utf8"));
  return {
    file,
    symbol: file.replace(".json", "").replace("-", "_"),
    strings: flatten(parsed),
  };
});

const base = localeData.find((locale) => locale.file === "en-US.json");
if (!base) throw new Error("en-US.json is required");

const firmwareKeys = Object.keys(base.strings)
  .filter((key) => key.startsWith("firmware."))
  .sort();

const outputs = new Map();
outputs.set(
  "string_id.h",
  [
    "#pragma once",
    "",
    "typedef enum {",
    ...firmwareKeys.map((key) => `    ${idFor(key)},`),
    "    _L_COUNT,",
    "} L_StringID;",
    "",
  ].join("\n"),
);

for (const locale of localeData) {
  outputs.set(
    `${locale.symbol}.c`,
    [
      '#include "string_id.h"',
      "",
      `const char *lang_${locale.symbol}[_L_COUNT] = {`,
      ...firmwareKeys.map((key) => `    [${idFor(key)}] = "${cString(locale.strings[key])}",`),
      "};",
      "",
    ].join("\n"),
  );
}

mkdirSync(outDir, { recursive: true });

const mismatches = [];
for (const [file, content] of outputs) {
  const path = join(outDir, file);
  if (checkOnly) {
    let current = "";
    try {
      current = readFileSync(path, "utf8");
    } catch {
      mismatches.push(`${file} is missing`);
      continue;
    }
    if (current !== content) mismatches.push(`${file} is out of sync`);
  } else {
    writeFileSync(path, content);
  }
}

if (mismatches.length > 0) {
  throw new Error(mismatches.join("\n"));
}

console.log(`${checkOnly ? "checked" : "generated"} ${outputs.size} firmware i18n files`);
