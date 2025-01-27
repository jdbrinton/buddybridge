<script>
	import { onMount } from 'svelte';
	import { Capacitor } from '@capacitor/core';

	let platformResult = 'Detecting platform...';
	let scrapingCapability = 'Checking scraping capability...';
	let facebookDomResult = '';
	let facebookEmailOrPhone = '';
	let facebookPassword = '';
	let blueskyUsernameOrEmail = '';
	let blueskyPassword = '';

	onMount(async () => {
		const platform = Capacitor.getPlatform();
		if (platform === 'web') {
			platformResult = 'Running on the Web (Browser or PWA).';
			scrapingCapability = 'WebView scraping may have restrictions due to CORS.';
		} else if (platform === 'ios' || platform === 'android') {
			platformResult = `Running on native ${platform} WebView.`;
			scrapingCapability = 'WebView scraping should be possible.';
		} else if (platform === 'electron') {
			platformResult = 'Running on Electron.';
			scrapingCapability = 'Unrestricted Chromium access. Scraping is fully supported.';
		} else {
			platformResult = 'Unknown platform.';
			scrapingCapability = 'Scraping capability could not be determined.';
		}
	});

	async function scrapeFacebook() {
		if (Capacitor.getPlatform() === 'electron') {
			try {
				if (window.CapacitorCustomPlatform) {
					facebookDomResult =
						await window.CapacitorCustomPlatform.plugins.FacebookScraper.scrapeDom();
				} else {
					facebookDomResult = 'Error: CapacitorCustomPlatform is not defined.';
				}
			} catch (err) {
				facebookDomResult = 'Error: ' + (err instanceof Error ? err.message : String(err));
			}
		} else {
			facebookDomResult = 'Scraping not supported on this platform.';
		}
	}
</script>

<div class="text-column">
	<h1>Platform and Scraping Capability Check</h1>
	<p><strong>Platform:</strong> {platformResult}</p>
	<p><strong>Scraping Capability:</strong> {scrapingCapability}</p>
	<p>
		This page dynamically detects whether you're running on a browser, a native WebView, or an
		Electron environment, and evaluates whether scraping capabilities are available.
	</p>
	<p>Test 2</p>
	<button on:click={scrapeFacebook}>Scrape Facebook</button>
	<p><strong>Scraped DOM Title:</strong> {facebookDomResult}</p>
</div>

<style>
	.text-column {
		padding: 1em;
		max-width: 600px;
		margin: 0 auto;
		font-family: Arial, sans-serif;
	}
	h1 {
		color: #333;
	}
	p {
		line-height: 1.6;
		color: #555;
	}
</style>
