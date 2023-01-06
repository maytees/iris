export async function fileExists(file: string): Promise<boolean>  {
    try {
        await Deno.remove(file);
    } catch(error) {
        if(!(error instanceof Deno.errors.NotFound)) {
            return false;
        }
    }

    return true;
}