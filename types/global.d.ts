declare global {
	interface Window {
		BASE_URL: string;
		CapacitorCustomPlatform?: {
			plugins: {
				FacebookScraper: {
					scrapeDom: () => Promise<string>;
				};
			};
		};
	}
}

export {};
