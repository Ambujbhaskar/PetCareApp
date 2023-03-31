<script>
    export let type;
    export let title;
    export let body;
    export let src;
</script>

<div class="Article">
    <!-- <div class="ArticleImageContainer"> -->
        <img src={src} alt="Article Cover"/>
    <!-- </div> -->
    <div class="ArticleContent">
        <div>
            <b>{type.toUpperCase()}</b>
            <img src="./bookmark-unchecked.svg" alt="Icon" />
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
        padding: 0.5rem;
        height: 8rem;
    }
    /* .ArticleImageContainer {
        margin-right: 0.5rem;
        padding: 0;
        max-height: 100%;
        width: 60%;
    } */
    .Article > img {
        border: solid 1px var(--color-border);
        border-radius: var(--radius-small);
        width: 7rem;
        height: 7rem;
        object-fit: cover;
        flex-grow: 1;
    }
    .ArticleContent {
        padding: 0 0 0 0.5rem;
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
        height: 4.7rem;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow-y: hidden;
        text-overflow: ellipsis;
    }
    .ArticleContent > div {
        display: flex;
        justify-content: space-between;
    }
</style>