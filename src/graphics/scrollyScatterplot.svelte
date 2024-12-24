<script>
  import { getContext } from "svelte";
  import { Svg } from "layercake";
  import { step } from "../stores/commonStores.js";
  const { data, xGet, yGet, custom } = getContext("LayerCake");

		export let labels = true;
</script>

<Svg>
  <!-- <rect width="100%" height="100%" fill="beige"> </rect> -->
  <g>
    {#each $data as d, i}
      <circle
        cx={$xGet(d)}
        cy={$yGet(d)}
        fill={$custom.colorFunction(d)}
        fill-opacity={$step === 0 ? 0.2 : i + 1 === $step ? 1 : 0.2}
        r={$step === 0 ? 5 : i + 1 === $step ? 10 : 5}
      ></circle>
    {/each}
  </g>

  <g class="labels">
    {#if labels}
      {#each $data as d}
        <text class="label" x={$xGet(d)} y={$yGet(d) - 15} text-anchor="middle">
          {d.key}: {d.value}
        </text>
      {/each}
    {/if}
  </g></Svg
>

<style>
  circle {
    transition:
      r 0.5s ease-in,
      fill-opacity 1s ease-in;
  }

  .label {
    fill: var(--clr-primary-5);
    font-size: 0.8rem;
    font-family: var(--ff-secondary);
  }
</style>
