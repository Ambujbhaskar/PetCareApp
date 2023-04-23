<script>
	import { URL } from "$lib/stores.js";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import axios from "axios";

	let data = {
		name: "",
		email: "",
		phone: "",
		pets: [],
		saved_articles: [],
		lostPetRequests: [],
	};

	onMount(async () => {
		try {
			let result = await axios.get($URL + "/user", {
				headers: {
					authentication: `Bearer ${sessionStorage.getItem("user-token")}`,
				},
			});
			data = result.data;
			data["lostPetRequests"] = []
			data["lostPetRequests"] = (await axios.get($URL + "/requests/user", {
				headers: {
					authentication: `Bearer ${sessionStorage.getItem("user-token")}`,
				},
			})).data;
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	});

	let editing = false;
	let userInfoClass = "user-info";

	async function toggleEdit() {
		editing = !editing;
		if (editing) {
			userInfoClass = "user-info-editing";
		} else {
			userInfoClass = "user-info";
			try {
				await axios.patch(
					$URL + "/user",
					{
						email: data["email"],
						phone: data["phone"],
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

<h1 class="user-name">Hello {data["name"]}</h1>
<div class="profile-body">
	<br />
	<div class="user-profile">
		<div class={userInfoClass}>
			<span
				>Email - <input
					disabled={!editing}
					type="text"
					bind:value={data["email"]}
				/></span
			>
			<span
				>Phone - <input
					disabled={!editing}
					type="text"
					bind:value={data["phone"]}
				/></span
			>
		</div>
		{#if !editing}
			<button on:click={toggleEdit} class="profile-edit-button">
				<img src="/edit.svg" alt="edit icon" />
				Edit
			</button>
		{:else}
			<button on:click={toggleEdit} class="profile-edit-confirm-button">
				<img src="/done-black-empty.svg" alt="edit confirm icon" />
				Done
			</button>
		{/if}
	</div>
	<br />

	<h1>Manage Pets</h1>
	<br />
	<div class="pet-list">
		{#if data["pets"].length > 0}
			{#each data["pets"] as pet}
				<button
					class="pet-card"
					on:click={() => goto("/profile/" + pet["_id"])}
				>
					<img
						src={pet["image_uri"]}
						class="pet-image"
						alt="photo of {pet['name']}"
					/>
					{pet["name"]}
				</button>
			{/each}
		{:else}
			<img src="no-pets-added.svg" alt="empty pet list" />
		{/if}
	</div>
	<br />
	<a class="pet-add-button" href="/profile/addpet">
		<img src="/plus.svg" alt="plus icon" />
		Add a pet
	</a>
	<br />

	<h1>Lost pet requests</h1>
	<br />
	<div class="lost-pet-list">
		{#if data["lostPetRequests"].length > 0}
			{#each data["lostPetRequests"] as pet}
				<div class="lost-pet-card">
					<img
						src={pet["image_uri"]}
						class="lost-pet-image"
						alt="photo of {pet['name']}"
					/>
					<div>
						<p class="lost-pet-name">Name - {pet["name"]}</p>
						<p>Last seen - {pet["last_seen"]}</p>
						<br />
						<p class="lost-pet-contact">
							Contact - {pet["contact"]}
						</p>
					</div>
				</div>
			{/each}
		{:else}
			<img src="no-lost-pet-requests.svg" alt="empty lost pet list" />
		{/if}
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
	input {
		background: none;
	}

	.user-name {
		margin-bottom: 0.1rem;
	}
	.profile-body {
		height: 85%;
		overflow-y: auto;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.profile-body::-webkit-scrollbar {
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
	.user-info-editing {
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
		color: var(--color-text-secondary);
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
	.profile-edit-confirm-button {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		border-radius: var(--radius-large);
		border-width: 1px;
		border-color: var(--color-text-primary);
		padding: 1rem;
		width: 20%;
		background-color: var(--color-enabled);
		font-family: var(--font-heading);
	}
	.pet-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 1rem;
		height: max-content;
	}
	.pet-card {
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
	.pet-image {
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
		border-radius: 20px;
		border-width: 1px;
		border-color: var(--color-text-primary);
		padding: 0.2rem 0rem;
		background-color: var(--color-enabled);
		width: 100%;
		font-size: var(--font-xl);
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.lost-pet-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.lost-pet-card {
		display: flex;
		gap: 1rem;
		width: 100%;
		padding: 0.8rem;
		border-radius: var(--radius-large);
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
