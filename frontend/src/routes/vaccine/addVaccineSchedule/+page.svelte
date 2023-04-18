<script>
    import { pet } from "$lib/stores.js";

    import { goto } from "$app/navigation";

    import Dropdown from "/src/routes/common/Dropdown.svelte";

    import profiles from "$lib/data/pets.json";

    let formData = { 
        clinic: "",
        doctor: "",
        date: {
            month: "",
        },
        vaccine: "", 
        vaccines: [],
    };
    $: console.log("data", formData);
</script>

<div class="AddVaccines">
    <Dropdown options={profiles} value={$pet} />
    <div class="Illustration">
        <h4>Add Vaccination Schedule</h4>
        <img src="/AddVaxScheduleGreen.png" alt="Add vaccine schedule" />
    </div>
    <h4>Clinic *</h4>
    <input
        type="text"
        placeholder="ENTER THE NAME OF CLINIC"
        value={formData.clinic}
        on:change={(e) => {
            let temp = { ...formData };
            temp.clinic = e.target.value;
            formData = temp;
        }}
    />
    <h4>Doctor *</h4>
    <input
        type="text"
        placeholder="ENTER THE NAME OF DOCTOR"
        value={formData.doctor}
        on:change={(e) => {
            let temp = { ...formData };
            temp.doctor = e.target.value;
            formData = temp;
        }}
    />
    <h4>Date *</h4>
    <div class="Date">
        <input
            type="number"
            placeholder="DAY"
            value={formData.date.day}
            on:change={(e) => {
                let temp = { ...formData };
                temp.date.day = e.target.value;
                formData = temp;
            }}
        />
        <input
            type="text"
            placeholder="MONTH"
            class="Month"
            value={formData.date.month}
            on:change={(e) => {
                let temp = { ...formData };
                temp.date.month = e.target.value;
                formData = temp;
            }}
        />
        <input
            type="number"
            placeholder="YEAR"
            value={formData.date.year}
            on:change={(e) => {
                let temp = { ...formData };
                temp.date.year = e.target.value;
                formData = temp;
            }}
        />
    </div>
    <h4>Vaccines</h4>
    <input
        type="text"
        placeholder="ENTER THE NAME OF THE VACCINE"
        value={formData.vaccine}
        on:change={(e) => {
            let temp = { ...formData };
            temp.vaccine = e.target.value;
            formData = temp;
        }}
    />
    <button
        class="AddVaccineButton"
        on:click={(e) => {
            let temp = { ...formData };
            temp.vaccines = [...temp.vaccines, temp.vaccine];
            temp.vaccine = "";
            formData = temp;
        }}
    >
        <img src="/addicon.png" alt="add icon" />
        <p>Add</p>
    </button>
    <button
        class={"DoneButton"}
        on:click={() => {
            goto("/vaccine");
        }}
    >
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src={"/tick.svg"} />
        <h4>{"Done"}</h4>
    </button>
</div>

<style>
    .Illustration {
        background-color: var(--color-enabled);
        border-radius: var(--radius-large);
        border: solid 1px #1b1b1b;
        padding: 1rem;
        padding-bottom: 0;
    }
    .AddVaccines {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    input {
        height: 2rem;
        border-radius: var(--radius-small);
        border: solid 1.5px #1b1b1b;
        padding-left: 1rem;
        font-size: var(--font-s);
    }
    .Date {
        display: flex;
        justify-content: space-between;
    }
    .Date > .Month {
        width: 10rem;
    }
    .Date > input {
        width: 5rem;
    }
    .DoneButton {
        color: white;
        background-color: var(--color-background);
        height: 2rem;
        border-radius: 1rem;
        border: solid 1px #1b1b1b;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
    }
    .AddVaccineButton > img {
        height: 0.5rem;
    }
    .AddVaccineButton {
        font-size: var(--font-s);
        width: 4rem;
        border: solid 1px #1b1b1b;
        height: 1.5rem;
        border-radius: 0.75rem;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
</style>
