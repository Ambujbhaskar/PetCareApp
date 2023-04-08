<script>
    export let id = 1;
    export let day = 17;
    export let month = "March";
    export let clinic = "Frendicoes";
    export let doctor = "Dr. Padam";
    export let time = "5:00 PM";
    export let status = "Next";
</script>

<a href={`/vaccine/${id}`} class="VaccineCard">
    <span class={"Date " + status}>
        <h1>{day}</h1>
        <h4>{month.toUpperCase()}</h4>
    </span>
    <span class="CardContentArea">
        <h4>{clinic}</h4>
        <p>{doctor}</p>
        <div>
            <p>{time}</p>
        </div>
    </span>
</a>

<style>
    .VaccineCard {
        border-radius: var(--radius-large);
        border: solid 1px var(--color-border);
        padding: 1rem;
        height: 8rem;
        display: flex;
    }
    .Date {
        border-radius: var(--radius-small);
        border: solid 1px var(--color-border);
        height: 6rem;
        width: 7rem;
        /* background-color: var(--color-disabled); */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .Date > h1 {
        font-size: var(--font-huge);
        line-height: var(--font-huge);
        /* margin-top: 0.6rem; */
    }
    .Date > h4 {
        font-size: var(--font-m);
        font-weight: 700;
        /* margin-top: -0.6rem; */
    }

    .Next {
        background-color: var(--color-disabled);
        color: #000000;
    }
    .Upcoming {
        background-color: var(--color-request);
        color: #ffffff;
    }
    .Missed {
        background-color: #1b1b1b;
        color: #ffffff;
    }
    .Completed {
        background-color: #1b1b1b;
        color: #ffffff;
    }

    .CardContentArea {
        margin-left: 1rem;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
    .CardContentArea > h4::before {
        content: "at ";
        font-weight: 300;
    }
    .CardContentArea > h4 {
        font-size: var(--font-xl);
        font-weight: 700;
    }
    .CardContentArea > p::before {
        content: "with ";
        font-weight: 300;
    }
    .CardContentArea > p {
        font-size: var(--font-l);
        font-weight: 500;
    }
    .CardContentArea > div {
        flex-grow: 1;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
    }
    .CardContentArea > div > p {
        font-style: italic;
        font-size: var(--font-m);
        font-weight: 500;
    }
</style>
