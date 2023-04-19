<script>
	// import { afterNavigate } from '$app/navigation';
	// import { base } from '$app/paths'

	// let previousPage = base;
	// afterNavigate(({from}) => {
  // 	previousPage = from?.url.pathname || "/";
	// }) !think about it  
</script>

<main>
	<div>
		<h1>Profile</h1>	
		<a href="/">
			<img src="/profile-active.svg" alt="profile">
		</a>
	</div>
	<slot/>
</main>

<style>
	main{
		height: 100vh;
		width: 100vw;
		position: fixed;
		left: 0;
		top: 0;
		background-color: white;
		padding: 0 1rem 0;
	}
	div {
		display: flex;
		justify-content: space-between;
		padding: 2.5rem 0 1.8rem;
		color: white;
		font-size: var(--font-xl);
	}
	h1 {
		background-color: var(--color-text-secondary);
		width: 85%;
		padding: 0.2rem 1rem;
		border-width: 1px;
		border-radius: 20px;
		border-color: var(--color-text-primary);
	}
	img {
		height: 2rem;
	}
</style>
