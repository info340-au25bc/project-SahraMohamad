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
  {
    id: "oranges",
    name: "Oranges",
    image: "/img/oranges.png",
    detailHref: "/fridge-items/oranges",
    creditHref:
      "https://gallery.yopriceville.com/Free-Clipart-Pictures/Fruit-PNG/Large_Oranges_PNG_Clipart",
    summary:
      "Juicy and bright. The fridge keeps them plump for weeks as long as they can breathe.",
    storageTips: [
      "Store loose or in a mesh bag; avoid sealed plastic that traps moisture.",
      "Check weekly and use up any soft spots first.",
      "Good for 2–3 weeks chilled; bring to room temp before juicing for more liquid.",
    ],
    usageIdeas: [
      "Segment into salads with olives or feta.",
      "Zest into marinades or vinaigrettes for extra lift.",
      "Freeze the zest and juice in ice cube trays for future sauces or drinks.",
    ],
  },
  {
    id: "bananas",
    name: "Bananas",
    image: "/img/bananas.png",
    detailHref: "/fridge-items/bananas",
    creditHref:
      "https://pngtree.com/freepng/banana-yellow-fruit-banana-skewers_8413319.html",
    summary:
      "Sweet and mellow. They ripen best on the counter, then chill to pause browning once they're perfect.",
    storageTips: [
      "Keep on the counter until yellow and fragrant, then refrigerate to hold ripeness.",
      "Cold will darken the peel but the fruit stays firm inside.",
      "Peel and freeze extras for smoothies or baking.",
    ],
    usageIdeas: [
      "Blend into smoothies with peanut butter and oats.",
      "Smash onto toast with a drizzle of honey or tahini.",
      "Slice and freeze to pulse into quick \"nice cream.\"",
    ],
  },
];

const presetMap = presetFridgeItems.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

export const getFridgeItemDetail = (slug) => presetMap[slug] ?? null;
