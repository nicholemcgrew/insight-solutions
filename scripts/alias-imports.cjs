/**
 * Rewrites common relative imports to TS path aliases based on your current repo structure.
 * High-level logic: If an import resolves under src/, convert it to @alias/* when it matches known roots.
 */

const path = require("path");

function toPosix(p) {
  return p.replace(/\\/g, "/");
}

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const fileDir = path.dirname(file.path);

  // File path -> src-relative path (posix)
  function resolveToSrcRelative(importValue) {
    // Only rewrite relative paths.
    if (!importValue.startsWith(".")) return null;

    const abs = path.resolve(fileDir, importValue);

    // Find the "/src/" segment and convert to src-relative.
    const normalized = toPosix(abs);
    const idx = normalized.lastIndexOf("/src/");
    if (idx === -1) return null;

    return normalized.slice(idx + "/src/".length);
  }

  function mapToAlias(srcRel) {
    // srcRel is like: components/sections/Hero or data/servicesData.json etc.
    const s = srcRel;

    // Exact alias mapping based on your tsconfig paths.
    if (s.startsWith("components/sections/")) {
      return "@sections/" + s.slice("components/sections/".length);
    }
    if (s.startsWith("components/")) {
      return "@components/" + s.slice("components/".length);
    }
    if (s.startsWith("pages/")) {
      return "@pages/" + s.slice("pages/".length);
    }
    if (s.startsWith("hooks/")) {
      return "@hooks/" + s.slice("hooks/".length);
    }
    if (s.startsWith("utils/")) {
      return "@utils/" + s.slice("utils/".length);
    }
    if (s.startsWith("types/")) {
      return "@types/" + s.slice("types/".length);
    }
    if (s.startsWith("data/")) {
      return "@data/" + s.slice("data/".length);
    }
    if (s.startsWith("theme/")) {
      return "@theme/" + s.slice("theme/".length);
    }

    return null;
  }

  root
    .find(j.ImportDeclaration)
    .forEach((p) => {
      const importValue = p.node.source.value;
      if (typeof importValue !== "string") return;

      const srcRel = resolveToSrcRelative(importValue);
      if (!srcRel) return;

      const aliased = mapToAlias(srcRel);
      if (!aliased) return;

      p.node.source = j.stringLiteral(aliased);
    });

  return root.toSource({ quote: "double", trailingComma: true });
};
