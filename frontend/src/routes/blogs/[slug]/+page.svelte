<script>
  export let data;
  let bookMarked;
</script>

<section>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-[0.89rem] text-[#5E6073] mb-2 ml-1">{data.subHeading}</h1>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <img
        src={bookMarked ? "/bookmark-checked.svg" : "/bookmark-unchecked.svg"}
        alt="Icon"
        on:click={() => {
          bookMarked = !bookMarked;
        }}
      />
    </div>

    <img src={data.image} alt="Article Cover" />

    <h1 class="text-[1.3rem] mt-3 ml-1">{data.title}</h1>
    <p class="mt-3 ml-1 whitespace-">{data.content}</p>
  </div>
</section>

<style>
</style>
