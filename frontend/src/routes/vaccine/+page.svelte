<script>
    import appointments from "$lib/data/appointments.json";
    
	import { getAppointmentStatus } from "../common/util.js";

	let nextAppointment = appointments.reduce((acc, curr) => {
		const status = getAppointmentStatus(curr);
		if (status == "Next") {
			acc = curr;
		}
		return acc;
	}, null);

    if (nextAppointment != null) {
        console.log(nextAppointment.id);
        window.location.href = `/vaccine/${nextAppointment.id}`;
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