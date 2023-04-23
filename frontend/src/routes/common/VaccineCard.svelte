<script>
    export let appointment;
    export let status;
    $: id = appointment.id;
    $: appointmentDate = new Date(appointment.date_time);
    // $: console.log("DEEZ", appointmentDate.toLocaleDateString([], { day: "numeric" }));
    $: day = appointmentDate.toLocaleDateString([], { day: "numeric" });
    $: month = appointmentDate.toLocaleDateString([], { month: "long" });
    $: time = appointmentDate.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });
    $: clinic = appointment.clinic_name;
    $: doctor = appointment.doctor_name;
</script>

<a href={`/vaccine/${id}`} class={"VaccineCard"}>
    <span class={"Date " + (appointment.completed ? "Completed" : status)}>
        <h1>{day}</h1>
        <h4>{month.toUpperCase()}</h4>
    </span>
    <span class="CardContentArea">
        <h4>{clinic}</h4>
        <p>{doctor}</p>
        <div>
            <h4 class={(appointment.completed ? "Completed" : status) + "Text"}>
                {appointment.completed ? "Completed" : status}
            </h4>
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
    .MissedText {
        color: red;
    }
    .Completed {
        background-color: #b7b7b7;
        color: #ffffff;
    }
    .CompletedText {
        color: green;
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
        word-break: break-all;
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
        justify-content: space-between;
        align-items: flex-end;
    }
    .CardContentArea > div > p {
        font-style: italic;
        font-size: var(--font-m);
        font-weight: 500;
    }
</style>
