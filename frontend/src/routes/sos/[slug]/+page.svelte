<script>
  import Form from "../../common/Form.svelte";
  import { URL } from "$lib/stores";
  import axios from "axios";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  const path = $page.url.pathname;
  let lostPetRequests = [];
  let pets = {};
  onMount(async () => {
    await axios
      .get($URL + "/requests", {
        headers: {
          authentication: `Bearer ${sessionStorage.getItem("user-token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        lostPetRequests = res.data;
        pets = lostPetRequests.find((pet) => "/sos/" + pet._id === path);
      })
      .catch((err) => {
        console.log(err);
      });
  });
</script>

<section>
  <!-- svelte-ignore a11y-img-redundant-alt -->
  {#if path !== "/sos/request-form"}
    <img
      src={pets.image_uri}
      alt="pet Image"
      class="w-full rounded-[1.2rem] border-2 border-black"
    />

    <div class="ml-2 flex flex-col gap-2">
      <div
        class="justify-center flex items-center mb-3 border-dashed border-b-2 py-2 border-b-black/50"
      >
        <h1 class="">Name -</h1>
        <h1 class=" ml-3 text-[1.4rem] font-bold uppercase">
          {pets.name}
        </h1>
      </div>
      <div>Last Seen - {pets.last_seen}</div>
      <div>Date Missing - {pets.date_time_missing}</div>
      <div>Notes - {pets.note}</div>
    </div>

    <!-- Reward -->
    <div
      class="border-[0.12rem] border-black inline-block px-3 text-[0.9rem] mt-4 ml-2 rounded-[1rem] py-1"
    >
      Reward - &#8377; 8000
    </div>

    <button
      class="w-full border-2 border-black rounded-[1.4rem] py-2 bg-[var(--color-enabled)] mt-5 hover:scale-98 active:scale-95 transition-all duration-200 flex justify-center items-center"
      ><img src="/call.svg" alt="svg" class="mr-2" />Call {pets.contact}
    </button>
  {:else}
    <Form />
  {/if}
</section>
