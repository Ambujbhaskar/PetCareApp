<script>
	import {user} from '$lib/stores.js'
	export let data;
	let editing = false;
	let pet = $user["pets"].filter(pet => pet["name"] === data.petName)[0];
	let petInfoClass = "pet-medical-info"
	
	$: $user["pets"]
	.filter(pet => pet["name"] === data.petName)[0]["weight"] 
	= pet['weight'];
	$: $user["pets"]
	.filter(pet => pet["name"] === data.petName)[0]["bloodGroup"] 
	= pet['bloodGroup'];
	$: $user["pets"]
	.filter(pet => pet["name"] === data.petName)[0]["notes"] 
	= pet['notes'];
	
	let dob = new Date(pet["dob"]);
	let currDate = new Date();
	let age = Math.ceil(Math.abs(currDate - dob) / (1000 * 60 * 60 * 24));
	let ageUnit = "Days"
	if (age > 30) {
		age = Math.ceil(age / 30.5);
		ageUnit = "Months"
	}
	console.log(age, ageUnit);
	if (age > 12) {
		age = Math.ceil(age / 12);
		ageUnit = "Years"
	}
	console.log(age, ageUnit);

	function toggleEdit() {
		editing = !editing;
		if (editing) {
			petInfoClass = "pet-medical-info-editing";
		}
		else {
			petInfoClass = "pet-medical-info";
		}
	}
</script>

<div class="pet-profile-body">
	<div class="pet-profile">
		<img src={pet['src']} alt="image of {pet['name']}"/>
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