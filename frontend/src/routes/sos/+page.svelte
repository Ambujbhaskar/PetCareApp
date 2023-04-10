<script>
  let viewAll = false;

  export let data;
</script>

<section class="ml-1 flex flex-col transition-all duration-200">
  {#if !viewAll}
    <h2 class="mb-5">Nearby vet clinics</h2>
    <img
      src="/map.png"
      alt="Map"
      class="border-[0.12rem] border-black rounded-[1.2rem]"
    />
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

  <!-- lost dogs -->[var(--color-enabled)]
    >Call</button>

  <div
    class="flex flex-col gap-5 justify-between items-center mt-5 transition-all duration-200 delay-500"
  >
    {#each data.lostPets as pets, i}
      <a href={`/sos/${pets.id}`} data-sveltekit-noscroll class="w-full">
        {#if i <= 2 && !viewAll}
          <div
            class="border-[0.12rem] rounded-[1.2rem] border-neutral-400 flex justify-center px-5 items-center w-full p-4"
          >
            <img
              src={pets.imgSrc}
              alt="dog"
              class="w-[7rem] h-[6rem] border-[0.125rem] rounded-[1.2rem] border-neutral-700"
            />

            <div
              class="flex flex-col justify-evenly items-center ml-[4rem] mr-[2.5rem] p-2"
            >
              <div class="font-bold text-[1.5rem]">Name - {pets.name}</div>
              <div class="">Last seen - {pets.location}</div>
              <div>Contact - {pets.contact}</div>
            </div>
          </div>
        {/if}

        {#if viewAll}
          <div
            class="border-[0.12rem] rounded-[1.2rem] border-neutral-400 flex justify-center px-5 items-center w-full p-4"
          >
            <img
              src={pets.imgSrc}
              alt="dog"
              class="w-[7rem] h-[6rem] border-[0.125rem] rounded-[1.2rem] border-neutral-700"
            />

            <div
              class="flex flex-col justify-evenly items-center ml-[4rem] mr-[2.5rem] p-2"
            >
              <div class="font-bold text-[1.5rem]">Name - {pets.name}</div>
              <div class="">Last seen - {pets.location}</div>
              <div>Contact - {pets.contact}</div>
            </div>
          </div>
        {/if}
      </a>
    {/each}
  </div>

  <!-- Submit a request -->
  <div
    class="fixed right-9 bottom-[7.5rem] py-2 px-8 rounded-[2rem] bg-[var(--color-request)] text-[var(--color-bg)] border-2 border-[var(--color-text-secondary)] text-[1.2rem] cursor-pointer hover:scale-98 active:scale-95 transition-all duration-200"
  >
    +Submit a request
  </div>
</section>
