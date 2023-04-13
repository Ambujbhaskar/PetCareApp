<script>
    import VaccineDetailCard from "../../common/VaccineDetailCard.svelte";
    import VaccineCard from "../../common/VaccineCard.svelte";
    import Dropdown from "../../common/Dropdown.svelte";
    
    import profiles from "$lib/data/pets.json";
    import appointments from "$lib/data/appointments.json";

    import { getAppointmentStatus, vaccineComparator } from "../../common/util";

    /** @type {import('./$types').PageData} */
    export let data;
    $: status = getAppointmentStatus(data);

    let selectedProfile = 0;
    let view = "Upcoming";
    $: viewableAppointmentList = appointments.sort(vaccineComparator).filter((apt, i) => {
        if (view == "Past") {
            return new Date(apt.dateTime) < new Date();
        } else {
            return new Date(apt.dateTime) > new Date();
        }
    });
</script>

<section>
    <Dropdown
        options={profiles}
        value={selectedProfile}
    />
    <VaccineDetailCard
        appointment={data}
        {status}
    />
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
                    appointment={appointment}
                    status={getAppointmentStatus(appointment)}
                />
            {/if}
        {/each}
    </section>
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
</style>
