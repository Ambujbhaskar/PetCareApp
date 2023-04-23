<script>
    import { pet, user, URL } from "$lib/stores.js";
    import { goto } from "$app/navigation";
    import axios from "axios";
    import Dropdown from "/src/routes/common/Dropdown.svelte";
    import { onMount } from "svelte";
    let userObject = {};
    let petsArr = [];

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
            })
            .catch((err) => {
                console.log(err);
            });
    });

    let clinics = [];
    onMount(async () => {
        await axios
            .get($URL + "/clinics", {
                headers: {
                    authentication: `Bearer ${sessionStorage.getItem(
                        "user-token"
                    )}`,
                },
            })
            .then((res) => {
                clinics = res.data;
                console.log("CLINICS", clinics);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    async function addVaccine(request) {
        axios
            .post($URL + "/appointments", request, {
                headers: {
                    authentication: `Bearer ${sessionStorage.getItem(
                        "user-token"
                    )}`,
                },
            })
            .then(goto("/"))
            .catch((err) => console.log(err));
    }

    const template = {
        clinic: "",
        doctor: "",
        date: {
            month: "",
        },
        time: "",
        vaccine: "",
        vaccines: [],
        location: {
            lat: "",
            lng: "",
        },
    };
    let formData = template;
    // $: console.log("data", formData);
</script>

<div class="AddVaccines">
    <Dropdown {petsArr} value={$pet} />
    <div class="Illustration">
        <h4>Add Vaccination Schedule</h4>
        <img src="/add-vax-schedule-green.png" alt="Add vaccine schedule" />
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
    <h4>Time</h4>
    <input
        type="text"
        placeholder="ENTER THE APPOINTMENT TIME"
        value={formData.time}
        on:change={(e) => {
            let temp = { ...formData };
            temp.time = e.target.value;
            formData = temp;
        }}
    />
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
    <div>
        {#each formData.vaccines as vax}
            <p>{vax}</p>
        {/each}
    </div>
    <button
        class="AddVaccineButton"
        on:click={(e) => {
            if (formData.vaccine == "") return;
            let temp = { ...formData };
            temp.vaccines = [...temp.vaccines, temp.vaccine];
            temp.vaccine = "";
            formData = temp;
        }}
    >
        <img src="/add-icon.png" alt="add icon" />
        <p>Add</p>
    </button>
    <button
        class={"DoneButton"}
        on:click={() => {
            if (formData == template) return;
            if (formData.vaccines.length == 0) {
                formData.vaccines = [formData.vaccine];
            }
            let temp = { ...formData };

            temp.dateTime = new Date(
                temp.date.day +
                    " " +
                    temp.date.month +
                    " " +
                    temp.date.year +
                    " " +
                    temp.time
            ).toLocaleString();
            // temp.id = ($user.pets[$pet].appointments).length,
            delete temp.vaccine;
            delete temp.date;
            temp.completed = false;

            let clinicID = clinics?.filter(cli => cli.name == temp.clinic)[0]._id;
            if (!clinicID){
                console.log("CANNOT CREATE APPOINTMENT WITH UNAFFILIATED CLINIC")
                return;
            }
            let req = {
                petId: $pet,
                completed: false,
                date_time: temp.dateTime,
                doctor_name: temp.doctor,
                clinic_id: clinicID,
                vaccines: temp.vaccines
            };
            console.log("Adding to vaccine db:", req);

            addVaccine(req);
        }}
    >
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src={"/tick.svg"} />
        <h4>{"Done"}</h4>
    </button>
</div>

<style>
    p {
        font-size: var(--font-s);
        margin: 0;
    }
    .Illustration > img {
        margin-top: -2rem;
    }
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
