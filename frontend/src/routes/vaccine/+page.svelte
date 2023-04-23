<script>
    import { user, pet, URL } from "$lib/stores";
    import axios from "axios";
    import { goto } from "$app/navigation";

    import { getAppointmentStatus } from "../common/util.js";
    import { onMount } from "svelte";
    
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

	$: petObj = petsArr.filter(p => p._id == $pet)?.[0] || {appointments: []};
	$: petApts = petObj.appointments;

	$: nextPetAppointment = petApts.reduce((acc, curr) => {
		const status = getAppointmentStatus(curr, petApts);
		if (status == "Next") {
			acc = curr;
		}
		return acc;
	}, null);
	$: console.log("NEXT", nextPetAppointment);

    $: {
        if (nextPetAppointment != null) {
            goto(`/vaccine/${nextPetAppointment._id}`);
        }
    } 
</script>

<div>
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src={"/empty-vaccines.svg"} />
    <button
        class="FloatingButton"
        on:click={() => {
            goto("/vaccine/addVaccineSchedule");
        }}
    >
        <img src="/add-icon.png" alt="Add Icon" class="FloatingButtonImg" />
        <p>Add vaccine schedule</p>
    </button>
</div>

<style>
    div {
        display: flex;
        justify-content: center;
        align-items: center;
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
</style>
