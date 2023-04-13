<script>
  import Form from "../../common/Form.svelte";
  export let data;

  import { page } from "$app/stores";

  const path = $page.url.pathname;
  console.log(path);
</script>

<section>
  <!-- svelte-ignore a11y-img-redundant-alt -->
  {#if path !== "/sos/request-form"}
    <img
      src={data.lostPets.imgSrc}
      alt="pet Image"
      class="w-full rounded-[1.2rem] border-2 border-black"
    />

    <div class="ml-2 flex flex-col gap-2">
      <div
        class="justify-center flex items-center mb-3 border-dashed border-b-2 py-2 border-b-black/50"
      >
        <h1 class="">Name -</h1>
        <h1 class=" ml-3 text-[1.4rem] font-bold uppercase">
          {data.lostPets.name}
        </h1>
      </div>
      <div>Last Seen - {data.lostPets.location}</div>
      <div>Contact - {data.lostPets.contact}</div>
      <div>Date Missing - {data.lostPets.dateMissing}</div>
      <div>Notes - {data.lostPets.notes}</div>
    </div>

    <!-- Reward -->
    <div
      class="border-[0.12rem] border-black inline-block px-3 text-[0.9rem] mt-4 ml-2 rounded-[1rem] py-1"
    >
      Reward - &#8377;{data.lostPets.reward}
    </div>

    <button
      class="w-full border-2 border-black rounded-[1.4rem] py-2 bg-[var(--color-enabled)] mt-5 hover:scale-98 active:scale-95 transition-all duration-200"
      >Call
    </button>
  {:else}
    <Form />
  {/if}
</section>
