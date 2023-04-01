<script>
    export let value;
    export let key;
    export let options;

    $: option = options[key];

    function selectOption() {
        value = key;
        console.log("Dropdown value Changed to: ", value)
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class={"SelectedValueActive"} on:click={selectOption}>
    <img src={option.src} alt={option.name + "'s picture"} class="RoundImg" />
    <p>{option.name}</p>
</div>

<style>
    .SelectedValueActive:hover {
        cursor: pointer;
    }
    .SelectedValueActive {
        display: flex;
        justify-content: flex-start;
        width: calc(10rem - 4px);
        padding: 0.2rem 0.4rem 0.2rem 0.4rem;
        background-color: var(--color-enabled);
        border-radius: 1rem;
    }
    .RoundImg {
        height: 1.5rem;
        width: 1.5rem;
        border-radius: 0.75rem;
        margin-right: 0.4rem;
    }
</style>