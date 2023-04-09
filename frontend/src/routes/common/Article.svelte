<script>
    export let type;
    export let title;
    export let body;
    export let src;
    export let saved;

    function toggleArticleSave(event) {
        event.preventDefault();
        saved = !saved;
    }
</script>

<div class="Article">
    <img src={src} alt="Article Cover"/>
    <div class="ArticleContent">
        <div>
            <b>{type.toUpperCase()}</b>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img
                src={saved?"./bookmark-checked.svg":"./bookmark-unchecked.svg"}
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
        height: 8rem;
    }
    .Article > img {
        border: solid 1px var(--color-border);
        border-radius: var(--radius-small);
        width: 7rem;
        height: 6rem;
        object-fit: cover;
        flex-grow: 1;
    }
    .ArticleContent {
        padding: 0 0 0 1rem;
        width: 70%;
        flex-grow: 0;
    }
    .ArticleContent > div > b{
        font-size: var(--font-xs);
        font-weight: 600;
    }
    .ArticleContent > h4 {
        font-size: var(--font-m);
        font-weight: 600;
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