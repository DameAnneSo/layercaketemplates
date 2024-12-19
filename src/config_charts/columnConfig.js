const colorFunction = () => "var(--clr-primary-3)";

const padding = { top: 20, right: 0, bottom: 20, left: 0 };

const custom = {
  colorFunction,
};

const columnData = [
  { key: "owner 1", value: 0.5, category: "cat" },
  { key: "owner 2", value: 1, category: "dog" },
  { key: "owner 3", value: 2, category: "dog" },
  { key: "owner 4", value: 5, category: "dog" },
  { key: "owner 5", value: 4, category: "cat" },
  { key: "owner 6", value: 3, category: "cat" },
];

export const columnConfig = {
  data: columnData,
  x: "key",
  y: "value",
  yDomain: [0, null], // null needs to be fixed with a maxDomain to not overflow
  padding,
};

