import * as ts from "typescript";
export declare const requiredCompilerOptions: ts.CompilerOptions;
export declare function compile(projectFile: string | null, templatesDir: string, outDir: string): void;
