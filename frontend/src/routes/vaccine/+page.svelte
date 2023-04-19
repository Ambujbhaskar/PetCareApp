<script>
    import { user, pet } from "$lib/stores";
    import { goto } from "$app/navigation";

    import { getAppointmentStatus } from "../common/util.js";
    
    $: apts = $user.pets[$pet].appointments;
    $: nextAppointment = apts.reduce((acc, curr) => {
        const status = getAppointmentStatus(curr, apts);
        if (status == "Next") {
            acc = curr;
        }
        return acc;
    }, null);
    $: {
        if (nextAppointment != null) {
            goto(`/vaccine/${nextAppointment.id}`);
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
