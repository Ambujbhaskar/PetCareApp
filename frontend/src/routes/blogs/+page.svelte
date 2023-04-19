<script>
  import SuggestedArticles from "../common/SuggestedArticles.svelte";
  import Article from "../common/Article.svelte";
  import articles from "$lib/data/articles.json";

  let searchTerm = "";
  let selectedProfile = 0;
  let saved;
  let bookMarked = false;
  let search;
  let tabs = [
    { name: "CATS", active: false },
    { name: "NUTRITION", active: true },
    { name: "DOGS", active: false },
    { name: "VETS", active: false },
    { name: "VACCINATION", active: false },
  ];
  let allArticles = articles;

  function searchArticles() {
    allArticles = articles.filter((article) => {
      return (
        article["Title"].toUpperCase().includes(searchTerm.toUpperCase()) ||
        article["Body"].toUpperCase().includes(searchTerm.toUpperCase())
      );
    });
  }

  function setActiveTab(index) {
    tabs = tabs.map((tab, i) => ({ ...tab, active: i === index }));
    allArticles = articles.filter((article) => {
      console.log(article);
      if (bookMarked) {
        return (
          article["Saved"] === bookMarked &&
          article["Type"].toUpperCase() === tabs[index].name
        );
      }

      return article["Type"].toUpperCase() === tabs[index].name;
    });
    console.log(allArticles);
  }

  function bookmark_articles() {
    let Index = tabs.findIndex((tab) => tab.active);
    allArticles = articles.filter((article) => {
      if (bookMarked) {
        return (
          article["Saved"] === bookMarked &&
          article["Type"].toUpperCase() === tabs[Index].name
        );
      }

      return article["Type"].toUpperCase() === tabs[Index].name;
    });
  }

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
          {#if bookMarked}
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
          class="flex flex-auto items-center border-black border-2 w-full rounded-[1rem] h-[2rem] px-5
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
      {#each allArticles as { id, Type, Title, Body, Imgsrc, Saved }, i}
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
