<script>
	import {URL} from '$lib/stores.js'
	import { onMount } from "svelte";
	import axios from "axios";

	export let data;
	let editing = false;
	let pet = {
		name: '',
		dob: '1 jan 2001',
		species: '',
		weight: '',
		breed: '',
		bloodGroup: '',
		notes: '',
		image_uri: ''
	};
	let petInfoClass = "pet-medical-info"

	onMount(async () => {
		try {
			let result = await axios.get($URL + "/pets/" + data.petName, {
				headers: {
					authentication: `Bearer ${sessionStorage.getItem("user-token")}`,
				},
			});
			pet = result.data;
			console.log(pet);
		} catch (err) {
			console.log(err);
		}
	});
	
	let ageUnit = "Days"
	let currDate = new Date();
	$: dob = new Date(pet["dob"]);
	$: age = Math.ceil(Math.abs(currDate - dob) / (1000 * 60 * 60 * 24));
	$: {
		if (age > 30) {
			age = Math.ceil(age / 30.5);
			ageUnit = "Months"
		}
		if (age > 12) {
			age = Math.ceil(age / 12);
			ageUnit = "Years"
		}
	}

	async function toggleEdit() {
		editing = !editing;
		if (editing) {
			petInfoClass = "pet-medical-info-editing";
		}
		else {
			petInfoClass = "pet-medical-info";
			try {
				await axios.patch(
					$URL + "/pets/" + data.petName,
					{
						weight: pet["weight"],
						bloodGroup: pet["bloodGroup"],
						notes: pet["notes"]
					},
					{
						headers: {
							authentication: `Bearer ${sessionStorage.getItem("user-token")}`,
						},
					}
				);
			} catch (err) {
				console.log(err);
			}
		}
	}
</script>

<div class="pet-profile-body">
	<div class="pet-profile">
		<img src={pet['image_uri']} alt="image of {pet['name']}"/>
		{pet['name']}
	</div>	

	<div class="pet-info">
		<div>
			<span class="pet-age">
				{age}
			</span>	
			{ageUnit}
		</div>
		<div>
			<span>
				<img src="/cat.svg" alt="age" class="pet-species"/>
			</span>	
			{pet['breed']}
		</div>
	</div>

	<div class={petInfoClass}>
		<h1>Medical Information</h1>
		Weight - <input size="2" disabled={!editing} type=text bind:value={pet['weight']}/>kg<br/>
		Blood group - <input disabled={!editing} type=text bind:value={pet['bloodGroup']}/><br/>
		Notes - <input disabled={!editing} type=text bind:value={pet['notes']}/><br/>
	</div>
	{#if !editing}
		<button on:click={toggleEdit}>
			<img src="/edit.svg" alt="edit"/>
			Edit
		</button>
	{:else}
		<button on:click={toggleEdit}>
			<img src="/done.svg" alt="done"/>
			Done
		</button>
	{/if}
</div>

<style>
	input {
		background: none;
	}
	h1 {
		font-family: var(--font-heading);
		font-size: var(--font-xl);
	}
	.pet-profile-body {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		gap: 1rem;
	}
	.pet-profile {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
		border-color: var(--color-text-primary);
		border-width: 1px;
		border-radius: var(--radius-small);
		background-color: var(--color-disabled);
		padding: 0.8rem;
		font-size: var(--font-xl);
		font-weight: bold;
	}
	.pet-profile img {
		border-radius: var(--radius-small);
		border-width: 1px;
		border-color: var(--color-text-primary);
		width: 100%;
		height: 13rem;
		object-fit: cover;
	}
	.pet-info {
		display: flex;
		justify-content: space-between;
		gap: 1rem
	}
	.pet-info div {
		flex-grow: 1;
		display: flex;
		align-items: center;
		gap: 5px;
		border-color: var(--color-text-primary);
		border-width: 1px;
		border-radius: var(--radius-small);
		padding: 0.8rem;
		background-color: var(--color-enabled);
		font-weight: 500;
	}
	.pet-species{
		border-color: var(--color-text-primary);
		border-width: 1px;
		border-radius: 4px;
		padding: 0.5rem;
		background-color: var(--color-background);
	}
	.pet-age{
		border-color: var(--color-text-primary);
		border-width: 1px;
		border-radius: 4px;
		padding: 0 0.5rem;
		background-color: var(--color-background);
		color: white;
		font-size: 26px;
		font-family: var(--font-title);
		-webkit-text-stroke: 1px var(--color-text-primary);
	}
	.pet-medical-info {
		border-color: var(--color-text-primary);
		border-width: 1px;
		border-radius: var(--radius-large);
		padding: 0.8rem;
		font-family: var(--font-heading);
		font-size: var(--font-m);
	}
	.pet-medical-info-editing {
		border-color: var(--color-text-primary);
		border-width: 1px;
		border-radius: var(--radius-large);
		padding: 0.8rem;
		font-family: var(--font-heading);
		font-size: var(--font-m);
		color: var(--color-text-secondary);
	}
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		border-color: var(--color-text-primary);
		border-width: 1px;
		border-radius: 20px;
		padding: 0.2rem 0rem;
		background-color: var(--color-enabled);
		font-family: var(--font-heading);
		font-size: 20px;
		font-weight: 400;
		color: var(--color-text-primary);
	}
</style>