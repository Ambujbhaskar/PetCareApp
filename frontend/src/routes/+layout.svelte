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
</style>
