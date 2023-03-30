<script>
	let activeButton = "home";
	let state = {
		"home" : "active",
		"vaccine" : "idle",
		"blogs" : "idle",
		"sos" : "idle",
	};

	function changeState(button) {
		if (button === activeButton)
			return;
		state[button] = "active";
		state[activeButton] = "idle";
		activeButton = button;
	}
</script>

<nav class="navbar">
	<div class={state["home"] + "-navbar-button"}>
		<img 
			src={"home-" + state["home"] + ".svg"} 
			alt="home button" 
			on:click={() => {changeState("home")}}
		>
		Home
	</div>
	<div class={state["vaccine"] + "-navbar-button"}>
		<img 
			src={"vaccine-" + state["vaccine"] + ".svg"} 
			alt="vaccine button" 
			on:click={() => {changeState("vaccine")}}
		>
		Vaccine
	</div>	
	<div class={state["blogs"] + "-navbar-button"}>
		<img 
			src={"blogs-" + state["blogs"] + ".svg"} 
			alt="blogs button" 
			on:click={() => {changeState("blogs")}}
		>
		Blogs
	</div>	
	<div class={state["sos"] + "-navbar-button"}>
		<img 
			src={"sos-" + state["sos"] + ".svg"} 
			alt="sos button" 
			on:click={() => {changeState("sos")}}
		>
		SOS
	</div>
</nav>

<style>

	.navbar {
		display: flex;
		justify-content: space-between;
		padding: 1rem 2rem 1.4rem 2rem;
	}
	.navbar div {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
		gap: 2px;
	}

	.navbar div img {
		height: 2rem;
	}

	.navbar .active-navbar-button{
		font-weight: bold;
	}
</style>
