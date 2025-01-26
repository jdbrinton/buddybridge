<script>
	import { onMount } from 'svelte';
	import { Capacitor } from '@capacitor/core';
	import { Browser } from '@capacitor/browser';

	let platformResult = 'Detecting platform...';
	let scrapingCapability = 'Checking scraping capability...';

	onMount(async () => {
		// Detect Platform
		const platform = Capacitor.getPlatform();

		if (platform === 'web') {
			platformResult = 'Running on the Web (Browser or PWA).';
			scrapingCapability = 'WebView scraping may have restrictions due to CORS.';
		} else if (platform === 'ios' || platform === 'android') {
			platformResult = `Running on native ${platform} WebView.`;

			// Check WebView access and scraping capability
			try {
				await Browser.open({ url: 'https://example.com' });
				scrapingCapability = 'WebView access confirmed. Scraping should be possible.';
			} catch (error) {
				scrapingCapability = 'WebView access restricted.';
			}
		} else if (platform === 'electron') {
			platformResult = 'Running on Electron.';
			scrapingCapability = 'Unrestricted Chromium access. Scraping is fully supported.';
		} else {
			platformResult = 'Unknown platform.';
			scrapingCapability = 'Scraping capability could not be determined.';
		}
	});
</script>

<svelte:head>
	<title>Platform Check</title>
	<meta name="description" content="Platform and scraping capability check" />
</svelte:head>

<div class="text-column">
	<h1>Platform and Scraping Capability Check</h1>

	<p><strong>Platform:</strong> {platformResult}</p>
	<p><strong>Scraping Capability:</strong> {scrapingCapability}</p>

	<p>
		This page dynamically detects whether you're running on a browser, a native WebView, or an
		Electron environment, and evaluates whether scraping capabilities are available.
	</p>
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
