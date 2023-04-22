<script>
	import Header from './Header.svelte';
	import Navbar from './Navbar.svelte';
	import '../app.css'
	import './styles.css'
</script>

<div class="app">
	<Header />
	<main>
		<slot />
	</main>
	<Navbar/>
</div>
<!-- svelte-ignore a11y-missing-attribute -->
<div class="ImgContainer">
	<img src="/indicator-image.svg" class="IndicatorImage"/>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		height: 100svh;
		min-height: 100vh;
	}

	main {
		flex: 1;
		padding: 1rem;
		padding-top: 0;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
		height: 30rem;
		max-height: 48rem;
		overflow-y: scroll;
	}
	.ImgContainer {
		display: none;
	}
	@media only screen and (min-width: 600px) {
		.app {
			display: none;
		}
		.ImgContainer {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100vh;
			background-color: var(--color-background);
		}
		.IndicatorImage {
			width: 600px;
		}
	}
</style>
