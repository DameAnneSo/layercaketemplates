<script>
  import { getContext } from 'svelte'
  import { Svg } from 'layercake'

  const { data, xGet, yGet, xScale, yScale, width, height, custom } = getContext('LayerCake')
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

<style>
</style>
