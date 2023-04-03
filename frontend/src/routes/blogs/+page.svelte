<script>
  import Dropdown from "../common/Dropdown.svelte";
  import UpcomingVaccineCard from "../common/UpcomingVaccineCard.svelte";
  import SuggestedArticles from "../common/SuggestedArticles.svelte";
  let profiles = [
    {
      src: "./zarun.png",
      name: "Zarun",
    },
    {
      src: "./zarun.png",
      name: "Pepper",
    },
    {
      src: "./zarun.png",
      name: "Amongus",
    },
    {
      src: "./zarun.png",
      name: "Jod",
    },
    {
      src: "./zarun.png",
      name: "Sus",
    },
    {
      src: "./zarun.png",
      name: "Rada",
    },
    {
      src: "./zarun.png",
      name: "Pogchamp",
    },
    {
      src: "./zarun.png",
      name: "Dogger",
    },
    {
      src: "./zarun.png",
      name: "Cheems",
    },
  ];
  let selectedProfile = 0;
  export let saved;
  export let bookMarked;

  function bookMarked_op() {
    bookMarked = !bookMarked;
  }
</script>

<svelte:head>
  <title>Pet Care App</title>
  <meta name="description" content="Pet Care app" />
</svelte:head>

<section>
  <div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="flex">
      <div
        class={`border-black rounded-[20px] border-2 w-[12rem] h-[3rem] flex px-5 justify-between items-center cursor-pointer mr-2
      ${bookMarked && "bg-[#F2F4D1]"}`}
        on:click={bookMarked_op}
      >
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img
          src={bookMarked
            ? "./bookmark-checked.svg"
            : "./bookmark-unchecked.svg"}
          alt="Icon"
          on:click={bookMarked_op}
        />
        View Bookmarks
      </div>
      {#if bookMarked}
        <img
          src={bookMarked && "./delete-bmk.svg"}
          alt="Icon"
          on:click={() => {
            bookMarked = !bookMarked;
          }}
          class="cursor-pointer"
        />
      {/if}
    </div>
    <h4>Suggested Articles</h4>
    <SuggestedArticles />
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 0.6;
  }
  h4 {
    margin-bottom: 1rem;
  }
  .Articles {
    margin-top: 1rem;
  }
</style>
