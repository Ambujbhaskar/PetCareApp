<script>
    import VaccineDetailCard from "../../common/VaccineDetailCard.svelte";
    import { getAppointmentStatus } from "../../common/util";

    import profiles from "$lib/data/pets.json";
    import Dropdown from "../../common/Dropdown.svelte";


    /** @type {import('./$types').PageData} */
    export let data;

    let selectedProfile = 0;
    const status = getAppointmentStatus(data);
</script>

<section>
	<Dropdown options={profiles} value={selectedProfile} />
    <VaccineDetailCard 
        appointment={data}
        status={status}
    />
</section>

<style>

</style>