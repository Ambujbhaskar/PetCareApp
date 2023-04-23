<script>
    import { goto } from "$app/navigation";
    import { user } from "$lib/stores";
    import Option from "./Option.svelte";

    export let petsArr;
    export let value;

    $: console.log("petsArr", petsArr);
    $: selectedOption = petsArr?.filter((option) => option._id == value)[0] || {};
    // $: console.log("SO", selectedOption);
    let state = false;
    const imgsrc = "/down-arrow-idle.svg";

    function handleStateChange() {
        state = !state;
    }
    function addPet() {
        goto("/profile/addpet");
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class={"Dropdown" + (state ? "Active" : "Idle")}
    on:click={handleStateChange}
>
    <div class={"SelectedValue" + (state ? "Active" : "Idle")}>
        <Option
            key={selectedOption._id}
            bind:value
            isDropdownActive={state}
            {petsArr}
        />
        <span>
            <img src={imgsrc} alt="dropdown button" class="DropdownButton" />
        </span>
    </div>
    {#if state}
        <div class={"List" + (state ? "Active" : "Idle")}>
            {#each petsArr as option}
                {#if option._id != value}
                    <Option
                        key={option._id}
                        bind:value
                        isDropdownActive={state}
                        bind:petsArr
                    />
                {/if}
            {/each}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class={state
                    ? "Default NoPadding"
                    : "Default IdleColor NoPadding"}
                on:click={addPet}
            >
                <img
                    src={"/add-with-circle.png"}
                    alt={"add symbol"}
                    class="RoundImg"
                />
                <p>Add pet</p>
            </div>
        </div>
    {/if}
</div>

<style>
    .SelectedValueIdle {
        display: flex;
        justify-content: flex-start;
        align-items: center;
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
        height: 1rem;
        width: 1rem;
        border-radius: 0.5rem;
        margin: 0.15rem;
        margin-left: 0.4rem;
        margin-right: 0.5rem;
        height: 1.5rem;
        width: 1.5rem;
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
    .Default {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: calc(10rem - 4px);
        padding: 0.2rem 0.4rem 0.2rem 0.4rem;
        background-color: var(--color-enabled);
        border-radius: 1rem;
    }
    .Default:hover {
        cursor: pointer;
    }
    .IdleColor {
        background-color: var(--color-disabled);
    }
    .NoPadding {
        padding: 0;
    }
</style>
