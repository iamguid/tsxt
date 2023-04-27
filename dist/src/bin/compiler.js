"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = exports.requiredCompilerOptions = void 0;
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const ts = __importStar(require("typescript"));
const babel = __importStar(require("@babel/core"));
function* walkByFiles(rootDir) {
    const dirents = fs.readdirSync(rootDir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = path.resolve(rootDir, dirent.name);
        if (dirent.isDirectory()) {
            yield* walkByFiles(res);
        }
        else {
            yield res;
        }
    }
}
exports.requiredCompilerOptions = {
    jsx: ts.JsxEmit.Preserve,
};
function compile(projectFile, templatesDir, outDir) {
    let resultOptions;
    if (projectFile === null) {
        projectFile =
            ts.findConfigFile(templatesDir, (fileName) => fs.existsSync(fileName)) ??
                null;
    }
    if (projectFile) {
        const projectConfig = ts.parseJsonConfigFileContent(JSON.parse(fs.readFileSync(projectFile, "utf-8")), {
            useCaseSensitiveFileNames: false,
            readDirectory: ts.sys.readDirectory,
            fileExists: ts.sys.fileExists,
            readFile: ts.sys.readFile
        }, path.dirname(projectFile));
        resultOptions = {
            ...projectConfig.options,
            ...exports.requiredCompilerOptions,
            outDir,
        };
    }
    else {
        resultOptions = {
            ...exports.requiredCompilerOptions,
            rootDir: templatesDir,
            outDir,
        };
    }
    const createdFiles = {};
    const host = ts.createCompilerHost(resultOptions);
    host.writeFile = (fileName, contents) => (createdFiles[fileName] = contents);
    const files = Array.from(walkByFiles(templatesDir)).filter((file) => file.endsWith(".template.tsx"));
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
            fs.writeFileSync(file.replace(/\.jsx$/g, ".js"), babelResult?.code ?? "", "utf8");
        }
    });
    const allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);
    allDiagnostics.forEach((diagnostic) => {
        if (diagnostic.file) {
            const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start ?? 0);
            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        }
        else {
            console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        }
    });
    const exitCode = emitResult.emitSkipped ? 1 : 0;
    if (exitCode !== 0) {
        console.log(`Process exiting with code '${exitCode}'.`);
    }
    process.exit(exitCode);
}
exports.compile = compile;
//# sourceMappingURL=compiler.js.map