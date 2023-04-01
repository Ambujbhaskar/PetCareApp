<script>
	import Dropdown from "./common/Dropdown.svelte";
	import UpcomingVaccineCard from "./common/UpcomingVaccineCard.svelte";
	import SuggestedArticles from "./common/SuggestedArticles.svelte";
    let profiles = [
        {
            src: "./zarun.png",
            name: "Zarun",
        },
        {
            src: "./zarun.png",
            name: "Pepper",
        },
        {
            src: "./zarun.png",
            name: "Amongus",
        },
        {
            src: "./zarun.png",
            name: "Jod",
        },
        {
            src: "./zarun.png",
            name: "Sus",
        },
        {
            src: "./zarun.png",
            name: "Rada",
        },
        {
            src: "./zarun.png",
            name: "Pogchamp",
        },
        {
            src: "./zarun.png",
            name: "Dogger",
        },
        {
            src: "./zarun.png",
            name: "Cheems",
        },
    ];
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
		<UpcomingVaccineCard/>
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
