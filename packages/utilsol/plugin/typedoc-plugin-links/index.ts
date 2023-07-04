import {
    Application,
    Converter,
    ExternalResolveResult,
    ParameterType,
} from "typedoc";
import { resolveOpenlayersName } from "./openlayers";
import { resolveTsType } from "./typescript";


const version = Application.VERSION.split(/[\.-]/);
const supportsObjectReturn = +version[1] > 23 || +version[2] >= 26;

declare module "typedoc" {
    export interface TypeDocOptionMap {
        resolveUtilityTypes: boolean;
    }
}

export function load(app: Application) {
    console.log(33333333);
    const failed = new Set<string>();

    app.options.addDeclaration({
        name: "resolveUtilityTypes",
        defaultValue: true,
        help: "[typedoc-plugin-links]: Resolve references to Partial, Omit, etc to the TypeScript website.",
        type: ParameterType.Boolean,
    });

    const resolvers = [
        resolveOpenlayersName
    ];
    function resolveName(name: string) {
        for (const res of resolvers) {
            const result = res(name);
            if (result) return result;
        }
    }

    app.converter.on(Converter.EVENT_BEGIN, () => {
        if (app.options.getValue("resolveUtilityTypes")) {
            resolvers.push(resolveTsType);
        }
    });

    app.converter.addUnknownSymbolResolver((declaration) => {
        if (
            declaration.moduleSource === "typescript" ||
            (!declaration.moduleSource &&
                declaration.resolutionStart === "global")
        ) {
            const name = declaration.symbolReference?.path
                ?.map((path) => path.path)
                .join(".");
            if (!name) return;
            const result = resolveName(name);

            if (!result && !failed.has(name)) {
                failed.add(name);
                app.logger.verbose(
                    `[typedoc-plugin-links]: Failed to resolve type: ${name}`
                );
            }

            if (supportsObjectReturn && result) {
                return {
                    target: result,
                    caption: name,
                };
            }

            return result;
        }
    });
}