<script>
    export let appointment;
    let id = appointment.id;
    let appointmentDate = new Date(appointment.dateTime);
    let day = appointmentDate.toLocaleDateString([], {day: "numeric"});
    let month = appointmentDate.toLocaleDateString([], {month: "long"});
    let time = appointmentDate.toLocaleTimeString([], {hour: "numeric", minute: "2-digit"});
    let clinic = appointment.clinic;
    let doctor = appointment.doctor;
    let vaccine = appointment.vaccine;
    export let status;
</script>

<div class="VaccineDetailCard">
    <span class={"Date " + status}>
        <h1>{day}</h1>
        <h4>{month.toUpperCase()}</h4>
    </span>
    <span class="CardContentArea">
        <div>
            <h4>{clinic}</h4>
            <p>{time}</p>
        </div>
        <p>{doctor}</p>
        <h4>{vaccine}</h4>
        
    </span>
</div>

<style>
    .VaccineDetailCard {
        border-radius: var(--radius-large);
        border: solid 1px var(--color-border);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .Date {
        border-radius: var(--radius-small);
        border: solid 1px var(--color-border);
        height: 6rem;
        /* background-color: var(--color-disabled); */
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        height: min-content;
    }
    .Date {
        font-size: var(--font-huge);
        font-weight: 500;
        /* margin-top: 0.6rem; */
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
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
    .CardContentArea > div > h4::before {
        content: "at ";
        font-weight: 300;
    }
    .CardContentArea > div > h4 {
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
        margin: 0;
        padding: 0;
    }
    .CardContentArea > h4::before {
        content: "Vaccine ";
        font-size: var(--font-l);
        font-weight: 300;
    }
    .CardContentArea > h4 {
        font-size: var(--font-xl);
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
