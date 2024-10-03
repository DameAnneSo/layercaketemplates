<script>
  import { LayerCake } from 'layercake'
  import {stackedColumnConfig} from './chartConfigs.js'
  import Scatterplot from '../graphics/scatterplot.svelte'
  import AxisX from '../graphics/axisX.svelte'
  import AxisY from '../graphics/axisY.svelte'
  import Line from '../graphics/line.svelte'
  import Bar from '../graphics/bar.svelte'
  import Column from '../graphics/column.svelte'
  import StackedColumn from '../graphics/stackedColumn.svelte'
  import StackedBar from '../graphics/stackedBar.svelte'

  import { curveStep } from 'd3-shape'

  const data = [
    { key: 0.5, value: 0.5, category: 'cat' },
    { key: 1, value: 1, category: 'dog' },
    { key: 2, value: 2, category: 'dog' },
    { key: 3, value: 5, category: 'dog' },
    { key: 4, value: 4, category: 'cat' },
    { key: 5, value: 3, category: 'cat' }
  ]

  const newStackedData = [
    { key: 1, value: 12, category: 'cat' },
    { key: 1, value: 1, category: 'dog' },
    { key: 2, value: 2, category: 'dog' },
    { key: 2, value: 5, category: 'cat' },
    { key: 3, value: 4, category: 'cat' },
    { key: 3, value: 0, category: 'dog' }
  ]

  const MaxDomain = stackedColumnConfig.custom.calculateMaxDomain(newStackedData)

  // Custom functions
  const colorFunction = d => {
    // if first category then red, else blue
    return d.category === data[0].category ? 'red' : 'blue'
  }
  const custom = {
    colorFunction,
    curve: curveStep,
    // fill: 'teal' //for one color only
    // ,stroke: 'purple' -- for line charts
  }


  // Configuration
  const config = { 
    ...stackedColumnConfig,
    data: newStackedData,
    yDomain: [0, MaxDomain],
    custom
  }

  console.log(stackedColumnConfig)
</script>

<div class="chart-container">
  <LayerCake {...config} debug={false}>
    <AxisX />
    <AxisY />
    <!--<Line /> -->
    <!--<Scatterplot /> -->
    <!-- <Bar /> -->
    <!-- <Column /> -->
    <!-- <StackedBar /> -->
    <StackedColumn />
  </LayerCake>
</div>

<!-- 
TO DO LIST:
Dont understand the intro of LayerCake props 
 https://layercake.graphics/guide#layercake-props

 Padding: doesn that mean we forget about margin top, bottom, left, right?

 Re-read the section about xPadding and xNice and position

note for later: aspectRatio: c'est le truc dont j'ai besoin pour changer layout mobile/desktop!!!

re-read ScaledSvg, 

-->

<style>
  /*
    The wrapper div needs to have an explicit width and height in CSS.
    It can also be a flexbox child or CSS grid element.
    The point being it needs dimensions since the <LayerCake> element will
    expand to fill it.
  */
  .chart-container {
    height: 20rem;
    width: 100%;
  }
</style>
