<script>
    let value = "Zarun";
    let options = [
        {
            src: "./zarun.png",
            name: "Zarun",
        },
        {
            src: "./zarun.png",
            name: "Perpper",
        },
    ]; 
    let state = "Idle";

    const imgsrc = "./down-arrow-idle.svg";
    $: className = state;

    function handleStateChange() {
        if (state == "Idle") {
            state = "Active";
        } else {
            state = "Idle";
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class={"Dropdown"+className} on:click={handleStateChange}>
    <div class={"SelectedValue"+className}>
        <p>{value}</p>
        <img src={imgsrc} alt="dropdown button"/>
    </div>
</div>

<style>
    .SelectedValueIdle {
        display: flex;
        justify-content: space-between;
        width: 7rem;
        padding: 0.2rem 1rem 0.2rem 1rem;
        background-color: var(--color-disabled);
        border: solid 1px var(--color-border);
        border-radius: 1rem;
    }
    .SelectedValueActive {
        display: flex;
        justify-content: space-between;
        width: calc(7rem - 4px);
        padding: 0.2rem 1rem 0.2rem 1rem;
        background-color: var(--color-enabled);
        border-radius: 1rem;
    }
    .SelectedValueIdle > img {
        animation: rotateIconBack 0.3s forwards;
    }
    .SelectedValueActive > img {
        animation: rotateIcon 0.3s forwards;
    }
    .DropdownIdle {
        position: absolute;
        top: 12%;
        z-index: 100;
        animation: contract 0.3s;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 7rem;
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
        width: 7rem;
        height: 10rem;
        background-color: var(--color-enabled);
        border: solid 1px var(--color-border);
        border-radius: 1rem;
    }
    @keyframes expand {
        0% {
            height: 2rem;
        }
        100% {
            height: 10rem;
        }
    }
    @keyframes contract {
        0% {
            height: 10rem;
        }
        100% {
            height: 2rem;
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