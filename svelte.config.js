import adapter from '@sveltejs/adapter-static';

// Check for a custom output directory via an environment variable
const outputDir = process.env.SVELTE_OUTPUT_DIR || 'docs';

export default {
	kit: {
		adapter: adapter({
			pages: outputDir,
			assets: outputDir,
			fallback: null
		}),
		paths: {
			// Enable purely relative paths:
			relative: true
		},
		prerender: {
			entries: ['*']
		}
	}
};
