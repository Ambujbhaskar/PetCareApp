<script>
	let activeButton = "home";
	let state = {
		"home" : "active",
		"vaccine" : "idle",
		"blogs" : "idle",
		"sos" : "idle",
	};
	$: page = state; //state mein se active page nikaal

	function changeState(button) {
		if (button === activeButton)
			return;
		state[button] = "active";
		state[activeButton] = "idle";
		activeButton = button;
	}
</script>

<nav class="navbar">
	<a class={state["home"] + "-navbar-button"} href="/">
			<img 
				src={"home-" + state["home"] + ".svg"} 
				alt="home button" 
				on:click={() => {changeState("home")}}
			>
		Home
	</a>
	<a class={state["vaccine"] + "-navbar-button"} href="/vaccine">
		<img 
			src={"vaccine-" + state["vaccine"] + ".svg"} 
			alt="vaccine button" 
			on:click={() => {changeState("vaccine")}}
		>
		Vaccine
	</a>	
	<a class={state["blogs"] + "-navbar-button"} href="/blogs">
		<img 
			src={"blogs-" + state["blogs"] + ".svg"} 
			alt="blogs button" 
			on:click={() => {changeState("blogs")}}
		>
		Blogs
	</a>	
	<a class={state["sos"] + "-navbar-button"} href="/sos">
		<img 
			src={"sos-" + state["sos"] + ".svg"} 
			alt="sos button" 
			on:click={() => {changeState("sos")}}
		>
		SOS
	</a>
</nav>

<style>

	.navbar {
		display: flex;
		justify-content: space-between;
		padding: 1rem 2rem 1rem 2rem;
	}
	.navbar a {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
		gap: 2px;
	}

	.navbar a img {
		height: 2rem;
	}

	.navbar .active-navbar-button{
		font-weight: bold;
	}
</style>
