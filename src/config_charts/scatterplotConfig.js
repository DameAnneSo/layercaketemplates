const colorFunction = () => "teal";

const padding = { top: 20, right: 0, bottom: 20, left: 0 };

const custom = {
  colorFunction,
};

const scatterplotData = [
  { key: 0.5, value: 0.5, category: "cat" },
  { key: 1, value: 1, category: "dog" },
  { key: 2, value: 2, category: "dog" },
  { key: 3, value: 5, category: "dog" },
  { key: 4, value: 4, category: "cat" },
  { key: 5, value: 3, category: "cat" },
];


export const scatterplotConfig = {
  data: scatterplotData,
  x: "key",
  y: "value",
  xDomain: [0, null],
  yDomain: [0, null],
  padding,
  custom,
};
