<script>
  import { getContext, createEventDispatcher } from "svelte";
  import { Svg } from "layercake";
  // import { stack } from 'd3-shape'
  // import { index } from 'd3-array'
  import { scaleBand } from "d3-scale";

  const { data, xGet, yGet, xScale, yScale, width, height, custom } =
    getContext("LayerCake");

  const dispatch = createEventDispatcher();
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
        fill={$custom.colorFunction(d)}
      />
    {/each}
  </g>
</Svg>
