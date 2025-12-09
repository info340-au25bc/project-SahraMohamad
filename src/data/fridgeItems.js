export const presetFridgeItems = [
  {
    id: "apples",
    name: "Apples",
    image: "/img/apple.png",
    detailHref: "/fridge-items/apples",
    creditHref: "https://pngimg.com/image/12405",
    summary:
      "Crisp and sweet. They like cold, slightly humid air once they're ripe enough to eat.",
    storageTips: [
      "Keep in a breathable bag in the crisper drawer to slow moisture loss.",
      "Separate any bruised apples so they don't speed up ripening for the rest.",
      "Best flavor within 2–3 weeks; move to the counter a few hours before eating for more aroma.",
    ],
    usageIdeas: [
      "Slice into oatmeal or yogurt with a sprinkle of cinnamon.",
      "Dice for a quick grilled cheese + apple quesadilla.",
      "Roast wedges with a bit of butter and salt to top salads.",
    ],
  },
];

const presetMap = presetFridgeItems.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

export const getFridgeItemDetail = (slug) => presetMap[slug] ?? null;
