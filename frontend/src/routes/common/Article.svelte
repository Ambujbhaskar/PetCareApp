<script>
  import { user } from "$lib/stores.js";
  import { URL } from "$lib/stores";
  import axios from "axios";
  import { onMount } from "svelte";
  export let id;
  export let type;
  export let title;
  export let body;
  export let src;
  export let saved;

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

  async function toggleArticleSave(event) {
    if (saved) {
      unsaveArticle(id);
      return;
    }
    event.preventDefault();
    console.log(id);
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
</script>

<div class="Article">
  <img {src} alt="Article Cover" />
  <div class="ArticleContent">
    <div>
      <b>{type.toUpperCase()}</b>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <img
        src={saved ? "./bookmark-checked.svg" : "./bookmark-unchecked.svg"}
        alt="Icon"
        on:click={toggleArticleSave}
      />
    </div>
    <h4>{title}</h4>
    <p>{body}</p>
  </div>
</div>

<style>
  .Article {
    border-radius: var(--radius-large);
    display: flex;
    border: solid 1px var(--color-border);
    padding: 1rem;
    height: 9rem;
  }
  .Article > img {
    border: solid 1px var(--color-border);
    border-radius: var(--radius-small);
    width: 7rem;
    height: 7rem;
    object-fit: cover;
    flex-grow: 1;
  }
  .ArticleContent {
    padding: 0 0 0 1rem;
    width: 70%;
    flex-grow: 0;
  }
  .ArticleContent > div > b {
    font-size: var(--font-xs);
    font-weight: 600;
  }
  .ArticleContent > h4 {
    font-size: var(--font-m);
    font-weight: 600;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow-y: hidden;
    text-overflow: ellipsis;
  }
  .ArticleContent > p {
    font-size: var(--font-s);
    font-weight: 500;
    flex-grow: 1;
    height: 3.7rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow-y: hidden;
    text-overflow: ellipsis;
  }
  .ArticleContent > div > img {
    cursor: pointer;
  }
  .ArticleContent > div {
    display: flex;
    justify-content: space-between;
  }
</style>
