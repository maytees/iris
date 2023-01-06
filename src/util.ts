import { colors } from "./deps.ts";

const error = colors.bold.red;
const warn = colors.bold.yellow;
const log = colors.bold.blue;

function format(message: string): string {
  return "[" + new Date().toDateString() + "]" + " " + message;
}

export function LOG(message: string): void {
  console.log(log(format(message)));
}

export function WARN(message: string): void {
  console.log(warn(format(message)));
}

export function ERR(message: string): void {
  console.log(error(format(message)));
}

export async function fileExists(file: string): Promise<boolean> {
  try {
    await Deno.stat(file);
    return true;
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
      return false;
    } else {
      return false;
    }
  }
}

export function getFileContent(filepath: string): string {
  return Deno.readTextFileSync(filepath);
}
