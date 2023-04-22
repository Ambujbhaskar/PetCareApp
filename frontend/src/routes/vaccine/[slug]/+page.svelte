<script>
    import { goto } from "$app/navigation";
    import { pet, user, URL } from "$lib/stores.js";

    import VaccineDetailCard from "../VaccineDetailCard.svelte";
    import VaccineCard from "../../common/VaccineCard.svelte";
    import Dropdown from "../../common/Dropdown.svelte";

    import { getAppointmentStatus, vaccineComparator } from "../../common/util";
    import { onMount } from "svelte";

    /** @type {import('./$types').PageData} */
    export let data;
    
	let userObject = {};
	let petsArr = [];
	let petObj = {};
	let petApts = [];
    onMount(async () => {
		await axios
			.get($URL + "/user", {
				headers: {
					authentication: `Bearer ${sessionStorage.getItem(
						"user-token"
					)}`,
				},
			})
			.then((res) => {
				userObject = res.data;
				petsArr = userObject.pets;
				petObj = petsArr[0];
				petApts = petObj.appointments;
			})
			.catch((err) => {
				console.log(err);
			});
	});
	petObj = petsArr.filter(p => p._id == $pet)?.[0] || {appointments: []};
	petApts = petObj.appointments;

    $: petApts = [...$user.pets[$pet].appointments];
    $: app = petApts.filter((a) => (a._id == [data._id]))[0];
    $: console.log(app, petApts, "AAAAAAAAAAAAAA");
    $: status = getAppointmentStatus(app, petApts);
    
    let view = "Upcoming";
    $: viewableAppointmentList = petApts
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
    <Dropdown options={$user.pets} value={$pet} />
    <VaccineDetailCard appointment={app} {status} />
    <br>
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
            {#if !(appointment.id == app.id)}
                <VaccineCard
                    {appointment}
                    status={getAppointmentStatus(appointment, apts)}
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
        <img
            src="/add-icon.png"
            alt="Add Icon"
            class="FloatingButtonImg"
        />
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
        width: 25%;
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
        background-color: var(--color-enabled);
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 3rem;
        width: 15rem;
        color: black;
        border-radius: 1.5rem;
        border: solid 2px #1b1b1b;
        font-size: var(--font-xl);
        box-shadow: #1b1b1b 0px 1px 1px;
    }
    .VaccinePage::-webkit-scrollbar {
        display: none;
    }
</style>
