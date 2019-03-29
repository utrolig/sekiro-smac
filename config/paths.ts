import path from "path";

export const cwd = process.cwd();
export const src = path.join(cwd, "src");
export const main = path.join(src, "main");
export const renderer = path.join(src, "renderer");
export const mainEntry = path.join(main, "index.ts");
export const rendererEntry = path.join(renderer, "index.tsx");
