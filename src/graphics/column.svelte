<script>
  import { getContext } from 'svelte'
  import { Svg } from 'layercake'
  import { stack } from 'd3-shape'
  import { index } from 'd3-array'

  const { data, xGet, yGet, xScale, yScale, width, height, custom } = getContext('LayerCake')
</script>

<Svg>
  <g class="col-group">
    {#each $data as d, i}
      <rect 
      class="group-rect" 
      data-id={i} 
      x={$xGet(d)} 
      y={$yGet(d)} 
      height={$yScale(0)-$yGet(d)} 
      width={$xScale.bandwidth()} 
      fill={$custom.colorFunction(d)} 
      />
    {/each}
  </g>
</Svg>
