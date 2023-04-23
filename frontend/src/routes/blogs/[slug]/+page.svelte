<script>
  import { URL } from "$lib/stores";
  import axios from "axios";
  import { onMount } from "svelte";
  import { user } from "$lib/stores.js";
  import { page } from "$app/stores";

  export let saved;

  const path = $page.url.pathname;
  let articles = [];
  let article = {
    title: "",
    content: "",
    tag: "",
    image_uri: "",
  };

  async function unsaveArticle(articleId) {
    axios
      .delete(
        $URL + "/articles/" + id,
        {},
        {
          headers: {
            authentication: `Bearer ${sessionStorage.getItem("user-token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });

    saved = !saved;
  }

  async function toggleArticleSave(event, id) {
    event.preventDefault();
    if (saved) {
      unsaveArticle(id);
      return;
    }
    axios
      .post(
        $URL + "/articles/" + id,
        {},
        {
          headers: {
            authentication: `Bearer ${sessionStorage.getItem("user-token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
    saved = !saved;
  }

  onMount(async () => {
    await axios
      .get($URL + "/articles", {
        headers: {
          authentication: `Bearer ${sessionStorage.getItem("user-token")}`,
        },
      })
      .then((res) => {
        articles = res.data;
        article = articles.find((article) => "/blogs/" + article._id === path);
        console.log(article);
      })
      .catch((err) => {
        console.log(err);
      });
  });
</script>

<section>
  <div>
    <div class="flex justify-between items-center mb-1">
      <h1 class="text-[0.89rem] text-[#5E6073] mb-2 ml-1">{article.tag}</h1>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      {#if article.image_uri.length > 0}
        <img
          class="h-4"
          src={saved ? "/bookmark-checked.svg" : "/bookmark-unchecked.svg"}
          alt="Icon"
          on:click={(e) => {
            toggleArticleSave(e, article.id);
          }}
        />
      {/if}
    </div>

    {#if article.image_uri.length > 0}<img
        src={article.image_uri}
        alt="Article Cover"
        class="w-full max-h-80"
      />{/if}

    <h1 class="text-[1.3rem] mt-3 ml-1">{article.title}</h1>
    <p class="mt-3 ml-1 whitespace-">{article.content}</p>
  </div>
</section>

<style>
</style>
