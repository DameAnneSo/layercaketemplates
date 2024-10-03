<script>
  import { getContext } from 'svelte'
  import { Svg, uniques } from 'layercake'
  import { line, curveLinear } from 'd3-shape'

  const { data, xGet, yGet, width, height, custom } = getContext('LayerCake')

  // start with empty array
  let lineData = []

  // recuperer la data pour faire la ligne
  const lineGenerator = line()
    .x(d => $xGet(d))
    .y(d => $yGet(d))
    .curve($custom.curve ? $custom.curve : curveLinear)

  // De la donnee brute a la donnee pour la ligne
  const renderPath = () => {
    const categories = uniques($data.map(d => d.category))
    lineData = categories.map(category => {
      const path = lineGenerator($data.filter(d => d.category === category))
      return { path, category }
    })
    // console.log(categories)
    console.log(lineData)
  }

  // à chaque fois que data, width ou height change, on recalcule le path
  $: $data, $width, $height, renderPath()
</script>

<Svg>
  {#each lineData as lineDatum}
    <path d={lineDatum.path} stroke={$custom.colorFunction(lineDatum)} />{/each}</Svg>

<style>
  path {
    stroke-width: 1.5;
    fill: none;
  }
</style>

<!-- 1 boucle pour les lignes (de proprio)
 1 boucle pour chaque bar
  -->
