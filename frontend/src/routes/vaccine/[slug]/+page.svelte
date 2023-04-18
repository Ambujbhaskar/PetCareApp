<script>
    import { goto } from "$app/navigation";
    import { pet } from "$lib/stores.js";
    import VaccineDetailCard from "../../common/VaccineDetailCard.svelte";
    import VaccineCard from "../../common/VaccineCard.svelte";
    import Dropdown from "../../common/Dropdown.svelte";

    import profiles from "$lib/data/pets.json";
    import appointments from "$lib/data/appointments.json";

    import { getAppointmentStatus, vaccineComparator } from "../../common/util";

    /** @type {import('./$types').PageData} */
    export let data;
    $: status = getAppointmentStatus(data);

    let view = "Upcoming";
    $: viewableAppointmentList = appointments
        .sort(vaccineComparator)
        .filter((apt, i) => {
            if (view == "Past") {
                return new Date(apt.dateTime) < new Date();
            } else {
                return new Date(apt.dateTime) > new Date();
            }
        });
</script>

<section class="VaccinePage">
    <Dropdown options={profiles} value={$pet} />
    <VaccineDetailCard appointment={data} {status} />
    <div class="HeadingLine">
        <p>{view + " appointments"}</p>
        <button
            class="ToggleViewButton"
            on:click={() => {
                view = view == "Past" ? "Upcoming" : "Past";
            }}
        >
            {view == "Past" ? "View Upcoming" : "View Past"}
        </button>
    </div>
    <section class="ViewList">
        {#each viewableAppointmentList as appointment, i}
            {#if !(appointment.id == data.id)}
                <VaccineCard
                    {appointment}
                    status={getAppointmentStatus(appointment)}
                />
            {/if}
        {/each}
    </section>
    <button
        class="FloatingButton"
        on:click={() => {
            goto("/vaccine/addVaccineSchedule");
        }}
    >
        <img src="/addiconWhite.png" alt="Add Icon" class="FloatingButtonImg" />
        <p>Add vaccine schedule</p>
    </button>
</section>

<style>
    .HeadingLine {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-size: large;
    }
    .ToggleViewButton {
        border: solid 1px #000000;
        border-radius: 0.75rem;
        height: 1.5rem;
        font-size: var(--font-s);
        width: 30%;
    }
    .ViewList {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .FloatingButton {
        z-index: 10;
        position: absolute;
        bottom: 6rem;
        right: 1rem;
        background-color: var(--color-background);
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 3rem;
        width: 15rem;
        color: white;
        border-radius: 1.5rem;
        border: solid 1.5px #1b1b1b;
        font-size: var(--font-xl);
        box-shadow: #1b1b1b 0px 1px 1px;
    }
    .VaccinePage::-webkit-scrollbar {
        display: none;
    }
</style>
