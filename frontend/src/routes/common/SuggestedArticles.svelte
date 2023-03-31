<script>
    import Article from './Article.svelte';
    const articles = [
        {
            Type: "Nutrition",
            Title: "Wet vs Dry Food",
            Body: "When it comes to food, there are so many options ...",
            Imgsrc: "./zarun.png",
        },
        {
            Type: "Nutrition",
            Title: "Wet vs Dry Food",
            Body: "When it comes to food, there are so many options ...",
            Imgsrc: "./zarun.png",
        },
        {
            Type: "Nutrition",
            Title: "Wet vs Dry Food",
            Body: "When it comes to food, there are so many options ...",
            Imgsrc: "./profile.svg",
        },
        {
            Type: "Nutrition",
            Title: "Wet vs Dry Food",
            Body: "When it comes to food, there are so many options ...",
            Imgsrc: "./bookmark-unchecked.svg",
        },
        {
            Type: "Nutrition",
            Title: "Wet vs Dry Food",
            Body: "When it comes to food, there are so many options amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus",           Imgsrc: "./zarun.png",
        },
    ];
</script>

<div class="SuggestedArticlesContainer">
    {#each articles as {Type, Title, Body, Imgsrc}, i}
        <Article type={Type} title={Title} body={Body} src={Imgsrc} />
    {/each}
</div>

<style>
    .SuggestedArticlesContainer {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>