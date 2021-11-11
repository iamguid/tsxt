import realisticTemplate from './realistic.template'

export namespace RealisticExample {
    export interface Context {
        interfaces: any[];
    }
}

function main() {
    const result = realisticTemplate({});
    console.log(result);
}

main();