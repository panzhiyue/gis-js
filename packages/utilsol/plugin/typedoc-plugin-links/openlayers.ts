const canvasPages = new Set([
    "Feature"

]);

export function resolveOpenlayersName(name: string) {
    console.log(name);
    if (canvasPages.has(name)) {
        return `https://openlayers.org/en/latest/apidoc/module-ol_${name}-${name}.html`;
    }
}