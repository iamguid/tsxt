import * as fs from "node:fs";
import * as path from "node:path";
import * as ts from "typescript";
import * as babel from "@babel/core";

function* walkByFiles(rootDir: string): Generator<string> {
  const dirents = fs.readdirSync(rootDir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(rootDir, dirent.name);
    if (dirent.isDirectory()) {
      yield* walkByFiles(res);
    } else {
      yield res;
    }
  }
}

export const requiredCompilerOptions: ts.CompilerOptions = {
  jsx: ts.JsxEmit.Preserve,
};

export function compile(
  projectFile: string | null,
  templatesDir: string,
  outDir: string
): void {
  let resultOptions: ts.CompilerOptions;

  if (projectFile === null) {
    projectFile =
      ts.findConfigFile(templatesDir, (fileName) => fs.existsSync(fileName)) ??
      null;
  }

  if (projectFile) {
    const projectConfig = ts.parseJsonConfigFileContent(
      JSON.parse(fs.readFileSync(projectFile, "utf-8")),
      {
        useCaseSensitiveFileNames: false,
        readDirectory: ts.sys.readDirectory,
        fileExists: ts.sys.fileExists,
        readFile: ts.sys.readFile
      },
      path.dirname(projectFile)
    );

    resultOptions = {
      ...projectConfig.options,
      ...requiredCompilerOptions,
      outDir,
    };
  } else {
    resultOptions = {
      ...requiredCompilerOptions,
      rootDir: templatesDir,
      outDir,
    };
  }

  const createdFiles: Record<string, string> = {};
  const host = ts.createCompilerHost(resultOptions);
  host.writeFile = (fileName: string, contents: string) =>
    (createdFiles[fileName] = contents);

  const files = Array.from(walkByFiles(templatesDir)).filter((file) =>
    file.endsWith(".template.tsx")
  );

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  const program = ts.createProgram(files, resultOptions, host);
  const emitResult = program.emit();

  Object.entries(createdFiles)
    .filter(([file]) => file.endsWith(".d.ts"))
    .forEach(([file, content]) => {
      fs.writeFileSync(file, content, "utf8");
    });

  Object.entries(createdFiles)
    .filter(([file]) => file.endsWith(".jsx"))
    .forEach(([file, content]) => {
      const babelResult = babel.transformSync(content, {
        presets: ["@babel/preset-env", "@babel/preset-react"],
        plugins: [
          [
            path.join(__dirname, "../plugin/index.js"),
            {
              indentType: "space",
              indentSize: 4,
            },
          ],
        ],
      });

      if (babelResult?.code ?? false) {
        fs.writeFileSync(
          file.replace(/\.jsx$/g, ".js"),
          babelResult?.code ?? "",
          "utf8"
        );
      }
    });

  const allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  allDiagnostics.forEach((diagnostic) => {
    if (diagnostic.file) {
      const { line, character } = ts.getLineAndCharacterOfPosition(
        diagnostic.file,
        diagnostic.start ?? 0
      );
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n"
      );
      console.log(
        `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
      );
    } else {
      console.log(
        ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")
      );
    }
  });

  const exitCode = emitResult.emitSkipped ? 1 : 0;

  if (exitCode !== 0) {
    console.log(`Process exiting with code '${exitCode}'.`);
  }

  process.exit(exitCode);
}
