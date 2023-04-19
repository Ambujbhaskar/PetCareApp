<script>
  import { user } from "$lib/stores.js";
  import Article from "./Article.svelte";
  import articles from "$lib/data/articles.json";
</script>

<div class="SuggestedArticlesContainer">
  {#each articles as { id, tag, title, content, image }, i}
    <a href={`/blogs/${id}`} data-sveltekit-noscroll>
      <Article id={id} type={tag} {title} body={content} src={image} saved={($user.savedArticles.filter((a) => (a==id))).length != 0} />
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
