<script>
	import { goto } from '$app/navigation';
	import Header from './Header.svelte';
	import '../app.css';

	let { children } = $props();

	/**
	 * Navigate to a specified path.
	 * @param {string} path - The path to navigate to.
	 */
	function navigate(path) {
		goto(path);
	}

	/**
	 * Handle key events for navigation.
	 * @param {KeyboardEvent} event - The keyboard event.
	 * @param {string} path - The path to navigate to.
	 */
	function handleKey(event, path) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			navigate(path);
		}
	}
</script>

<div class="app">
	<Header />

	<main>
		{@render children()}
	</main>

	<footer>
		<script src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"></script>
		<script>
			kofiWidgetOverlay.draw('jdbrinton', {
				'type': 'floating-chat',
				'floating-chat.donateButton.text': 'Donate',
				'floating-chat.donateButton.background-color': '#00b9fe',
				'floating-chat.donateButton.text-color': '#fff'
			});
		</script>
		<p>
			I developed this app on donations. Please consider donating to support my work. Thank you!
		</p>
		<a
			href="."
			onclick={(e) => {
				e.preventDefault();
				navigate('debug');
			}}
			onkeydown={(e) => handleKey(e, 'debug')}
			>Debug</a
		>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
