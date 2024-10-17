<script>
  import { getContext } from 'svelte'
  import { Svg } from 'layercake'

  // Note1: Everything that you export from getContext('LayerCake') is a Svelte store so prefix them with $ in the template.
  // Note2: our accessor functions and then our scale functions are stored in the LayerCake context. We can access them with $xGet and $yGet but a long way to write is to access x, xScale and then $xScale($x(d)) instead of $xGet(d) etc.
  const { data, xGet, yGet, width, height, custom } = getContext('LayerCake')


  // console.log($data)
  // $: console.log($width, $height)
</script>

<Svg>
  <!-- <rect width="100%" height="100%" fill="beige"> </rect> -->
  <g>
    {#each $data as d}
      <circle cx={$xGet(d)} cy={$yGet(d)} r="5" fill={$custom.colorFunction(d)}></circle>
    {/each}
  </g>
</Svg>
