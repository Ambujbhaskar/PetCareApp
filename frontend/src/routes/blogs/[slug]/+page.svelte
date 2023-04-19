<script>
  import articles from "$lib/data/articles.json";
  export let data;
  import { page } from "$app/stores";

  $: title = data.title;
  $: subHeading = data.subHeading;
  $: image = data.image;
  $: content = data.content;

  const path = $page.url.pathname;
  console.log(path);
  let article = articles.find((article) => "/blogs/" + article.id === path);
  console.log(article);
  let bookMarked;
</script>

<section>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-[0.89rem] text-[#5E6073] mb-2 ml-1">{subHeading}</h1>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <img
        src={article.Saved
          ? "/bookmark-checked.svg"
          : "/bookmark-unchecked.svg"}
        alt="Icon"
        on:click={() => {
          bookMarked = !bookMarked;
        }}
      />
    </div>

    <img src={article.Imgsrc} alt="Article Cover" class="w-full" />

    <h1 class="text-[1.3rem] mt-3 ml-1">{title}</h1>
    <p class="mt-3 ml-1 whitespace-">{content}</p>
  </div>
</section>

<style>
</style>
