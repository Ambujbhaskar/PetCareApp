<script>
  import { validate_component } from "svelte/internal";
  import { onMount } from "svelte";
  import Input from "./Input.svelte";

  let avatar = "",
    fileinput;
  let name = "";
  let lastSeen = "";
  let dateMissing = "";
  let day = "";
  let month = "";
  let year = "";
  let notes = "";
  let reward = "";

  let nameError, lastSeenError, dateMissingError, rewardError;
  let errors = {};
  let touchedFields = {};

  const onFileSelected = (e) => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      avatar = e.target.result;
    };
  };

  $: result = {
    name,
    lastSeen,
    dateMissing: day + "-" + month + "-" + year,
    notes,
    reward,
    image: avatar,
  };

  $: errors = validate(touchedFields, result);

  function scrollIntoView({ target }) {
    const el = document.querySelector("#name");

    if (!el) return;
    el.scrollIntoView({
      behavior: "smooth",
    });
  }

  // validation of date
  function isValidDate(dateString) {
    const dateObj = new Date(dateString);

    // Check if the resulting date matches the input string
    const parts = dateString.split("/");
    const inputMonth = parseInt(parts[0], 10);
    const inputDay = parseInt(parts[1], 10);
    const inputYear = parseInt(parts[2], 10);
    const maxDays = new Date(inputYear, inputMonth, 0).getDate(); // maximum days in inputMonth
    if (inputDay !== dateObj.getDate()) {
      // Invalid day
      return `Invalid day '${inputDay}'. Please enter a valid day between 1 and ${maxDays}.`;
    }
    if (inputMonth !== dateObj.getMonth() + 1) {
      // Invalid month
      return `Invalid month '${inputMonth}'. Please enter a valid month between 1 and 12.`;
    }
    if (inputYear !== dateObj.getFullYear()) {
      // Invalid year
      return `Invalid year '${inputYear}'. Please enter a valid year.`;
    }
    // Check if date is greater than current date
    const currentDate = new Date();
    if (dateObj.getTime() > currentDate.getTime()) {
      // Invalid date
      return "The date cannot be greater than the current date.";
    }

    // Valid date
    return "";
  }

  const validate = () => {
    const errors = {};
    console.log(touchedFields.reward, reward, isNaN(reward));
    if (touchedFields.name && (name === "" || /\d/.test(name))) {
      if (name === "") {
        scrollIntoView({ target: "#name" });
        errors.name = "Name is required";
      } else if (/\d/.test(name)) {
        scrollIntoView({ target: "#name" });
        errors.name = "Name shouldn't have integer: Eg 'Tommy', not 'Tommy 2'";
      }
    } else if (touchedFields.lastSeen && lastSeen === "") {
      if (lastSeen === "") {
        scrollIntoView({ target: "#last-seen" });
        errors.lastSeen = "last-seen your pet field is required";
      }
    } else if (
      touchedFields.day &&
      touchedFields.month &&
      touchedFields.year &&
      (day === "" ||
        isNaN(day) ||
        month === "" ||
        isNaN(month) ||
        year === "" ||
        isNaN(year) ||
        isValidDate(month + "/" + day + "/" + year) !== "")
    ) {
      if (day === "" || month === "" || year === "") {
        scrollIntoView({ target: "#date" });
        errors.date = "Please let us know from what date, your pet is missing.";
      }
      if (isNaN(day) || isNaN(month) || isNaN(year)) {
        scrollIntoView({ target: "#date" });
        errors.date = "Please enter valid date - Must be a number.";
      }
      if (isValidDate(month + "/" + day + "/" + year) !== "") {
        scrollIntoView({ target: "#date" });
        errors.date = isValidDate(month + "/" + day + "/" + year);
      }
    } else if (touchedFields.reward && (reward === "" || isNaN(reward))) {
      console.log(reward);
      if (reward === "") {
        scrollIntoView({ target: "#reward" });
        errors.reward = "reward field is required";
      }
      if (isNaN(reward)) {
        scrollIntoView({ target: "#reward" });
        errors.reward = "reward must be a number!!";
      }
    } else if (touchedFields.image && avatar === "") {
      if (avatar === "") {
        scrollIntoView({ target: "#image" });
        errors.image = "Please upload your pet image!";
      }
    }

    return errors;
  };

  const validateAndSubmit = (e) => {
    touchedFields = {
      name: true,
      lastSeen: true,
      day: true,
      month: true,
      year: true,
      reward: true,
      image: true,
    };
    if (!Object.keys(errors).length) {
      console.log(result);
    }
  };
</script>

