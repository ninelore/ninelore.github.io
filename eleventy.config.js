import path from "node:path";
import * as sass from "sass";

export default function(eleventyConfig) {
	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",
		useLayouts: false,
		compile: async function(inputContent, inputPath) {
			let parsed = path.parse(inputPath);
			if (parsed.name.startsWith("_")) {
				return;
			}
			let result = sass.compileString(inputContent, {
				loadPaths: [
					parsed.dir || ".",
					this.config.dir.includes,
				]
			});
			this.addDependencies(inputPath, result.loadedUrls);
			return async (data) => {
				return result.css;
			};
		},
	});
	eleventyConfig.addTemplateFormats("scss");
	eleventyConfig.addGlobalData("layout", "main.njk");
};


