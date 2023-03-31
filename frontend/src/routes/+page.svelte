<script>
	import Dropdown from "./common/Dropdown.svelte";
	import UpcomingVaccineCard from "./common/UpcomingVaccineCard.svelte";
	import SuggestedArticles from "./common/SuggestedArticles.svelte";
</script>

<svelte:head>
	<title>Pet Care App</title>
	<meta name="description" content="Pet Care app" />
</svelte:head>

<section>
	<Dropdown/>
	<div>
		<div class="Appointment">
			<h4>Next Vaccine Appointment</h4>
			<UpcomingVaccineCard/>
		</div>
		<div class="Articles">
			<h4>Suggested Articles</h4>
			<SuggestedArticles/>
		</div>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 0.6;
	}
	section > div {
		margin-top: 4rem;
	}
	.Appointment {
		margin-top: 3rem;
	}
</style>
