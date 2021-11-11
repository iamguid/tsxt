import imports from "./imports.template";

export namespace ImportsExample {
    export interface Import {
        name: string;
        path: string;
    }

    export interface Context {
        imports: Import[]
    }
}

function main() {
    const ctx: ImportsExample.Context = {
        imports: [
            { name: "a", path: "./a" },
            { name: "b", path: "./b" },
            { name: "c", path: "./c" },
        ]
    }

    const result = imports(ctx);
    console.log(result);
}

main();