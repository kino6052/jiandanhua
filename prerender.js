import { renderToString } from "react-dom/server";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import App from "./src/App"; // adjust path to your main component

// Build the project first: npm run build
const htmlTemplate = readFileSync(resolve("dist/index.html"), "utf8");
const appHtml = renderToString(<App />);
const finalHtml = htmlTemplate.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`,
);

writeFileSync(resolve("dist/index.html"), finalHtml);
console.log("✅ Prerendered static HTML saved to dist/index.html");
