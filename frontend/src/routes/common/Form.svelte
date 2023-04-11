<script>
  let avatar, fileinput;
  let name, lastSeen, dateMissing, day, month, year, notes, reward;

  $: result = {
    name,
    lastSeen,
    dateMissing: day + "-" + month + "-" + year,
    notes,
    reward,
    image: avatar,
  };

  const onFileSelected = (e) => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      avatar = e.target.result;
    };
  };

  const handleSubmit = (e) => {
    console.log(result);
    e.target.reset();
  };
</script>

<section>
  <img src="/form_img.png" alt="cat icon" class="w-full" />
  <form
    class="flex flex-col gap-3 ml-1 mt-4"
    on:submit|preventDefault={(e) => handleSubmit(e)}
  >
    <label class="text-[1.2rem]">Name</label>
    <input
      type="text"
      placeholder="Enter the name of the pet"
      bind:value={name}
      class="outline-none border-[0.13rem] rounded-[0.6rem] p-2 border-black/30"
    />
    <label class="text-[1.2rem]">Last seen</label>
    <input
      type="text"
      placeholder="Last Known Location"
      bind:value={lastSeen}
      class="outline-none border-[0.13rem] rounded-[0.6rem] p-2 border-black/30"
    />
    <label class="text-[1.2rem]">Date missing</label>
    <div class="flex flex-auto text-[0.8rem]">
      <input
        type="text"
        placeholder="DAY"
        bind:value={day}
        class="w-1/4 outline-none border-[0.13rem] rounded-[0.6rem] p-2 border-black/30 text-center"
      />
      <input
        type="text"
        placeholder="MONTH"
        bind:value={month}
        class="ml-2 mr-2 w-2/4 outline-none border-[0.13rem] rounded-[0.6rem] p-2 border-black/30 text-center"
      />
      <input
        type="text"
        placeholder="YEAR"
        bind:value={year}
        class=" w-1/4 outline-none border-[0.13rem] rounded-[0.6rem] p-2 border-black/30 text-center"
      />
    </div>

    <label class="text-[1.2rem]">Notes</label>
    <textarea
      placeholder="Information that could help recognize your PET!!"
      bind:value={notes}
      class="outline-none border-[0.13rem] h-[7rem] rounded-[0.6rem] p-2 border-black/30"
    />

    <label class="text-[1.2rem]">Reward</label>
    <input
      type="text"
      placeholder="Enter the reward amount"
      bind:value={reward}
      class="outline-none border-[0.13rem] rounded-[0.6rem] p-2 border-black/30"
    />

    <label class="text-[1.2rem]">Upload pictures</label>

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
            bind:this={fileinput}
          />
        </div>
      {/if}
    </div>
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
