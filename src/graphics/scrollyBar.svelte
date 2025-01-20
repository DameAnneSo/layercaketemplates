<script>
  import { getContext } from "svelte";
  import { Svg } from "layercake";
  import { step } from "../stores/commonStores.js";
  import { tooltipDatum } from "../stores/tooltipStore.js";
  const { data, xGet, yGet, xScale, yScale, custom } = getContext("LayerCake");

  function getFillColor(index, $step) {
    if ($step === 1) {
      return "var(--clr-primary-3)";
    } else if (($step === 2 && index === 1) || ($step === 2 && index === 0)) {
      return "var(--clr-primary-3)";
    } else if ($step === index + 1) {
      return "var(--clr-primary-3)";
    } else {
      return "var(--clr-primary-8)";
    }
  }

  export let labels = true;
</script>

<Svg>
  <g class="bar-group">
    {#each $data as d, i}
      <rect
        class="group-rect"
        data-id={i}
        x={$xScale.range()[0]}
        y={$yGet(d)}
        height={$yScale.bandwidth()}
        width={$xGet(d)}
        fill={getFillColor(i, $step)}
      ></rect>
    {/each}
  </g>

  {#if labels}
    <g class="labels">
      {#each $data as d, i}
        <text
          class="label"
          x={$xGet(d) - 5}
          y={$yGet(d) + $yScale.bandwidth() / 2}
          alignment-baseline="middle"
          text-anchor="end"
        >
          {$custom.labelFunction(d)}
        </text>
      {/each}
    </g>
  {/if}
</Svg>

<style>
  .label {
    fill: var(--clr-primary-5);
    font-size: 0.8rem;
    font-family: var(--ff-secondary);
  }

  rect {
    transition: fill 1s ease-in;
  }
</style>