<script>
  import Article from "../common/Article.svelte";
  // import articles from "$lib/data/articles.json";
  import { user } from "$lib/stores.js";
  import { URL } from "$lib/stores";
  import axios from "axios";
  import { onMount } from "svelte";
  let users = [];
  let searchTerm = "";
  let selectedProfile = 0;
  let saved;
  let bookMarked = false;
  let search;
  let tabs = [
    { name: "CATS", active: true },
    { name: "NUTRITION", active: false },
    { name: "DOGS", active: false },
    { name: "VETS", active: false },
    { name: "VACCINATION", active: false },
  ];
  let articles = [];
  let allArticles = [];
  let userSavedData = [];

  function searchArticles() {
    let Index = tabs.findIndex((tab) => tab.active);
    allArticles = articles.filter((article) => {
      if (bookMarked) {
        return (
          userSavedData.includes(parseInt(article._id)) &&
          (article["title"].toUpperCase().includes(searchTerm.toUpperCase()) ||
            article["content"]
              .toUpperCase()
              .includes(searchTerm.toUpperCase())) &&
          article["tag"].toUpperCase() === tabs[Index].name
        );
      }
      return (
        (article["title"].toUpperCase().includes(searchTerm.toUpperCase()) ||
          article["content"]
            .toUpperCase()
            .includes(searchTerm.toUpperCase())) &&
        article["tag"].toUpperCase() === tabs[Index].name
      );
    });
  }

  function setActiveTab(index) {
    tabs = tabs.map((tab, i) => ({ ...tab, active: i === index }));
    allArticles = articles.filter((article) => {
      if (bookMarked) {
        return (
          userSavedData.includes(parseInt(article._id)) &&
          article["tag"].toUpperCase() === tabs[index].name
        );
      }
      return article["tag"].toUpperCase() === tabs[index].name;
    });
  }

  async function bookmark_articles() {
    let Index = tabs.findIndex((tab) => tab.active);

    allArticles = articles.filter((article) => {
      if (bookMarked) {
        return (
          userSavedData.includes(parseInt(article._id)) &&
          article["tag"].toUpperCase() === tabs[Index].name
        );
      }

      return article["tag"].toUpperCase() === tabs[Index].name;
    });
  }

  onMount(async () => {
    await axios
      .get($URL + "/articles", {
        headers: {
          authentication: `Bearer ${sessionStorage.getItem("user-token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        articles = res.data;
        bookmark_articles();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  onMount(async () => {
    await axios
      .get($URL + "/user/", {
        headers: {
          authentication: `Bearer ${sessionStorage.getItem("user-token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        users = res.data;
        userSavedData = users.saved_articles;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  $: bookmark_articles();
</script>

<svelte:head>
  <title>Pet Care App</title>
  <meta name="description" content="Pet Care app" />
</svelte:head>

<section class="box-border">
  <div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="flex justify-between items-center absolute top-20 mt-7 bg-white/80 w-[93%]"
    >
      {#if !search}
        <div class="flex">
          <div
            class={`border-black rounded-[1rem] border-[0.13rem] w-[12rem] h-[2rem] flex px-5 justify-between 
            items-center cursor-pointer mr-2 ${bookMarked && "bg-[#F2F4D1]"}`}
            on:click={() => {
              bookMarked = true;
              bookmark_articles();
            }}
          >
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img
              src={bookMarked
                ? "./bookmark-checked.svg"
                : "./bookmark-unchecked.svg"}
              alt="Icon"
              on:click={() => {
                bookMarked = true;
                bookmark_articles();
              }}
            />
            View Bookmarks
          </div>
          {#if bookMarked}{#each allArticles as { _id, tag, title, content, image_uri }, i}
              <a href={`/blogs/${_id}`} data-sveltekit-noscroll>
                <Article
                  {_id}
                  type={tag}
                  {title}
                  body={content}
                  src={image_uri}
                  saved={$user.savedArticles.filter((a) => a == _id).length !=
                    0}
                />
              </a>
            {/each}
            <img
              src={bookMarked && "./delete-bmk.svg"}
              alt="Icon"
              on:click={() => {
                bookMarked = false;
                bookmark_articles();
              }}
              class="cursor-pointer transition duration-800 ease-in-out delay-700 h-[2rem]"
            />
          {/if}
        </div>
      {:else}
        <div
          class={`border-black rounded-full border-2 h-[2rem] flex px-3 justify-between items-center cursor-pointer mr-2
                  ${bookMarked && "bg-[#F2F4D1]"}`}
          on:click={() => {
            bookMarked = true;
            bookmark_articles();
            search = false;
          }}
        >
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <img
            src={bookMarked
              ? "./bookmark-checked.svg"
              : "./bookmark-unchecked.svg"}
            alt="Icon"
            on:click={() => {
              bookmark_articles();
              bookMarked = true;
            }}
          />
        </div>
      {/if}

      {#if !search}
        <div
          class="transition duration-800 ease-in-out rounded-[1rem] h-[2rem]"
        >
          <img
            src={"./search.svg"}
            alt="Search"
            class="cursor-pointer"
            on:click={() => {
              search = true;
            }}
          />
        </div>
      {:else}
        <div
          class="flex flex-auto items-center justify-center border-black border-2 w-full rounded-[1rem] h-[2rem] px-5 py-4
          transition duration-2000 ease-in-out"
        >
          <img src="./search_icon.svg" alt="Search" class="mr-4" />
          <input
            type="text"
            placeholder="Search"
            class="outline-none w-full"
            bind:value={searchTerm}
            on:input={searchArticles}
          />
        </div>
      {/if}
    </div>
    <div
      class="flex flex-auto justify-between items-center ml-1 mt-6 mb-6 w-full"
    >
      {#each tabs as tab, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class={`flex  justify-center items-center px-3 rounded-[0.5rem] py-[0.1rem] 
          border-[0.124rem] border-[#5E6073] cursor-pointer text-[0.7rem] text-center font-medium ${
            tab.active
              ? "bg-[#5E6073] text-white"
              : "text-[#5E6073] transition duration-800 ease-in-out"
          }`}
          class:selected={tab.active}
          on:click={() => setActiveTab(i)}
        >
          {tab.name}
        </div>
      {/each}
    </div>
    <div class="SuggestedArticlesContainer">
      {#if allArticles.length == 0}
        <div class="flex justify-center items-center mt-[9rem]">
          <img src="./empty_articles.png" alt="No Articles" />
        </div>
      {:else}
        {#each allArticles as { _id, tag, title, content, image_uri }, i}
          <a href={`/blogs/${_id}`} data-sveltekit-noscroll>
            <Article
              id={_id}
              type={tag}
              {title}
              body={content}
              src={image_uri}
              saved={userSavedData.filter((a) => a == _id).length != 0}
            />
          </a>
        {/each}
      {/if}
    </div>
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 0.6;
  }
  .Articles {
    margin-top: 1rem;
  }

  .SuggestedArticlesContainer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
