export const filterCategory = [
  {
    name: "Dinnerware",
  },
  {
    name: "Ceramic",
  },
  {
    name: "Furniture",
  },
  {
    name: "Decor Art",
  },
  {
    name: "Gifts sets",
  },
];

export const filterPriceRange = [
  {
    from: 0,
    to: 10,
  },
  {
    from: 10,
    to: 50,
  },
  {
    from: 50,
    to: 100,
  },
  {
    from: 100,
    to: 200,
  },
  {
    from: 200,
  },
];

export const filterColor = [
  {
    name: "#fff",
  },
  {
    name: "#c69b7b",
  },
  {
    name: "#ccd8ce",
  },
  {
    name: "#b4555d",
  },
  {
    name: "#9b92a1",
  },
];

export const filter = {
  category: filterCategory.map((el, i) => ({ ...el, id: i + 1 })),
  color: filterColor.map((el, i) => ({ ...el, id: i + 1 })),
  price: filterPriceRange.map((el, i) => ({ ...el, id: i + 1 })),
};
