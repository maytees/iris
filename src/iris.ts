import { Command } from "./deps.ts";
import { ERR, fileExists, LOG } from "./util.ts";

if (import.meta.main) {
  const run = new Command()
    .description("Execute an Iris file.")
    .arguments("<file:string>")
    .action(async (_options, file: string) => {
      // Get the file to run
      if (await fileExists(file)) {
        LOG("Found source file: " + file);
      } else {
        ERR("Could not find file: " + file);
      }
    });

  await new Command()
    .name("iris")
    .description(`
      Iris is a small scripting language meant to be used for completing simple tasks which do not
      require large languages to finish.
    `)
    .version("v0.0.1")
    .command("run", run)
    .parse(Deno.args);
}
