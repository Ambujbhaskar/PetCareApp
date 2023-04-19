<script>
	import {user} from "$lib/stores.js"
	import {goto} from '$app/navigation'

	let months = [
		'january', 
		'february', 
		'march', 
		'april', 
		'may', 
		'june', 
		'july', 
		'august', 
		'september', 
		'october', 
		'november', 
		'december'
	]
	let bloodGroups = {
		dog: ['dea-1.1', 'dea-1.2', 'dea-3', 'dea-4', 'dea-5', 'dea-7'],
		cat: ['a', 'b', 'ab'],
		rabbit: ['a', 'b',  'ab', 'o']
	}

	let uploadLabel = "image-upload";
	let date = ["", "", ""];
	let petState =
	{ 
		id: $user['pets'].length + 1,
		name: "",
		species: "dog",
		breed: "",
		dob: "",
		bloodGroup: "",
		notes: "",
		src: "",
		appointments: []
	}
	$: petState["dob"] = date.join(" ");

	function setUploadedImage(event){
		if (!event.target.files[0])
			return;
		let reader = new FileReader();
		reader.onload = function(event) {
			petState["src"] = event.target.result;
			uploadLabel = "";
		};
		reader.readAsDataURL(event.target.files[0]);
	}
	function clearUploadedImage(){
		petState["src"] = "";
		uploadLabel = "image-upload";
	}
	function validateFields(){
		let valid = true;
		let month = document.getElementById('dob-month');
		valid &= months.includes(month.value.toLowerCase());
		if (!valid) {
			month.setCustomValidity("Please enter a valid month");
		}
		let bloodGroup = document.getElementById('blood-group');
		valid &= bloodGroups[petState['species']].includes(bloodGroup.value.toLowerCase());
		if (!valid) {
			bloodGroup.setCustomValidity("Please enter a valid blood group");
		}
		return valid;
	}
	function handleSubmit() {
		if (validateFields()){
			$user["pets"].push(petState);
			goto('/profile');
		}
	}
</script>

<div class="add-pet-form">
	<div class="Illustration">
		<h4>Add Pet</h4>
		<img src="/add-pet-illustration.svg" alt="Add vaccine schedule" />
	</div>
	<br/>
	<form on:submit|preventDefault={handleSubmit}>
		<h1>Name</h1>
		<input required bind:value={petState["name"]} type="text" placeholder="ENTER THE NAME OF THE PET"/>
		<h1>Species</h1>
		<div>
			<input required bind:group={petState["species"]} type="radio" id="dog" name="species" value="dog"/>
			<label for="dog">DOG</label>
			<input required bind:group={petState["species"]} type="radio" id="cat" name="species" value="cat"/>
			<label for="cat">CAT</label>
			<input required bind:group={petState["species"]} type="radio" id="rabbit" name="species" value="rabbit"/>
			<label for="rabbit">RABBIT</label>
		</div>
		
		<h1>Breed</h1>
		<input required bind:value={petState["breed"]} type="text" placeholder="ENTER THE BREED"/>

		<h1>Date of birth</h1>	
		<div>
			<input min='0' required bind:value={date[0]} type="number" placeholder="DAY"/>
			<input 
				required 
				bind:value={date[1]} 
				on:invalid={event => event.target.setCustomValidity("Please enter a valid month")} 
				on:input={event => event.target.setCustomValidity("")}
				id="dob-month"
				type="text" 
				placeholder="MONTH"
			/>
			<input min='1950' max={(new Date()).getFullYear()} required bind:value={date[2]} type="number" placeholder="YEAR"/>
		</div>
		
		<h1>Weight</h1>
		<div>
			<input min="1" max="1000" required bind:value={petState["weight"]} class="weight-input" type="number" placeholder="ENTER THE WEIGHT OF THE PET"/>
			<span class="weight-unit">KG</span>
		</div>
		
		<h1>Blood group</h1>
		<input 
			required 
			id="blood-group" 
			bind:value={petState["bloodGroup"]} 
			on:invalid={event => event.target.setCustomValidity("Please enter a valid blood group")} 
			on:input={event => event.target.setCustomValidity("")}
			type="text" 
			placeholder="ENTER THE BLOOD GROUP"
		/>
		
		<h1>Notes</h1>
		<input required bind:value={petState["notes"]} type="text" placeholder="ENTER ANY MEDICAL CONDITIONS"/>

		<h1>Upload a picture</h1>
		<input type="file" id="image-upload" accept="image/png, image/jpeg" on:input={event => setUploadedImage(event)}/>
		<label for={uploadLabel} class="upload-button" id="image-upload-label">
			{#if petState["src"] != ""}
				<img src={petState["src"]} alt="uploaded"/>
				<button style="background: none;" on:click|preventDefault={clearUploadedImage}><img src="/cross.svg" alt="cross">Remove</button>
			{:else}
				<img src="/upload.svg" alt="upload icon"/>
				Upload
			{/if}
		</label>
		<button type="submit"><img src="/done.svg" alt="edit"/>Done</button>
	</form>
</div>

<style>
	.Illustration {
		background-color: var(--color-enabled);
		border-radius: var(--radius-large);
		border: solid 1px #1b1b1b;
		padding: 1rem;
		padding-bottom: 0;
	}
	h1 {
		font-size: var(--font-xl);
		font-weight: 500;
		color: var(--color-text-primary);
	}
	.add-pet-form {
		height: 85%;
		padding-bottom: 1rem;
		overflow-y: auto;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.add-pet-form::-webkit-scrollbar{
		display: none;
	}
	form {
		display: flex;
		color: var(--color-text-secondary);
		flex-direction: column;
		gap: 1rem;
		font-family: var(--font-heading);
	}
	form input[type="radio"] {
		display: none;
	}
	form input[type="radio"]:checked + label {
		background-color: var(--color-disabled);
		border-color: var(--color-text-primary);
		color: var(--color-text-primary);
	}
	form label {
		border-color: var(--color-text-secondary);
		border-radius: 20px;
		border-width: 2px;
		padding: 0.3rem;
		width: 35%;
		text-align: center;
		font-size: 12px;
	}
	form input[type="text"], form input[type="number"] {
		border-radius: var(--radius-medium);
		border-color: var(--color-text-primary);
		border-width: 2px;
		padding: 0.5rem;
		width: 100%;
		font-size: var(--font-large);
		font-family: var(--font-heading);
		color: var(--color-text-primary);
	}
	form input[type="text"]::placeholder, form input[type="number"]::placeholder {
		font-size: var(--font-xs);
		color: var(--color-text-secondary);	
	}
	form div {
		display: flex;
		justify-content: space-between;
		gap: 0.5rem;
	}
	.weight-unit {
		border-radius: var(--radius-medium);
		border-color: var(--color-text-primary);
		border-width: 2px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 30%;
		font-size: var(--font-s);
		color: var(--color-text-primary);
		font-weight: 400;
	}
	form input[type="file"] {
		display: none;
	} 
	.upload-button {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-basis: 13rem;
		flex-direction: column;
		gap: 0.3rem;
		border-radius:  var(--radius-medium);
		border-width: 2px;
		border-color: var(--color-text-primary);
		font-size: var(--font-m);
		width: 100%;
	}
	form button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.3rem;
		border-radius:  20px;
		border-width: 2px;
		border-color: var(--color-text-primary);
		padding: 0.2rem 0rem;
		background-color: var(--color-enabled);
		width: 100%;
		font-family: var(--font-title);
		font-size: var(--font-l);
		font-weight: 500;
		color: var(--color-text-primary);
	}
</style>