<script>
  import { getContext } from 'svelte'
  import { Svg, uniques } from 'layercake'
  import { line, curveLinear} from 'd3-shape'

  const { data, xGet, yGet, width, height, custom } = getContext('LayerCake')

  // start with empty array
  let lineData = []

  // get data
  const lineGenerator = line()
    .x(d => $xGet(d))
    .y(d => $yGet(d))
    .curve($custom.curve ? $custom.curve : curveLinear)
    // .curve(curveStep)

  // raw data to transformed data 
  const renderPath = () => {
    const categories = uniques($data.map(d => d.category))
    lineData = categories.map(category => {
      const path = lineGenerator($data.filter(d => d.category === category))
      return { path, category }
    })
    // console.log(categories)
    // console.log(lineData)
  }

  export let labels = true;

  //each time data, width or height change, recalculate the path 
  $: $data, $width, $height, renderPath()
</script>

<Svg>
  {#each lineData as lineDatum}
    <path d={lineDatum.path} stroke={$custom.colorFunction(lineDatum)} />{/each}
  
  <g class="labels">
    {#if labels}
      {#each $data as d}
        <text class="label" x={$xGet(d)} y={$yGet(d) -15} text-anchor="middle">
          {d.key}: {d.value}
        </text>
      {/each}
    {/if}
  </g>
  </Svg>


<style>
  path {
    stroke-width: 1.5;
    fill: none;
  }

  .label {
    fill: var(--clr-primary-5);
    font-size: 0.8rem;
    font-family: var(--ff-secondary);
  }
</style>

