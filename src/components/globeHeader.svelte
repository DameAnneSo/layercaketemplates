<div class="globe-header">
  <h2 class="chart-title">The rotating choropleth map</h2>
  <div class="chart-meta">
    <p>
      Inspired by a tutorial from Connor Rothschild in <a
        href="https://www.newline.co/courses/better-data-visualizations-with-svelte/welcome"
        target="_blank">Better Data Visualizations with Svelte</a
      >
    </p>
    <p>
      Source: <a
        href="https://worldpopulationreview.com/country-rankings/cat-population-by-country"
        >WorldPopulationReview.com</a
      >
    </p>
  </div>
  <p class="description">Cats across the world | <span class="description-bold"> Cat per capita in 2026</span></p>
</div>

<style>
.globe-header {
  text-align: left;
}

.chart-title {
  color: var(--clr-grey-2);
  margin: clamp(1rem, 3vh, 2rem) 0 0.2rem 0;
}

.description {
  color: var(--clr-grey-2);
  margin: 0 0 clamp(0.8rem, 2vh, 1.5rem) 0;
}

.description-bold {
  font-weight: 600;
  color: var(--clr-primary-4);
}
</style>
