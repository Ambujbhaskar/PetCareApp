<script>
    import Option from "./Option.svelte";

    export let options;
    export let value;
    $: option = options[value];

    let state = "Idle";
    const imgsrc = "./down-arrow-idle.svg";

    function handleStateChange() {
        if (state == "Idle") {
            state = "Active";
        } else {
            state = "Idle";
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class={"Dropdown"+state} on:click={handleStateChange}>
    <div class={"SelectedValue"+state}>
        <img src={option.src} alt={option.name + "'s picture"} class="RoundImg"/>
        <p>{option.name}</p>
        <span>
            <img src={imgsrc} alt="dropdown button" class="DropdownButton"/>
        </span>
    </div>
    {#if state=="Active"}
        <div class={"List"+state}>
            {#each options as option, i}
                {#if i != value}
                    <Option
                        key={i}
                        bind:value={value}
                        options={options}
                    />
                {/if}
            {/each}
        </div>
    {/if}
</div>

<style>
    .SelectedValueIdle {
        display: flex;
        justify-content: flex-start;
        width: 10rem;
        padding: 0.2rem 0.4rem 0.2rem 0.4rem;
        background-color: var(--color-disabled);
        border: solid 1px var(--color-border);
        border-radius: 1rem;
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
    .SelectedValueIdle > span {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-grow: 1;
    }
    .SelectedValueActive > span {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-grow: 1;
    }
    .SelectedValueIdle > span > .DropdownButton {
        animation: rotateIconBack 0.3s forwards;
    }
    .SelectedValueActive > span > .DropdownButton {
        animation: rotateIcon 0.3s forwards;
    }
    .ListIdle {
        opacity: 0%;
    }
    .ListActive {
        animation: fade-in 0.3s;
        overflow-y: scroll;
    }
    .DropdownIdle {
        position: absolute;
        top: 12%;
        z-index: 100;
        animation: contract 0.3s;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 10rem;
        height: 2rem;
        border-radius: 1rem;
    }
    .DropdownActive {
        animation: expand 0.3s;
        position: absolute;
        top: 12%;
        z-index: 100;
        padding: 1px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 10rem;
        max-height: 10rem;
        background-color: var(--color-enabled);
        border: solid 1px var(--color-border);
        border-radius: 1rem;
    }
    @keyframes expand {
        0% {
            height: 2rem;
        }
        100% {
            height: min-content;
        }
    }
    @keyframes fade-in {
        0% {
            opacity: 0%;
        }
        100% {
            opacity: 100%;
        }
    }
    @keyframes contract {
        0% {
            height: 10rem;
        }
        100% {
            height: min-content;
        }
    }
    @keyframes rotateIcon {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(180deg);
        }
    }
    @keyframes rotateIconBack {
        0% {
            transform: rotate(180deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
</style>