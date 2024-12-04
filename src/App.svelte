<script>
  import StackedColumn from "./custom_charts/stackedColumnCustom.svelte";
  import StackedBar from "./custom_charts/stackedBarCustom.svelte";
  import Scatterplot from "./custom_charts/scatterplotCustom.svelte";
  import Line from "./custom_charts/lineCustom.svelte";
  import Bar from "./custom_charts/barCustom.svelte";
  import Column from "./custom_charts/columnCustom.svelte";
  import Scrolly from "./components/scrolly.svelte";
  
</script>

<div class="page-column">
  <h1>My gallery of chart templates</h1>
  <Scatterplot />
  </div>
  <Scrolly/>
  <div class="page-column">
  <Line />
  <Bar />
  <StackedBar />
  <StackedColumn />
  <Column />
</div>
