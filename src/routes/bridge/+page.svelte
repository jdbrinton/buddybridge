<script lang="ts">
	/// <reference path="../../../../types/global.d.ts" />

	import { onMount } from 'svelte';
	import { Capacitor } from '@capacitor/core';

	interface FriendInfo {
		name: string;
		photo: string;
	}

	let platformResult = 'Detecting platform...';
	let scrapingCapability = 'Checking scraping capability...';
	let facebookEmailOrPhone = '';
	let facebookPassword = '';
	let facebookLoggedIn = false;
	let facebookLoginError = '';
	let facebookLoginInProgress = false;
	let facebookLoginCooldown = 0;
	let offscreenWindowId: string | null = null;
	let debugLogs = '';
	let totalFriends = 0;
	let friends: FriendInfo[] = [];
	let scrapingInProgress = false;
	let twoStepDetected = false;
	let twoStepSnippet = '';
	let blueskyUsernameOrEmail = '';
	let blueskyPassword = '';
	let blueskyLoggedIn = false;
	let blueskyLoginCooldown = 0;
	let loginIntervalId: ReturnType<typeof setInterval> | null = null;

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
		const savedEmail = localStorage.getItem('facebookEmailOrPhone');
		const savedPass = localStorage.getItem('facebookPassword');
		if (savedEmail) facebookEmailOrPhone = savedEmail;
		if (savedPass) facebookPassword = savedPass;
	});

	function startCooldown(type: string) {
		if (type === 'facebook') {
			facebookLoginCooldown = 5;
			loginIntervalId = setInterval(() => {
				facebookLoginCooldown--;
				if (facebookLoginCooldown <= 0 && loginIntervalId) {
					clearInterval(loginIntervalId);
				}
			}, 1000);
		} else {
			blueskyLoginCooldown = 5;
			loginIntervalId = setInterval(() => {
				blueskyLoginCooldown--;
				if (blueskyLoginCooldown <= 0 && loginIntervalId) {
					clearInterval(loginIntervalId);
				}
			}, 1000);
		}
	}

	async function doFacebookLogin() {
		twoStepDetected = false;
		twoStepSnippet = '';
		if (!window.CapacitorCustomPlatform?.plugins?.ElectronBrowser) {
			facebookLoginError = 'ElectronBrowser plugin not available.';
			return;
		}
		if (facebookLoginCooldown > 0) {
			facebookLoginError = `Please wait ${facebookLoginCooldown}s before trying again.`;
			return;
		}
		facebookLoginError = '';
		facebookLoginInProgress = true;
		debugLogs += '\n--- Starting Facebook Login ---\n';
		try {
			if (offscreenWindowId) {
				debugLogs += `Closing old window: ${offscreenWindowId}\n`;
				await window.CapacitorCustomPlatform.plugins.ElectronBrowser.closeWindow(offscreenWindowId);
				offscreenWindowId = null;
			}
			offscreenWindowId = await window.CapacitorCustomPlatform.plugins.ElectronBrowser.createWindow(
				{
					partition: 'persist:facebook',
					show: true,
					offscreen: false
				}
			);
			debugLogs += `Created new offscreen window: ${offscreenWindowId}\n`;
			debugLogs += 'Loading /friends/list to check if we are already logged in...\n';
			await loadURLSafe(offscreenWindowId, 'https://www.facebook.com/friends/list');
			await waitForPageLoad(offscreenWindowId, 15000);
			await sleep(2000);
			const title1 = await execSafe(offscreenWindowId, `document.title`);
			debugLogs += `Title after /friends/list load: "${title1}"\n`;
			const pnf1 = await execSafe(
				offscreenWindowId,
				`document.body && document.body.innerText.includes("Page Not Found")`
			);
			if (title1 && !title1.toLowerCase().includes('page not found') && pnf1 === false) {
				debugLogs += 'It appears we are already logged in.\n';
				facebookLoggedIn = true;
			} else {
				debugLogs += 'We are not logged in or "Page Not Found". Doing normal login...\n';
				debugLogs += 'Loading main Facebook page...\n';
				await loadURLSafe(offscreenWindowId, 'https://www.facebook.com/');
				await waitForPageLoad(offscreenWindowId, 15000);
				await sleep(2000);
				debugLogs += 'Filling login form...\n';
				const fillScript = `
			try {
			  const emailInput = document.getElementById('email') || document.querySelector('input[name="email"]');
			  const passInput = document.getElementById('pass') || document.querySelector('input[name="pass"]');
			  const loginButton = document.querySelector('button[name="login"]') || document.querySelector('input[name="login"]');
			  if(!emailInput || !passInput || !loginButton) {
				throw new Error('Login elements not found in DOM');
			  }
			  emailInput.value = "${escapeString(facebookEmailOrPhone)}";
			  passInput.value = "${escapeString(facebookPassword)}";
			  loginButton.click();
			  "OK"
			} catch(e) {
			  "ERROR: " + e.message
			}
		  `;
				const fillResult = await execSafe(offscreenWindowId, fillScript);
				debugLogs += `Fill result: ${fillResult}\n`;
				debugLogs += 'Waiting 5 seconds after login attempt...\n';
				await sleep(5000);

				const currentURL = await execSafe(offscreenWindowId, `window.location.href`);
				debugLogs += `URL after submit: ${currentURL}\n`;
				if (currentURL.includes('/two_step_verification/authentication/')) {
					twoStepDetected = true;
					twoStepSnippet = await execSafe(
						offscreenWindowId,
						`document.documentElement.innerHTML.slice(0,3000)`
					);
					debugLogs += 'Two-step/captcha page detected.\n';
					facebookLoggedIn = false;
					facebookLoginError = 'Two-step verification page shown. Solve it in the window.';
					return;
				}

				const loginTitle = await execSafe(offscreenWindowId, `document.title`);
				debugLogs += `Title after login attempt: "${loginTitle}"\n`;
				if (!loginTitle.toLowerCase().includes('facebook')) {
					facebookLoggedIn = false;
					facebookLoginError = `Login failed (title doesn't contain 'Facebook')`;
					debugLogs += 'Login failed based on title.\n';
				} else {
					debugLogs += 'Checking /friends/list for final confirmation...\n';
					await loadURLSafe(offscreenWindowId, 'https://www.facebook.com/friends/list');
					await waitForPageLoad(offscreenWindowId, 15000);
					await sleep(2000);
					const finalTitle = await execSafe(offscreenWindowId, `document.title`);
					const pnf2 = await execSafe(
						offscreenWindowId,
						`document.body && document.body.innerText.includes("Page Not Found")`
					);
					debugLogs += `Final /friends/list title: "${finalTitle}", pageNotFound: ${pnf2}\n`;
					if (!finalTitle || finalTitle.toLowerCase().includes('page not found') || pnf2 === true) {
						debugLogs += 'Friends page not found => fail.\n';
						facebookLoggedIn = false;
						facebookLoginError = 'Login failed. Page Not Found on friends page.';
					} else {
						debugLogs += 'Successfully logged in!\n';
						facebookLoggedIn = true;
					}
				}
			}
			if (facebookLoggedIn) {
				localStorage.setItem('facebookEmailOrPhone', facebookEmailOrPhone);
				localStorage.setItem('facebookPassword', facebookPassword);
				debugLogs += 'Saved credentials to localStorage.\n';
			}
		} catch (err) {
			const msg = (err as any)?.message ?? err;
			debugLogs += `Error during login: ${msg}\n`;
			facebookLoginError = msg || 'Error logging in.';
			facebookLoggedIn = false;
		} finally {
			facebookLoginInProgress = false;
			debugLogs += '--- End Facebook Login ---\n';
			startCooldown('facebook');
		}
	}

	async function scrapeFacebookFriends() {
		twoStepDetected = false;
		twoStepSnippet = '';
		if (!facebookLoggedIn) {
			debugLogs += 'Cannot scrape: not logged in.\n';
			return;
		}
		if (!offscreenWindowId) {
			debugLogs += 'No window open; creating a new one for scraping.\n';
			offscreenWindowId = await window.CapacitorCustomPlatform.plugins.ElectronBrowser.createWindow(
				{
					partition: 'persist:facebook',
					show: true,
					offscreen: false
				}
			);
		}
		friends = [];
		totalFriends = 0;
		scrapingInProgress = true;
		debugLogs += '\n--- Starting friend scrape ---\n';
		try {
			await loadURLSafe(offscreenWindowId, 'https://www.facebook.com/friends/list');
			await waitForPageLoad(offscreenWindowId, 15000);
			await sleep(2000);
			let lastCount = 0;
			let repeats = 0;
			for (let i = 0; i < 50; i++) {
				const snippet = await execSafe(
					offscreenWindowId,
					`
			(() => {
			  const container = document.querySelector('[aria-label="All friends"]');
			  return container ? container.outerHTML.slice(0,1500) : "No container found";
			})()
		  `
				);
				debugLogs += `Pass #\${i+1}, partial container:\n\${snippet}\n--- end snippet ---\n`;

				const scrapeScript = `
			(() => {
			  const container = document.querySelector('[aria-label="All friends"]');
			  if(!container){
				return { error: "No container found" };
			  }
			  const links = container.querySelectorAll('a[href*="facebook.com/"]');
			  const results = [];
			  links.forEach(link => {
				try {
				  let name = link.innerText.trim();
				  let photo = "";
				  const img = link.querySelector('img');
				  if(img){
					photo = img.getAttribute("src") || "";
				  }
				  if(name && name !== "..."){
					results.push({ name, photo });
				  }
				} catch(e){}
			  });
			  return results;
			})()
		  `;
				const result = await execSafe(offscreenWindowId, scrapeScript);
				if (result && Array.isArray(result)) {
					let newlyAdded = 0;
					for (const item of result) {
						const alreadyKnown = friends.some(
							(f) => f.name === item.name && f.photo === item.photo
						);
						if (!alreadyKnown) {
							friends.push(item);
							newlyAdded++;
						}
					}
					totalFriends = friends.length;
					debugLogs += `Pass #\${i+1}: \${newlyAdded} new friend(s), total so far=\${totalFriends}\n`;
				} else if (result && result.error) {
					debugLogs += 'Scrape error: ' + result.error + '\\n';
				} else {
					debugLogs += 'No new results in this pass.\\n';
				}

				if (totalFriends === lastCount) {
					repeats++;
					if (repeats >= 2) {
						debugLogs += 'No new friends after two consecutive passes => stopping.\n';
						break;
					}
				} else {
					repeats = 0;
				}
				lastCount = totalFriends;
				const scrollRes = await execSafe(
					offscreenWindowId,
					`
			(() => {
			  const container = document.querySelector('[aria-label="All friends"]');
			  if(!container) return "No container to scroll";
			  container.scrollTop = container.scrollHeight;
			  return "OK";
			})()
		  `
				);
				debugLogs += 'Scrolling container => ' + scrollRes + '\n';
				await sleep(1000);
			}
			debugLogs += `Scrape complete. Found \${totalFriends} total friends.\n`;
		} catch (err) {
			const msg = (err as any)?.message ?? err;
			debugLogs += `Scrape error: \${msg}\n`;
		} finally {
			scrapingInProgress = false;
			debugLogs += '--- End friend scrape ---\n';
		}
	}

	async function handleFacebookLogout() {
		twoStepDetected = false;
		twoStepSnippet = '';
		if (!window.CapacitorCustomPlatform?.plugins?.ElectronBrowser) {
			debugLogs += 'ElectronBrowser plugin not available.\n';
			return;
		}
		debugLogs += 'Logging out: clearing persist:facebook session data.\n';
		await window.CapacitorCustomPlatform.plugins.ElectronBrowser.clearSessionData(
			'persist:facebook'
		);
		facebookLoggedIn = false;
		facebookLoginError = '';
		friends = [];
		totalFriends = 0;
		if (offscreenWindowId) {
			debugLogs += `Closing window: ${offscreenWindowId}\n`;
			await window.CapacitorCustomPlatform.plugins.ElectronBrowser.closeWindow(offscreenWindowId);
			offscreenWindowId = null;
		}
		debugLogs += 'Logged out.\n';
	}

	function sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function waitForPageLoad(winId: string, timeoutMs = 15000) {
		const start = Date.now();
		while (Date.now() - start < timeoutMs) {
			const state = await execSafe(winId, 'document.readyState');
			if (state === 'complete') {
				return;
			}
			await sleep(500);
		}
		throw new Error('Timeout waiting for page load');
	}

	async function loadURLSafe(winId: string, url: string) {
		debugLogs += `Navigating to: ${url}\n`;
		try {
			await window.CapacitorCustomPlatform.plugins.ElectronBrowser.loadURL(winId, url);
		} catch (e) {
			const msg = (e as any)?.message ?? e;
			debugLogs += `Error loading URL: ${msg}\n`;
			throw e;
		}
	}

	async function execSafe(winId: string, code: string): Promise<any> {
		try {
			return await window.CapacitorCustomPlatform.plugins.ElectronBrowser.executeJavaScript(
				winId,
				code
			);
		} catch (e) {
			const msg = (e as any)?.message ?? e;
			debugLogs += `execSafe error: ${msg}\n`;
			throw e;
		}
	}

	function escapeString(str: string): string {
		return str.replace(/"/g, '\\"');
	}

	function handleBlueskyLogin() {
		if (blueskyLoginCooldown > 0) return;
		blueskyLoggedIn = true;
		startCooldown('bluesky');
	}

	function handleBlueskyLogout() {
		blueskyLoggedIn = false;
	}

	function handleTwoStepSolved() {
		twoStepDetected = false;
		twoStepSnippet = '';
		debugLogs += 'User indicates they solved 2FA/captcha in the external window.\n';
	}
</script>

<div class="section-box">
	<h2 class="mb-2 text-lg font-bold">Facebook Login</h2>
	{#if twoStepDetected}
		<p class="mb-2 font-bold text-red-600">Two-Step Verification / Captcha Page Detected</p>
		<div class="overflow-auto border border-gray-300 bg-gray-50 p-2" style="max-height: 180px;">
			<p class="text-sm font-bold">Partial DOM snippet:</p>
			<div>{@html twoStepSnippet}</div>
		</div>
		<p class="mt-2 text-sm">
			Please solve the captcha/two-step prompt in the visible login window. When finished, click
			below:
		</p>
		<button
			class="mt-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
			on:click={handleTwoStepSolved}
		>
			I've Solved the Two-Step / Captcha
		</button>
	{:else if facebookLoggedIn}
		<p class="text-green-600">You are logged in to Facebook!</p>
		<button
			class="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
			on:click={handleFacebookLogout}
		>
			Log out
		</button>
		<div class="mt-4">
			<button
				class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
				on:click={scrapeFacebookFriends}
				disabled={scrapingInProgress}
			>
				{scrapingInProgress ? 'Scraping...' : 'Scrape Friends'}
			</button>
		</div>
	{:else}
		<label class="mt-2 block font-medium">
			Email or phone
			<input
				type="text"
				bind:value={facebookEmailOrPhone}
				class="mt-1 block w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
			/>
		</label>
		<label class="mt-2 block font-medium">
			Password
			<input
				type="password"
				bind:value={facebookPassword}
				class="mt-1 block w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
			/>
		</label>
		{#if facebookLoginError}
			<p class="mt-2 text-red-600">{facebookLoginError}</p>
		{/if}
		{#if facebookLoginInProgress}
			<p class="mt-2 text-gray-600">Logging in, please wait...</p>
		{/if}
		<button
			class="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
			on:click={doFacebookLogin}
			disabled={facebookLoginCooldown > 0 || facebookLoginInProgress}
		>
			{#if facebookLoginCooldown > 0}
				Login (Wait {facebookLoginCooldown}s)
			{:else}
				Login
			{/if}
		</button>
	{/if}
</div>

<div class="section-box">
	<h2 class="mb-2 text-lg font-bold">Facebook Friends</h2>
	<p class="text-sm">Found {totalFriends} friends so far.</p>
	<table class="mt-2 table-auto">
		<thead>
			<tr class="bg-gray-100">
				<th>#</th>
				<th>Name</th>
				<th>Photo</th>
			</tr>
		</thead>
		<tbody>
			{#each friends as friend, i}
				<tr>
					<td>{i + 1}</td>
					<td>{friend.name}</td>
					<td>
						{#if friend.photo}
							<img src={friend.photo} alt="Friend Photo" width="40" />
						{:else}
							No photo
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div class="section-box">
	<h2 class="mb-2 text-lg font-bold">Bluesky Login</h2>
	{#if blueskyLoggedIn}
		<p class="text-green-600">You are logged in to Bluesky!</p>
		<button
			class="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
			on:click={handleBlueskyLogout}
		>
			Log out
		</button>
	{:else}
		<label class="mt-2 block font-medium">
			Username or email
			<input
				type="text"
				bind:value={blueskyUsernameOrEmail}
				class="mt-1 block w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
			/>
		</label>
		<label class="mt-2 block font-medium">
			Password
			<input
				type="password"
				bind:value={blueskyPassword}
				class="mt-1 block w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
			/>
		</label>
		<button
			class="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
			on:click={handleBlueskyLogin}
			disabled={blueskyLoginCooldown > 0}
		>
			{#if blueskyLoginCooldown > 0}
				Login (Wait {blueskyLoginCooldown}s)
			{:else}
				Login
			{/if}
		</button>
	{/if}
</div>

<div class="section-box">
	<h2 class="mb-2 text-lg font-bold">Debug Logs</h2>
	<pre>{debugLogs}</pre>
</div>

<style>
	.section-box {
		background-color: #fff;
		padding: 1rem;
		border-radius: 0.25rem;
		margin-bottom: 1.5rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}
	.table-auto {
		border-collapse: collapse;
		width: 100%;
	}
	.table-auto th,
	.table-auto td {
		border: 1px solid #ddd;
		padding: 0.5rem;
	}
	pre {
		background-color: #f5f5f5;
		padding: 0.5rem;
		max-height: 250px;
		overflow-y: auto;
	}
	img {
		border-radius: 3px;
	}
</style>
