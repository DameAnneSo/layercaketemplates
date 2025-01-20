<script>
  import { mousePosition, tooltipDatum } from "../stores/tooltipStore.js";
  export let tooltipId;
  console.log(tooltipId);
</script>

{#if $tooltipDatum && tooltipId === $tooltipDatum.id}
  <div
    class="tooltip"
    style:left={$mousePosition.x + 5 + "px"}
    style:top={$mousePosition.y + 15 + "px"}
  >
    <slot tooltipDatum={$tooltipDatum}></slot>
  </div>
{/if}

<style>
  .tooltip {
    position: absolute;
    z-index: 10;
    background: var(--clr-primary-8);
    color: var(--clr-primary-1);
    padding: 0.5rem;
    border-radius: var(--radius);
    box-shadow: var(--dark-shadow);
  }
</style>
