<script>
	import { user } from "$lib/stores.js";
	import { pet } from "$lib/stores.js";
	import { goto } from "$app/navigation";
	// components
	import Dropdown from "./common/Dropdown.svelte";
	import VaccineCard from "./common/VaccineCard.svelte";
	import SuggestedArticles from "./common/SuggestedArticles.svelte";

	// function
	import { getAppointmentStatus } from "./common/util.js";

	/*
		Fetch Appointments 
		Fetch Articles
		Fetch Saved Articles for the user
	*/

	$: apts = $user.pets[$pet].appointments;
	$: nextAppointment = apts.reduce((acc, curr) => {
		const status = getAppointmentStatus(curr, apts);
		// console.log("S", status);
		if (status == "Next") {
			acc = curr;
		}
		return acc;
	}, null);
	// $: console.log(nextAppointment);
</script>

<svelte:head>
	<title>Pet Care App</title>
	<meta name="description" content="Pet Care app" />
</svelte:head>

<section>
	<Dropdown options={$user.pets} value={$pet} />
	<div class="Appointment">
		<h4>Next Vaccine Appointment</h4>
		{#if nextAppointment != null}
			<VaccineCard appointment={nextAppointment} status={"Next"} />
		{:else}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="ImageContainer"
				on:click={() => {
					goto("/vaccine/addVaccineSchedule");
				}}
			>
				<!-- svelte-ignore a11y-missing-attribute -->
				<img src={"/empty-home-vaccine.svg"} />
			</div>
		{/if}
	</div>
	<div class="Articles">
		<h4>Suggested Articles</h4>
		<SuggestedArticles />
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
	.ImageContainer {
		border-radius: var(--radius-large);
		border: solid 1px black;
	}
</style>
