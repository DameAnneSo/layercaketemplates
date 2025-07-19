<script>
import { getContext } from "svelte";
import { Svg } from "layercake";
import { tooltipDatum } from "../stores/tooltipStore.js";
import { fly } from "svelte/transition";
// Note1: Everything that you export from getContext('LayerCake') is a Svelte store so prefix them with $ in the template.
// Note2: our accessor functions and then our scale functions are stored in the LayerCake context. We can access them with $xGet and $yGet but a long way to write is to access x, xScale and then $xScale($x(d)) instead of $xGet(d) etc.
const { data, xGet, yGet, custom } = getContext("LayerCake");

export let labels = true;

// console.log($data)
// $: console.log($width, $height)
// $: console.log($tooltipDatum);
</script>

<Svg label={$custom.ariaLabel}>
  <!-- <rect width="100%" height="100%" fill="beige"> </rect> -->
  <g>
    <!-- {#each $data as d} -->
    {#each $data.sort((a, b) => a.key - b.key) as d}
    <!-- {#each data.sort((a, b) => a.key - b.key) as d} -->

    <!-- index,key,value,category -->

      <circle in:fly={{x: -10, opacity:0, duration: 500}}
        cx={$xGet(d)}
        cy={$yGet(d)}
        r="7"
        fill={$custom.colorFunction(d)}
        opacity={$tooltipDatum && $tooltipDatum !== d ? 0.45 : 1}
        tabindex="0"
        role="button"
        aria-label={`Data point: ${d.category} ${d.value}`}
        on:mouseover={() => {
          $tooltipDatum = d;
          $tooltipDatum.id = $custom.tooltipId;
        }}
        on:mouseleave={() => ($tooltipDatum = undefined)}
        on:focus={() => {
          $tooltipDatum = d;
          $tooltipDatum.id = $custom.tooltipId;
        }}
      ></circle>
    {/each}
  </g>

  <g class="labels">
    {#if labels}
      {#each $data as d}
        <text class="label" x={$xGet(d)} y={$yGet(d) - 15} text-anchor="middle">
          {$custom.labelFunction(d)}
        </text>
      {/each}
    {/if}
  </g></Svg
>

<style>
.label {
  fill: var(--clr-primary-5);
  font-size: 0.8rem;
  font-family: var(--ff-secondary);
}

circle {
  transition: r 300ms ease;
  cursor: pointer;
}

circle:hover,
circle:focus {
  r: 10;
  fill: var(--clr-primary-3);
}
</style>
