<script>
  import { lostPetRequests } from "$lib/stores.js";
  import LeafletMap from "../common/LeafletMap.svelte";
  let viewAll = false;
  let listHeight = "100%";
  $: {
    if (viewAll) listHeight = "fit-content";
    else listHeight = "30rem";
  }
  export let data;
</script>

<section class="ml-1 flex flex-col transition-all duration-200 overflow-hidden">
  {#if !viewAll}
    <LeafletMap />
  {/if}
  <div class="flex justify-between items-center mt-5">
    <h2>Lost pets</h2>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    {#if !viewAll}
      <div
        class="border-[0.12rem] border-black rounded-[1.2rem] text-[0.8rem] p-2 px-3 flex justify-center
      items-center cursor-pointer hover:scale-98 active:scale-95 transition-all duration-200"
        on:click={() => {
          viewAll = !viewAll;
        }}
      >
        + View all
      </div>
    {/if}
  </div>

  <!-- lost dogs -->

  <div class="lost-pet-list" style="height: {listHeight};">
    {#each $lostPetRequests as pet, i}
      <a href={`/sos/${pet.id}`} data-sveltekit-noscroll class="w-full">
        <div class="lost-pet-card">
          <img
            src={pet["imgSrc"]}
            class="lost-pet-image"
            alt="photo of {pet['name']}"
          />
          <div>
            <p class="lost-pet-name">Name - {pet["name"]}</p>
            <p>Last seen - {pet["lastSeen"]}</p>
            <br />
            <p class="lost-pet-contact">Contact - {pet["contact"]}</p>
          </div>
        </div>
      </a>
    {/each}
  </div>

  <!-- Submit a request -->
  <a href="/sos/request-form" data-sveltekit-noscroll>
    <div
      class="fixed right-4 bottom-[7.5rem] py-2 px-8 rounded-[2rem] bg-[var(--color-request)] text-[var(--color-bg)] border-2 border-[var(--color-text-secondary)] text-[1.2rem] cursor-pointer hover:scale-98 active:scale-95 transition-all duration-200"
    >
      +Submit a request
    </div>
  </a>
</section>

<style>
  .lost-pet-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
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
