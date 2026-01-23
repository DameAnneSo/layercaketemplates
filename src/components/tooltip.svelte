<script>
import { mousePosition, tooltipDatum } from "../stores/tooltipStore.js";
export let tooltipId;
import { fly } from "svelte/transition";

let tooltipWidth;
let width;

$: isFallingOffChart = tooltipWidth + $mousePosition.x > width;
$: xPosition = isFallingOffChart ? $mousePosition.x - tooltipWidth - xNudge : $mousePosition.x + xNudge;
$: yPosition = $mousePosition.y + yNudge; 
const xNudge = 15;
const yNudge = 20;


</script>

<!-- This binds the window width to the `width` variable, allowing us to check if the tooltip is falling off the chart. -->
<svelte:window bind:innerWidth={width}/> 
{#if $tooltipDatum && tooltipId === $tooltipDatum.id}
  <div
  bind:clientWidth={tooltipWidth}
    in:fly={{ x: 0, y: -20, duration: 300 }}
    out:fly={{ x: 0, y: 20, duration: 300 }}
    class="tooltip"
    style:left={xPosition + "px"}
    style:top={yPosition + "px"}
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
  min-width:20px;
}

/* Target paragraphs inside tooltips to remove extra margin */
:global(.tooltip p) {
  margin: 0;
}

</style>
