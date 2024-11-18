<div class="scrolly">
  <div class="foreground">
    <div class="step_intro"></div>
    <div>
      <p>
        Step 1: Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
        nemo voluptate id ducimus pariatur ratione! A accusantium quibusdam
        dolorem praesentium?
      </p>
    </div>
    <div>
      <p>step2</p>
    </div>
    <div>
      <p>step3</p>
    </div>
    <div>
      <p>step4</p>
    </div>
    <div class="step_final"></div>
  </div>
  <div class="background"></div>
</div>

<style>
  .scrolly {
    display: grid;
  }

  .foreground {
    position: relative;
    z-index: 2;
    pointer-events: none;
    grid-row: 1/-1;
    grid-column: 1/-1;
  }

  .foreground > div {
    width: 60ch;
    margin: 75vh auto 0 auto;
    padding: 2rem;
    box-shadow: 0 1px 10px 0px rgba(0, 0, 0, 0.8);
    background-color: beige;
  }
  .foreground > div:first-child {
    margin-top: -50vh;
    height: 1px;
    opacity: 0;
    padding: 0;
  }

  .foreground > div:last-child {
    margin-top: 50vh;
    height: 1px;
    opacity: 0;
    padding: 0;
  }

  .background {
    position: sticky;
    z-index: 1;
    top: 0;
    position: -webkit-sticky;
    background-color: lavender;
    height: 99vh;
    grid-row: 1/-1;
    grid-column: 1/-1;
  }
</style>
