<script>
  import Testlayercake from "./charts/ZZZtestlayercake.svelte";
  import StackedColumn from "./charts/stackedColumnCustom.svelte";
  import StackedBar from "./charts/stackedBarCustom.svelte";
  import Scatterplot from "./charts/scatterplotCustom.svelte";
  import Line from "./charts/lineCustom.svelte";
  import Bar from "./charts/barCustom.svelte";
  import Column from "./charts/columnCustom.svelte";
</script>

<div class="page-column">
  <!-- <Testlayercake /> -->
  <Scatterplot />
  <Line />
  <Bar />
  <StackedBar />
  <StackedColumn />
  <Column />
</div>
