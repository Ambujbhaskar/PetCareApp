<script>
  import { user, URL } from "$lib/stores.js";
  import { onMount } from "svelte";
  import axios from "axios";

  import Article from "./Article.svelte";
  let articles = [];
  onMount(() => {
    axios
			.get($URL + "/articles", {
				headers: {
					authentication: `Bearer ${sessionStorage.getItem(
						"user-token"
					)}`,
				},
			})
			.then((res) => {
				articles = res.data;
				console.log("ARTICLES", res.data);
			})
			.catch((err) => {
				console.log(err);
			});
  })
</script>

<div class="SuggestedArticlesContainer">
  {#each articles as { _id, tag, title, content, image_uri }, i}
    <a href={`/blogs/${_id}`} data-sveltekit-noscroll>
      <Article id={_id} type={tag} {title} body={content} src={image_uri} saved={($user.savedArticles.filter((a) => (a==_id))).length != 0} />
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
