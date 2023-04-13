<script>
  import { page } from "$app/stores";
  import { afterNavigate } from "$app/navigation";

  let activeButton = "home";
  /*
   * home
   * vaccine
   * blogs
   * sos
   */

  afterNavigate(() => {
    console.log("route:", $page.route.id);
    const url = $page.route.id;

    if (url == "/") {
        changeState("home");
    } else if (url.slice(0, 8) == "/vaccine") {
      changeState("vaccine");
    } else if (url.slice(0, 6) == "/blogs") {
      changeState("blogs");
    } else if (url.slice(0, 4) == "/sos") {
      changeState("sos");
    } else {
        console.log("Navbar cannot handle given URL");
    }
  });

  function changeState(button) {
    activeButton = button;
  }
</script>

<nav class="navbar">
  <a
    class={(activeButton == "home" ? "active" : "idle") + "-navbar-button"}
    href="/"
    on:click={() => {
      changeState("home");
    }}
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img
      src={"/home-" + (activeButton == "home" ? "active" : "idle") + ".svg"}
      alt="home button"
    />
    Home
  </a>
  <a
    class={(activeButton == "vaccine" ? "active" : "idle") + "-navbar-button"}
    href="/vaccine"
    on:click={() => {
      changeState("vaccine");
    }}
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img
      src={"/vaccine-" +
        (activeButton == "vaccine" ? "active" : "idle") +
        ".svg"}
      alt="vaccine button"
    />
    Vaccine
  </a>
  <a
    class={(activeButton == "blogs" ? "active" : "idle") + "-navbar-button"}
    href="/blogs"
    on:click={() => {
      changeState("blogs");
    }}
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img
      src={"/blogs-" + (activeButton == "blogs" ? "active" : "idle") + ".svg"}
      alt="blogs button"
    />
    Blogs
  </a>
  <a
    class={(activeButton == "sos" ? "active" : "idle") + "-navbar-button"}
    href="/sos"
    on:click={() => {
      changeState("sos");
    }}
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img
      src={"/sos-" + (activeButton == "sos" ? "active" : "idle") + ".svg"}
      alt="sos button"
    />
    SOS
  </a>
</nav>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem 1rem 2rem;
  }
  .navbar a {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    gap: 2px;
  }

  .navbar a img {
    height: 2rem;
  }

  .navbar .active-navbar-button {
    font-weight: bold;
  }
</style>
