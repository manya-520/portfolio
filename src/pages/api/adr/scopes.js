import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "adr-scope-overrides.json");

function readMap() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    /* missing or invalid */
  }
  return {};
}

function writeMap(map) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, `${JSON.stringify(map, null, 2)}\n`, "utf8");
}

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(readMap());
    return;
  }

  if (req.method === "POST") {
    const { adrId, paths } = req.body ?? {};
    if (typeof adrId !== "string" || adrId.length === 0) {
      res.status(400).json({ error: "adrId required" });
      return;
    }
    if (!Array.isArray(paths) || !paths.every((p) => typeof p === "string")) {
      res.status(400).json({ error: "paths must be an array of strings" });
      return;
    }

    const map = readMap();
    map[adrId] = paths;
    writeMap(map);
    res.status(200).json({ ok: true, adrId, paths });
    return;
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end();
}
