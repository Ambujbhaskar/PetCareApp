<script>
  export let data;

  $: title = data.title;
  $: subHeading = data.subHeading;
  $: image = data.image;
  $: content = data.content;

  let bookMarked;
</script>

<section>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-[0.89rem] text-[#5E6073] mb-2 ml-1">{subHeading}</h1>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <img
        src={bookMarked ? "/bookmark-checked.svg" : "/bookmark-unchecked.svg"}
        alt="Icon"
        on:click={() => {
          bookMarked = !bookMarked;
        }}
      />
    </div>

    <img src={image} alt="Article Cover" />

    <h1 class="text-[1.3rem] mt-3 ml-1">{title}</h1>
    <p class="mt-3 ml-1 whitespace-">{content}</p>
  </div>
</section>

<style>
</style>
