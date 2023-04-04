<script>
  import Article from "./Article.svelte";
  const articles = [
    {
      id: 1, // change change later when fetching data from backend.
      Type: "Nutrition",
      Title: "Wet vs Dry Food",
      Body: "When it comes to food, there are so many options ...",
      Imgsrc: "./zarun.png",
      Saved: false,
    },
    {
      id: 2,
      Type: "Nutrition",
      Title: "Wet vs Dry Food",
      Body: "When it comes to food, there are so many options ...",
      Imgsrc: "./zarun.png",
      Saved: true,
    },
    {
      id: 3,
      Type: "Nutrition",
      Title: "Wet vs Dry Food",
      Body: "When it comes to food, there are so many options ...",
      Imgsrc: "./profile.svg",
      Saved: false,
    },
    {
      id: 4,
      Type: "Nutrition",
      Title: "Wet vs Dry Food",
      Body: "When it comes to food, there are so many options ...",
      Imgsrc: "./bookmark-unchecked.svg",
      Saved: false,
    },
    {
      id: 5,
      Type: "Nutrition",
      Title: "Wet vs Dry Food",
      Body: "When it comes to food, there are so many options amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus",
      Imgsrc: "./zarun.png",
      Saved: false,
    },
  ];
</script>

<div class="SuggestedArticlesContainer">
  {#each articles as { id, Type, Title, Body, Imgsrc, Saved }, i}
    <a href={`/blogs/${id}`} data-sveltekit-noscroll>
      <Article
        type={Type}
        title={Title}
        body={Body}
        src={Imgsrc}
        saved={Saved}
      />
    </a>
  {/each}
</div>

<style>
  .SuggestedArticlesContainer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
