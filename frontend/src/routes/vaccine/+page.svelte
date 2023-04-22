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

	petObj = petsArr.filter(p => p._id == $pet)?.[0] || {appointments: []};
	petApts = petObj.appointments;

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
</div>

<style>
    div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
