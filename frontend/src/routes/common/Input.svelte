<script>
  export let type = "text";
  export let value = type === "text" ? "" : null;
  export let error = "";
  export let placeholder = "";
  export let className = "";

  function handleInput({ target: t }) {
    if (type === "number") {
      value = t.value === "" ? null : t.valueAsNumber;
    } else {
      value = t.value;
    }
  }
</script>

<section class="flex flex-col gap-3">
  <input
    class={className}
    class:error
    {type}
    {placeholder}
    {value}
    on:input={handleInput}
    on:input
    on:blur
  />
  {#if error}
    <span class="text-red-500">* {error}</span>
  {/if}
</section>
