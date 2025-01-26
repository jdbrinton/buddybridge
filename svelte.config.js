import adapter from '@sveltejs/adapter-static';

export default {
	kit: {
	  // Specify the static adapter
	  adapter: adapter({
		pages: 'docs',
		assets: 'docs',
		fallback: null,
	  }),
  
	  // Optional: Add paths or fallback options if needed
	  paths: {
		// Change base path if deploying to a subdirectory
		base: '',
	  },
	  prerender: {
		entries: ['*'], // Prerender all routes by default
	  },
	},
  };

