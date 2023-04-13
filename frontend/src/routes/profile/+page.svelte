<script>
	import {goto} from '$app/navigation'
	export let data;
</script>

<h1>Hello {data["name"]}</h1>
<div class="profile-body">
	<br/>
	<div class="user-profile">
		<div class="user-info">
			<p>Email - {data["email"]}</p>
			<p>Phone - {data["phone"]}</p>
		</div>
		<button class="profile-edit-button">
			<img src="/edit.svg" alt="edit icon"/>
			Edit
		</button>
	</div>
	<br/>

	<h1>Manage Pets</h1>
	<br/>
	<div class="pet-list">
		{#each data["petList"] as pet}
			<button class="pet-card" on:click={() => goto("/profile/" + pet["name"])}>
				<img src={pet['image']} class="pet-image" alt="photo of {pet['name']}"/>
				{pet['name']}
			</button>
		{/each}
	</div>
	<br/>
	<a class="pet-add-button" href="/profile/addpet">
		<img src="/plus.svg" alt="plus icon"/>
		Add a pet 
	</a>
	<br/>

	<h1>Lost pet requests</h1><br/>
	<div class="lost-pet-list">
		{#each data["lostPetList"] as pet}
			<div class="lost-pet-card">
				<img src={pet['image']} class="lost-pet-image" alt="photo of {pet['name']}"/>
				<div>
					<p class="lost-pet-name">Name - {pet['name']}</p>
					<p>Last seen - {pet['last-seen']}</p>
						<br/>
					<p class="lost-pet-contact">Contact - {pet['contact']}</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	h1 {
		font-size: var(--font-xl);
		font-weight: 500;
		color: var(--color-text-primary);
	}
	p {
		font-family: var(--font-heading);
	}

	.profile-body {
		height: 80%;
		overflow-y: auto;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.profile-body::-webkit-scrollbar{
		display: none;
	}

	.user-profile {
		display: flex;
		justify-content: space-between;
		height: fit-content;
		gap: 1rem;
	}
	.user-info {
		display: flex;
		flex-grow: 2;
		flex-direction: column;
		gap: 0.5rem;
		border-radius: var(--radius-large);
		border-width: 1px;
		border-color: var(--color-text-primary);
		padding: 0.8rem;
		font-family: var(--font-heading);
		font-size: var(--font-s);
	}
	.profile-edit-button {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		border-radius: var(--radius-large);
		border-width: 1px;
		border-color: var(--color-text-primary);
		padding: 1rem;
		width: 20%;
		background-color: var(--color-disabled);
		font-family: var(--font-heading);
	}
	.pet-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 1rem;
		height: max-content;
	}
	.pet-card{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		font-weight: 500;
		border-radius: var(--radius-large);
		border-width: 1px;
		border-color: var(--color-text-primary);
		padding: 1rem 0.8rem 0.5rem;
		height: 9rem;
		width: 47%;
		background-color: var(--color-disabled);
	}
	.pet-image{
		border-radius: var(--radius-small);
		border-width: 1px;
		border-color: var(--color-text-primary);
		width: 100%;
		height: 80%;
		object-fit: cover;
	}
	.pet-add-button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		border-radius:  20px;
		border-width: 1px;
		border-color: var(--color-text-primary);
		padding: 0.2rem 0rem;
		background-color: var(--color-enabled);
		width: 100%;
		font-size: var(--font-xl);
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.lost-pet-list{
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.lost-pet-card {
		display: flex;
		gap: 1rem;
		width: 100%;
		padding: 0.8rem;
		border-radius:  var(--radius-large);
		border-width: 1px;
		border-color: var(--color-text-primary);
	}
	.lost-pet-image {
		border-radius: var(--radius-small);
		border-width: 1px;
		border-color: var(--color-text-primary);
		width: 6rem;
		height: 6rem;
		object-fit: cover;
	}
	.lost-pet-name {
		font-family: var(--font-heading);
		font-weight: bold;
		font-size: var(--font-l);
		color: var(--color-text-primary);
	}
	.lost-pet-contact {
		font-family: var(--font-heading);
		font-weight: 500;
		font-size: var(--font-s);
		color: var(--color-text-primary);
	}
</style>
