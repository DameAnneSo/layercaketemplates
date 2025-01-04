<script>
  import { getContext} from "svelte";
  import { Svg } from "layercake";

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
