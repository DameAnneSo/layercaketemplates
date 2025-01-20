<script>
  import { getContext } from "svelte";
  import { Svg } from "layercake";
  import { tooltipDatum } from "../stores/tooltipStore.js";

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
    {#each $data as d}
      <circle
        cx={$xGet(d)}
        cy={$yGet(d)}
        r="5"
        fill={$custom.colorFunction(d)}
        on:mouseover={() => {
          $tooltipDatum = d;
          $tooltipDatum.id = $custom.tooltipId;
        }}
        on:mouseout={() => ($tooltipDatum = undefined)}
        on:focus={() => ($tooltipDatum = d)}
        on:blur={() => ($tooltipDatum = undefined)}
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
</style>
