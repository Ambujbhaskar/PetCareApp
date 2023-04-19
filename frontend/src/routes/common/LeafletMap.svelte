<script>
	import { onMount, onDestroy } from "svelte";
	import { browser } from "$app/environment";
	import { lostPetRequests } from "$lib/stores.js";

	let mapElement;
	let map;

	onMount(async () => {
		if (browser) {
			const leaflet = await import("leaflet");
			map = leaflet
				.map(mapElement)
				.setView($lostPetRequests[0]["location"], 13);

			leaflet
				.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
				})
				.addTo(map);

			for (let entry of $lostPetRequests)
				leaflet
					.marker(entry["location"])
					.addTo(map)
					.bindPopup(entry["name"] + "<br/>" + entry["contact"])
					.openPopup();
		}
	});

	onDestroy(async () => {
		if (map) {
			console.log("Unloading Leaflet map.");
			map.remove();
		}
	});
</script>

<main>
	<div bind:this={mapElement} />
</main>

<style>
	@import "leaflet/dist/leaflet.css";
	main div {
		height: 200px;
		border-width: 2px;
		border-radius: var(--radius-large);
		border-color: var(--color-text-primary);
	}
</style>
