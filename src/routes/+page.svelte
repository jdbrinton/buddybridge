<script>
	import { goto } from '$app/navigation';
	import buddybridgeLogo from '$lib/images/buddybridge_logo.png';
</script>

<svelte:head>
	<title>BuddyBridge</title>
	<meta name="Find your friends on other social media platforms!" content="buddybridge" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<!-- We only have a PNG, but keeping the <picture> structure is fine -->
				<source srcset={buddybridgeLogo} type="image/webp" />
				<img src={buddybridgeLogo} alt="Welcome" />
			</picture>
		</span>
		Find your friends on other social media platforms!
	</h1>
	<button
		class="transform rounded-lg bg-blue-500 px-4 py-2 font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
		on:click={() => goto('bridge')}
	>
		Begin!
	</button>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
