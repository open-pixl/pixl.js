import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const repoRoot = join(root, "..", "..");
const localesDir = join(root, "locales");
const generatedDir = join(root, "generated", "firmware");
const placeholderPattern = /(%(?:\d+\$)?[sdifuc]|{[a-zA-Z0-9_]+})/g;

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

function placeholders(text) {
  return [...text.matchAll(placeholderPattern)].map((match) => match[0]).sort();
}

const localeFiles = readdirSync(localesDir).filter((name) => name.endsWith(".json")).sort();
if (!localeFiles.includes("en-US.json")) {
  throw new Error("packages/i18n/locales/en-US.json is required as the base locale");
}

const locales = new Map(
  localeFiles.map((file) => [
    file,
    flatten(JSON.parse(readFileSync(join(localesDir, file), "utf8"))),
  ]),
);

const base = locales.get("en-US.json");
const baseKeys = Object.keys(base).sort();
const errors = [];

for (const [file, locale] of locales) {
  const keys = Object.keys(locale).sort();
  const missing = baseKeys.filter((key) => !keys.includes(key));
  const extra = keys.filter((key) => !baseKeys.includes(key));
  for (const key of missing) errors.push(`${file} missing key ${key}`);
  for (const key of extra) errors.push(`${file} has unknown key ${key}`);
  for (const key of baseKeys) {
    if (!(key in locale)) continue;
    const expected = placeholders(base[key]).join(",");
    const actual = placeholders(locale[key]).join(",");
    if (expected !== actual) {
      errors.push(`${file} placeholder mismatch for ${key}: expected [${expected}], got [${actual}]`);
    }
  }
}

const appSource = join(repoRoot, "apps", "web", "src");
const visibleTextPattern = />\s*([A-Za-z][^<>{}`\n]+?)\s*</g;
for (const file of readdirSync(appSource, { recursive: true })) {
  if (!String(file).endsWith(".tsx")) continue;
  const fullPath = join(appSource, file);
  const source = readFileSync(fullPath, "utf8");
  for (const match of source.matchAll(visibleTextPattern)) {
    errors.push(`${relative(repoRoot, fullPath)} has hardcoded JSX text: ${match[1].trim()}`);
  }
}

try {
  execFileSync("node", [join(root, "scripts", "generate-firmware-i18n.mjs"), "--check"], {
    cwd: repoRoot,
    stdio: "pipe",
  });
} catch (error) {
  errors.push(error.stdout?.toString().trim() || error.message);
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`i18n check passed for ${localeFiles.length} locales and ${generatedDir}`);
