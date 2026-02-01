<script>
export let colorScale;
export let data;
import { format } from "d3-format";
import { fade } from "svelte/transition";

const minColor = colorScale.range()[0];
const maxColor = colorScale.range()[1];

const minValue = colorScale.domain()[0];
const maxValue = colorScale.domain()[1];

const formatValue = (d) => d.toFixed(2);

$: percentOfMax = (data?.cat_per_capita / maxValue) * 100;
</script>

<div class="legend" aria-hidden="true">
  <span class="label">0</span>
  <div
    class="bar"
    style:background="linear-gradient(to right, {colorScale.range()[0]} 0%, {colorScale.range()[1]}
    100%)"
  >
    {#if percentOfMax}
      <span class="line" style:left="{percentOfMax}%" transition:fade></span>
    {/if}
  </div>

  <span class="label">
    {formatValue(colorScale.domain()[1])}
    <span class="label-unit">cats per hooman</span>
  </span>
</div>

<style>
.legend {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 95%;
  max-width: min(600px, 50vw);
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
}

.bar {
  height: clamp(12px, 2vh, 18px);
  width: 100%;
  position: relative;
}

.label {
  display: inline-flex;
  align-items: center;
  font-size: clamp(0.7rem, 1.5vw, 1rem);
  color: var(--clr-grey-2);
  user-select: none;
  white-space: nowrap;
}

.label-unit {
  margin-left: 2px;
  font-size: clamp(0.7rem, 1.5vw, 1rem);
}

.line {
  position: absolute;
  top: 0;
  height: 100%;
  width: 2px;
  background: var(--clr-primary-1);
  transition: left 500ms cubic-bezier(1, 0, 0, 1);
}
</style>
