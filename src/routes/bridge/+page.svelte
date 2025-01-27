<script>
	import { onMount } from 'svelte';
	import { Capacitor } from '@capacitor/core';

	let platformResult = 'Detecting platform...';
	let scrapingCapability = 'Checking scraping capability...';
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
</script>

<div class="mx-auto mt-6 max-w-md space-y-4 rounded bg-white p-4 shadow">
	<div class="space-y-2">
		<label class="block font-medium"
			>Facebook Email or phone number
			<input
				type="text"
				bind:value={facebookEmailOrPhone}
				class="mt-1 block w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
			/>
		</label>
		<label class="block font-medium"
			>Facebook Password
			<input
				type="password"
				bind:value={facebookPassword}
				class="mt-1 block w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
			/>
		</label>
	</div>
	<div class="space-y-2">
		<label class="block font-medium"
			>Bluesky Username or email address
			<input
				type="text"
				bind:value={blueskyUsernameOrEmail}
				class="mt-1 block w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
			/>
		</label>
		<label class="block font-medium"
			>Bluesky Password
			<input
				type="password"
				bind:value={blueskyPassword}
				class="mt-1 block w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
			/>
		</label>
	</div>
	<button class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Next</button>
</div>
