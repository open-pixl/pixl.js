import { useMemo, useState } from "react";
import enUS from "@open-pixl/i18n/locales/en-US.json";
import ptBR from "@open-pixl/i18n/locales/pt-BR.json";
import { NRF_DFU_SERVICE_UUID, detectBrowserSupport } from "@open-pixl/protocol";

type LocaleCode = "en-US" | "pt-BR";
type LocaleTree = typeof enUS;
type BluetoothLike = {
  requestDevice(options: {
    filters: Array<{ namePrefix: string }>;
    optionalServices: string[];
  }): Promise<{ name?: string }>;
};

const locales: Record<LocaleCode, LocaleTree> = {
  "en-US": enUS,
  "pt-BR": ptBR,
};

function readPath(tree: LocaleTree, path: string) {
  const [scope, ...rest] = path.split(".");
  const scoped = tree[scope as keyof LocaleTree];
  if (scoped && typeof scoped === "object") {
    const scopedKey = rest.join(".");
    const scopedValue = (scoped as Record<string, unknown>)[scopedKey];
    if (typeof scopedValue === "string") return scopedValue;
  }

  const value = path.split(".").reduce<unknown>((current, part) => {
    if (current && typeof current === "object" && part in current) {
      return (current as Record<string, unknown>)[part];
    }
    return undefined;
  }, tree);
  return typeof value === "string" ? value : path;
}

function format(template: string, values: Record<string, string> = {}) {
  return template.replace(/{([a-zA-Z0-9_]+)}/g, (_, key: string) => values[key] ?? "");
}

export function App() {
  const [locale, setLocale] = useState<LocaleCode>("en-US");
  const [status, setStatus] = useState("status.ready");
  const [statusValue, setStatusValue] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState("");
  const support = useMemo(
    () => detectBrowserSupport(navigator.userAgent, "bluetooth" in navigator),
    [],
  );

  const t = (key: string, values?: Record<string, string>) =>
    format(readPath(locales[locale], `web.${key}`), values);

  async function connect() {
    const bluetooth = (navigator as Navigator & { bluetooth?: BluetoothLike }).bluetooth;
    if (!bluetooth || !support.webBluetooth) {
      setStatus("status.unsupported");
      setStatusValue({});
      return;
    }

    setStatus("status.connecting");
    setStatusValue({});
    try {
      const device = await bluetooth.requestDevice({
        filters: [{ namePrefix: "Pixl" }, { namePrefix: "pixl" }],
        optionalServices: [NRF_DFU_SERVICE_UUID],
      });
      setStatus("status.connected");
      setStatusValue({ name: device.name || "Pixl.js" });
    } catch {
      setStatus("status.cancelled");
      setStatusValue({});
    }
  }

  return (
    <main className="shell">
      <section className="toolbar" aria-label={t("language.label")}>
        <strong>{t("app.title")}</strong>
        <select
          value={locale}
          aria-label={t("language.label")}
          onChange={(event) => setLocale(event.target.value as LocaleCode)}
        >
          <option value="en-US">{locales["en-US"].meta.name}</option>
          <option value="pt-BR">{locales["pt-BR"].meta.name}</option>
        </select>
      </section>

      <section className="intro">
        <p>{t("app.subtitle")}</p>
        <a href="https://github.com/open-pixl/pixl.js/releases">{t("release.link")}</a>
      </section>

      <section className="panel">
        <div>
          <h1>{t("connect.title")}</h1>
          <p>{t("connect.description")}</p>
        </div>
        <button type="button" onClick={connect}>
          <span aria-hidden="true">+</span>
          {t("connect.button")}
        </button>
        <output>{t(status, statusValue)}</output>
      </section>

      <section className="panel">
        <div>
          <h2>{t("ota.title")}</h2>
          <p>{t("ota.description")}</p>
        </div>
        <label className="filePicker">
          <input
            type="file"
            accept=".zip,application/zip"
            onChange={(event) => {
              const file = event.target.files?.[0];
              setSelectedFile(file ? file.name : "");
            }}
          />
          <span>{t("ota.pick")}</span>
        </label>
        <output>
          {selectedFile ? t("ota.selected", { name: selectedFile }) : t("ota.no_file")}
        </output>
      </section>

      <section className="compat">
        <p>{t("compat.supported")}</p>
        <p>{t("compat.fallback")}</p>
      </section>
    </main>
  );
}
