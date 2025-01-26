<script>
	import Header from './Header.svelte';
	import '../app.css';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<div class="app">
	<Header />

	<main>
		{@render children()}
	</main>

	<footer>
		<script src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'></script>
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

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
