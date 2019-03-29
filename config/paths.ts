import path from "path";

export const cwd = process.cwd();
export const publicFolder = path.join(cwd, "public");
export const htmlTemplate = path.join(publicFolder, "index.html");
export const src = path.join(cwd, "src");
export const dist = path.join(cwd, "dist");
export const main = path.join(src, "main");
export const renderer = path.join(src, "renderer");
export const mainEntry = path.join(main, "index.ts");
export const rendererEntry = path.join(renderer, "index.tsx");
