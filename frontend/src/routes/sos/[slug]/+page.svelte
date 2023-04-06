<script>
  import { getContext } from "svelte";

  let lostPets = getContext("SOS_LOST_PETS");
</script>

<section>
  {#if lostPets !== undefined}
    {#each lostPets as pet, i}
      <div>{pet.name}</div>
    {/each}
  {/if}
</section>
