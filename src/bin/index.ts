import { compile } from "./compiler";
if (process.argv.length === 5) {
  compile(process.argv[2], process.argv[3], process.argv[4]);
} else if (process.argv.length === 4) {
  compile(null, process.argv[2], process.argv[3]);
} else {
  throw new Error("Unsupported parameters");
}
