<script>
	import { user, pet, URL } from "$lib/stores.js";
	import axios from "axios";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	import Dropdown from "./common/Dropdown.svelte";
	import VaccineCard from "./common/VaccineCard.svelte";
	import SuggestedArticles from "./common/SuggestedArticles.svelte";
	import { getAppointmentStatus } from "./common/util.js";

	let userObject = {};
	let petsArr = [];
	let petObj = {};
	let petApts = [];
	$: activePet = $pet;
	$: console.log("ACTIVPET:", activePet);

	onMount(async () => {
		await axios
			.get($URL + "/user", {
				headers: {
					authentication: `Bearer ${sessionStorage.getItem(
						"user-token"
					)}`,
				},
			})
			.then((res) => {
				console.log("res", res);
				userObject = res.data;
				petsArr = userObject.pets;
				console.log(petsArr);
				petObj = petsArr[0];
				console.log(petObj);
				petApts = petObj.appointments;
				console.log(petApts);
			})
			.catch((err) => {
				console.log(err);
			});
	});

	$: console.log("USEROBJ", userObject);
	
	petObj = petsArr.filter(p => p._id == $pet)?.[0] || {appointments: []};
	petApts = petObj.appointments;

	$: nextPetAppointment = petApts.reduce((acc, curr) => {
		const status = getAppointmentStatus(curr, petApts);
		if (status == "Next") {
			acc = curr;
		}
		return acc;
	}, null);

	$: console.log("NEXT", nextPetAppointment);
</script>

<svelte:head>
	<title>Pet Care App</title>
	<meta name="description" content="Pet Care app" />
</svelte:head>

<section>
	<Dropdown options={petsArr} value={$pet} />
	<div class="Appointment">
		<h4>Next Vaccine Appointment</h4>
		{#if nextPetAppointment != null}
			<VaccineCard appointment={nextPetAppointment} status={"Next"} />
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
