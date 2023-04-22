<script>
    import {goto} from "$app/navigation";
</script>

<section class="Paper">
    <div class="LogoContainer">
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src="/favicon-petkit.svg" />
    </div>
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src="/title-motto-text.svg" />
    <div class="ActionArea">
        <h4>
            <!-- svelte-ignore a11y-missing-attribute -->
            Don't have an account yet? <a href="/welcome/signup">Create one</a>
        </h4>
        <button on:click={() => {
            goto("/welcome/login");
        }}>
            <!-- svelte-ignore a11y-missing-attribute -->
            <img src="/welcome-icon.svg" />
            Welcome Back
        </button>
    </div>
</section>

<style>
    .Paper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: var(--color-background);
        z-index: 2;

        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        margin: 0;
        padding: 0;
    }
    .LogoContainer {
        background-color: white;
        border-radius: 0 0 50vw 50vw;
        height: 70%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        border: solid 3px #1b1b1b;
    }
    .LogoContainer > img {
        width: 90%;
        margin-bottom: 10%;
    }
    .Paper > img {
        width: 50%;
        margin-top: 1rem;
    }
    .ActionArea {
        width: 100%;
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
        align-items: center;
        color: white;
    }
    .ActionArea > h4 > a {
        color: var(--color-disabled);
    }
    .ActionArea > button {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        background-color: var(--color-disabled);
        height: 2rem;
        border-radius: 1rem;
        border: solid 1px #1b1b1b;
        color: black;
    }
</style>
