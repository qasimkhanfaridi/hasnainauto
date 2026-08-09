import path from "path";
import fs from "fs";

export interface MediaItem {
  id: string;
  url: string;
  publicId?: string;
  name: string;
  bytes?: number;
  width?: number;
  height?: number;
  format?: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const MEDIA_PATH = path.join(DATA_DIR, "media.json");

function ensure() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(MEDIA_PATH)) fs.writeFileSync(MEDIA_PATH, "[]", "utf-8");
}

export function readMedia(): MediaItem[] {
  ensure();
  return JSON.parse(fs.readFileSync(MEDIA_PATH, "utf-8")) as MediaItem[];
}

export function saveMediaItem(item: MediaItem) {
  const list = readMedia();
  list.unshift(item);
  fs.writeFileSync(MEDIA_PATH, JSON.stringify(list.slice(0, 200), null, 2), "utf-8");
  return item;
}
