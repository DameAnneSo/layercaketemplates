<script>
  import { getContext } from "svelte";
  import { Svg } from "layercake";
  import { tooltipDatum } from "../stores/tooltipStore.js";

  const { data, xGet, yGet, xScale, yScale, custom } = getContext("LayerCake");

  export let labels = true;
</script>

<Svg label={$custom.ariaLabel}>
  <g class="col-group">
    {#each $data as d, i}
      <rect
        class="group-rect"
        data-id={i}
        x={$xGet(d)}
        y={$yGet(d)}
        height={$yScale(0) - $yGet(d)}
        width={$xScale.bandwidth()}
        fill={$custom.colorFunction(d)}
        on:mouseover={() => {
          $tooltipDatum = d;
          $tooltipDatum.id = $custom.tooltipId;
        }}
        on:mouseout={() => ($tooltipDatum = undefined)}
        on:focus={() => {
          $tooltipDatum = d;
          $tooltipDatum.id = $custom.tooltipId;
        }}
        on:blur={() => ($tooltipDatum = undefined)}
      />
    {/each}
  </g>

  {#if labels}
    <g class="labels">
      {#each $data as d, i}
        <text
          class="label"
          x={$xGet(d) + $xScale.bandwidth() / 2}
          y={$yGet(d) - 5}
          text-anchor="middle"
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