<section>
  <img src="/form_img.png" alt="cat icon" class="w-full" />
  <form
    class="flex flex-col gap-3 ml-1 mt-4"
    on:submit|preventDefault={(e) => validateAndSubmit(e)}
  >
    <span id="name" class="text-[1.2rem]">Name</span>
    <Input
      type="text"
      bind:value={name}
      on:blur={() => (touchedFields.name = true)}
      error={errors.name}
      placeholder="Enter the name of the pet"
      className="outline-none border-[0.13rem] rounded-[0.6rem] p-2 border-black/30"
    />

    <label id="last-seen" class="text-[1.2rem]">Last seen</label>
    <Input
      type="text"
      placeholder="Last Known Location"
      bind:value={lastSeen}
      error={errors.lastSeen}
      on:blur={() => (touchedFields.lastSeen = true)}
      className="outline-none border-[0.13rem] rounded-[0.6rem] p-2 border-black/30"
    />

    <label id="date" class="text-[1.2rem]">Date missing</label>
    <div class="flex flex-auto text-[0.8rem]">
      <input
        type="text"
        placeholder="DAY"
        bind:value={day}
        on:blur={() => (touchedFields.day = true)}
        class="w-1/4 outline-none border-[0.13rem] rounded-[0.6rem] p-2 border-black/30 text-center"
      />
      <input
        type="text"
        placeholder="MONTH"
        bind:value={month}
        on:blur={() => (touchedFields.month = true)}
        class="ml-2 mr-2 w-2/4 outline-none border-[0.13rem] rounded-[0.6rem] p-2 border-black/30 text-center"
      />
      <input
        type="text"
        placeholder="YEAR"
        bind:value={year}
        on:blur={() => (touchedFields.year = true)}
        class=" w-1/4 outline-none border-[0.13rem] rounded-[0.6rem] p-2 border-black/30 text-center"
      />
    </div>
    {#if errors.date}
      <span class="text-red-500">* {errors.date}</span>
    {/if}

    <label class="text-[1.2rem]">Notes</label>
    <textarea
      placeholder="Information that could help recognize your PET!!"
      bind:value={notes}
      class="outline-none border-[0.13rem] h-[7rem] rounded-[0.6rem] p-2 border-black/30"
    />

    <label id="reward" class="text-[1.2rem]">Reward</label>
    <input
      type="text"
      placeholder="Enter the reward amount"
      bind:value={reward}
      on:blur={() => (touchedFields.reward = true)}
      class="outline-none border-[0.13rem] rounded-[0.6rem] p-2 border-black/30"
    />
    {#if errors.reward}
      <span class="text-red-500">* {errors.reward}</span>
    {/if}

    <label id="image" class="text-[1.2rem]">Upload pictures</label>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="w-full h-[11rem] border-[0.13rem] border-black/30 rounded-[0.6rem] flex items-center justify-center cursor-pointer"
    >
      {#if avatar}
        <div class="flex justify-evenly flex-auto items-center p-4">
          <div
            class="w-1/2 h-[9rem] border-none rounded-[1.2rem] border-black/30 flex flex-auto bg_image bg-cover bg-center bg-no-repeat"
            style={avatar ? `--avatar: url(${avatar})` : ""}
          />
          <div class="flex flex-col w-1/2 ml-6">
            <div
              class="border-[0.12rem] border-black/40 px-3 py-1 flex justify-center items-center rounded-[1.2rem] mb-3"
              on:click={() => {
                fileinput.click();
              }}
            >
              <img src="/retake.svg" alt="retake" class="mr-3" />
              Retake
              <input
                style="display:none"
                type="file"
                accept=".jpg, .jpeg, .png"
                on:change={(e) => onFileSelected(e)}
                on:blur={() => (touchedFields.image = true)}
                bind:this={fileinput}
              />
            </div>
            <div
              class="border-[0.12rem] border-black/40 px-3 py-1 flex justify-center items-center rounded-[1.2rem]"
              on:click={() => {
                avatar = "";
              }}
            >
              <img src="/remove.svg" alt="remove" class="mr-3" />
              Remove
            </div>
          </div>
        </div>
      {:else}
        <div
          class="flex flex-col items-center gap-2"
          on:click={() => {
            fileinput.click();
          }}
        >
          <img src="/upload.svg" alt="upload icon" class="w-10" />
          <div class="text-[0.9rem]">Upload Image</div>
          <input
            style="display:none"
            type="file"
            accept=".jpg, .jpeg, .png"
            on:change={(e) => onFileSelected(e)}
            on:blur={() => (touchedFields.image = true)}
            bind:this={fileinput}
          />
        </div>
      {/if}
    </div>
    {#if errors.image}
      <span class="text-red-500">* {errors.image}</span>
    {/if}
    <button
      class="mt-2 border-2 border-black rounded-[1rem] text-[1.3rem] w-full py-1 bg-[var(--color-request)] flex justify-center items-center text-white]"
      ><img src="/tick.svg" alt="Tick" class="mr-2" />Done</button
    >
  </form>
</section>

<style>
  .bg_image {
    background-image: var(--avatar);
  }
</style>
