<script>
    import Article from './Article.svelte';
    const articles = [
        {
            Type: "Nutrition",
            Title: "Wet vs Dry Food",
            Body: "When it comes to food, there are so many options ...",
            Imgsrc: "./zarun.png",
            Saved: false,
        },
        {
            Type: "Nutrition",
            Title: "Wet vs Dry Food",
            Body: "When it comes to food, there are so many options ...",
            Imgsrc: "./zarun.png",
            Saved: true,
        },
        {
            Type: "Nutrition",
            Title: "Wet vs Dry Food",
            Body: "When it comes to food, there are so many options ...",
            Imgsrc: "./profile.svg",
            Saved: false,
        },
        {
            Type: "Nutrition",
            Title: "Wet vs Dry Food",
            Body: "When it comes to food, there are so many options ...",
            Imgsrc: "./bookmark-unchecked.svg",
            Saved: false,
        },
        {
            Type: "Nutrition",
            Title: "Wet vs Dry Food",
            Body: "When it comes to food, there are so many options amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus",
            Imgsrc: "./zarun.png",
            Saved: false,
        },
    ];
</script>

<div class="SuggestedArticlesContainer">
    {#each articles as {Type, Title, Body, Imgsrc, Saved}, i}
        <Article type={Type} title={Title} body={Body} src={Imgsrc} saved={Saved} />
    {/each}
</div>

<style>
    .SuggestedArticlesContainer {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>