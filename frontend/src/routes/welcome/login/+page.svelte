<script>
    import { goto } from "$app/navigation";
    import { URL } from "$lib/stores";
    import axios from "axios";

    let formData = {
        email: "",
        password: "",
    };
    let errorState = false;

    async function handleSubmit() {
        if (formData.password.length < 8 || formData.email.length == 0) {
            errorState = true;
            formData = {
                email: "",
                password: "",
            };
            return;
        }
        axios
            .post($URL + "/account/login", formData)
            .then((res) => {
                console.log(res);
                errorState = false;
                sessionStorage.setItem("user-token", res.data.token);
                goto("/");
                return res;
            })
            .catch((err) => {
                console.log(err);
                formData = {
                    email: "",
                    password: "",
                };
                errorState = true;
            });
    }
</script>

<section class="Paper">
    <section>
        <div>
            <!-- svelte-ignore a11y-missing-attribute -->
            <img src="/login-header.svg" />
        </div>
        <h4>Email address</h4>
        <input
            placeholder="ENTER YOUR EMAIL ADDRESS"
            value={formData.email}
            type="text"
            on:change={(e) => {
                formData.email = e.target.value;
                errorState = false;
            }}
        />
        <h4>Enter your password</h4>
        <input
            placeholder="ENTER YOUR PASSWORD"
            value={formData.password}
            type="password"
            on:change={(e) => {
                formData.password = e.target.value;
                errorState = false;
            }}
        />
        <p class={"ErrorText " + (errorState ? "enabled" : "")}>
            Invalid email or password
        </p>
    </section>

    <button on:click={handleSubmit}>
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src="/done-enabled.svg" />
        Done
    </button>
</section>

<style>
    .Paper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: white;
        z-index: 2;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: start;
        margin: 0;
        padding: 1rem;
    }
    .Paper > section {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        gap: 1rem;
        margin: 0;
    }
    .Paper > section > div {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3rem;
    }
    .Paper > section > input {
        height: 2rem;
        border-radius: 0.5rem;
        border: solid 1px #1b1b1b;
        width: 100%;
        padding-left: 1rem;
        font-size: var(--font-m);
    }
    .ErrorText {
        display: none;
        color: red;
        align-self: center;
    }
    .enabled {
        display: block;
    }
    .Paper > button {
        width: 100%;
        height: 2rem;
        border-radius: 1rem;
        border: solid 1px #1b1b1b;
        background-color: var(--color-disabled);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        justify-self: end;
    }
</style>
