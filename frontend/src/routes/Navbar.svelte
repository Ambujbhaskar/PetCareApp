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
	<div>
		<img 
			src={"home-" + state["home"] + ".svg"} 
			alt="home button" 
			on:click={() => {changeState("home")}}
		>
		Home
	</div>
	<div>
		<img 
			src={"vaccine-" + state["vaccine"] + ".svg"} 
			alt="vaccine button" 
			on:click={() => {changeState("vaccine")}}
		>
		Vaccine
	</div>	
	<div>
		<img 
			src={"blogs-" + state["blogs"] + ".svg"} 
			alt="blogs button" 
			on:click={() => {changeState("blogs")}}
		>
		Blogs
	</div>	
	<div>
		<img 
			src={"sos-" + state["sos"] + ".svg"} 
			alt="sos button" 
			on:click={() => {changeState("sos")}}
		>
		SOS
	</div>
</nav>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200;0,300;0,400;0,500;1,200;1,300;1,400;1,500&display=swap');

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
		font-family: 'Karla', sans-serif;
		font-size: 1rem;
		gap: 2px;
	}

	.navbar div img {
		height: 2rem;
	}
</style>