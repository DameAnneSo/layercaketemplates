<script>
import { mousePosition, tooltipDatum } from "../stores/tooltipStore.js";
export let tooltipId;
import { fly } from "svelte/transition";

// import { getContext } from "svelte";
// import { LayerCake } from "layercake";
// const { data, xScale, yScale, width, height, custom } =
//     getContext("LayerCake");
//   $: $width, $height, $data;

// let tooltipWidth; 
// $: isFallingOffChart = tooltipWidth + x > width;
// $: xPosition = isFallingOffChart ? x - tooltipWidth - xNudge : x + xNudge;
// $: yPosition = y + yNudge; -->
const xNudge = 15;
const yNudge = 20;

</script>

{#if $tooltipDatum && tooltipId === $tooltipDatum.id}
  <div
    in:fly={{ x: 0, y: -20, duration: 300 }}
    out:fly={{ x: 0, y: 20, duration: 300 }}
    class="tooltip"
    style:left={$mousePosition.x + xNudge + "px"}
    style:top={$mousePosition.y + yNudge + "px"}
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
  padding: 0.7rem;
  border-radius: var(--radius);
  box-shadow: var(--dark-shadow);
}

/* Target paragraphs inside tooltips to remove extra margin */
:global(.tooltip p) {
  margin: 0;
}

</style>
