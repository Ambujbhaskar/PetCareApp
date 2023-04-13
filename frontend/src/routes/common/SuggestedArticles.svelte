<script>
  import Article from "./Article.svelte";
  import articles from "$lib/data/articles.json";
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
