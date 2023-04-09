<script>
    // components
	import Dropdown from "./common/Dropdown.svelte";
	import VaccineCard from "./common/VaccineCard.svelte";
	import SuggestedArticles from "./common/SuggestedArticles.svelte";

    // data
    import profiles from "$lib/data/pets.json";
	import appointments from "$lib/data/appointments.json";

	// function
	import { getAppointmentStatus } from "./common/util.js";

	let nextAppointment = appointments.reduce((acc, curr) => {
		const status = getAppointmentStatus(curr);
		if (status == "Next") {
			acc = curr;
		}
		return acc;
	}, null);

	let selectedProfile = 0;
</script>

<svelte:head>
	<title>Pet Care App</title>
	<meta name="description" content="Pet Care app" />
</svelte:head>

<section>
	<Dropdown options={profiles} value={selectedProfile} />
	<div class="Appointment">
		<h4>Next Vaccine Appointment</h4>
		<VaccineCard  
			appointment={nextAppointment}
			status={"Next"} 
        />
	</div>
	<div class="Articles">
		<h4>Suggested Articles</h4>
		<SuggestedArticles/>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 0.6;
	}
	h4 {
		margin-bottom: 1rem;
	}
	.Articles {
		margin-top: 1rem;
	}
</style>
