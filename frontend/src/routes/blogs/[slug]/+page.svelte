<script>
  import articles from "$lib/data/articles.json";

  import { user } from "$lib/stores.js";
  import { page } from "$app/stores";

  export let saved;

  const path = $page.url.pathname;
  let article = articles.find((article) => "/blogs/" + article.id === path);

  function unsaveArticle(articleId) {
    user.update((u) => {
      let newUser = { ...u };
      let newSavedArticles = u.savedArticles.filter((id) => id !== articleId);
      newUser.savedArticles = newSavedArticles;
      return newUser;
    });
  }

  function toggleArticleSave(event, id) {
    event.preventDefault();

    if ($user.savedArticles.includes(parseInt(id))) {
      unsaveArticle(parseInt(id));
      saved = !saved;
      return;
    }
    $user.savedArticles.push(parseInt(id));
    saved = !saved;
  }
</script>

<section>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-[0.89rem] text-[#5E6073] mb-2 ml-1">{article.tag}</h1>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <img
        src={!saved ? "/bookmark-checked.svg" : "/bookmark-unchecked.svg"}
        alt="Icon"
        on:click={(e) => {
          toggleArticleSave(e, article.id);
        }}
      />
    </div>

    <img src={article.image} alt="Article Cover" class="w-full" />

    <h1 class="text-[1.3rem] mt-3 ml-1">{article.title}</h1>
    <p class="mt-3 ml-1 whitespace-">{article.content}</p>
  </div>
</section>

<style>
</style>
