<script>
  import { getContext } from "svelte";
  import { Svg } from "layercake";
  import { tooltipDatum } from "../stores/tooltipStore.js";

  const { data, xGet, yGet, xScale, yScale, custom } = getContext("LayerCake");

  export let labels = true;
</script>

<Svg label={$custom.ariaLabel}>
  <g class="bar-group">
    {#each $data as d, i}
      <rect
        class="group-rect"
        data-id={i}
        x={$xScale.range()[0]}
        y={$yGet(d)}
        height={$yScale.bandwidth()}
        width={$xGet(d)}
        fill={$custom.colorFunction(d)}
        on:mouseover={() => {
          $tooltipDatum = d;
          $tooltipDatum.id = $custom.tooltipId;
        }}
        on:mouseout={() => ($tooltipDatum = undefined)}
        on:focus={() => ($tooltipDatum = d)}
        on:blur={() => ($tooltipDatum = undefined)}
      />
    {/each}
  </g>

  {#if labels}
    <g class="labels">
      {#each $data as d, i}
        <text
          class="label"
          x={$xGet(d) + 5}
          y={$yGet(d) + $yScale.bandwidth() / 2}
          alignment-baseline="middle"
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
</style>
