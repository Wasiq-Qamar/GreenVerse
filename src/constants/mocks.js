const donateCategories = [
  {
    id: 1,
    name: "Raashsan.",
    tags: ["products", "inspirations"],
    count: 147,
    description: "Donate one month's ration to a family and end the hunger.",
    image: require("../../assets/icons/food.png"),
  },
  {
    id: 2,
    name: "Clothes.",
    tags: ["products", "inspirations"],
    count: 68,
    description: "Donate your old clothes so someone in need can wear them.",
    image: require("../../assets/icons/clothes.jpg"),
  },
  {
    id: 3,
    name: "Fund an Education",
    tags: ["products", "inspirations"],
    count: 68,
    description:
      "Donate to fund the education of a child with no means of paying fees.",
    image: require("../../assets/icons/education.png"),
  },
];

const volunteerCategories = [
  {
    id: 1,
    name: "Plant Trees",
    tags: ["products", "inspirations"],
    count: 147,
    description:
      "Team up with other members and plant a tree to end pollution.",
    image: require("../../assets/icons/plant.jpg"),
  },
  {
    id: 2,
    name: "Recycle ",
    tags: ["products", "shop"],
    count: 16,
    description:
      "Join others in cleaning up the streets and parks for a safe environment.",
    image: require("../../assets/icons/recycle.png"),
  },
  {
    id: 3,
    name: "Teach.",
    tags: ["products", "inspirations"],
    count: 68,
    description:
      "Teach at one of our partner charity schools to give these a bright future",
    image: require("../../assets/icons/teach.png"),
  },
];

const products = [
  {
    id: 1,
    name: "16 Best Plants That Thrive In Your Bedroom",
    description:
      "Bedrooms deserve to be decorated with lush greenery just like every other room in the house – but it can be tricky to find a plant that thrives here. Low light, high humidity and warm temperatures mean only certain houseplants will flourish.",
    tags: ["Interior", "27 m²", "Ideas"],
    images: [
      require("../../assets/images/plants_1.png"),
      require("../../assets/images/plants_2.png"),
      require("../../assets/images/plants_3.png"),
      // showing only 3 images, show +6 for the rest
      require("../../assets/images/plants_1.png"),
      require("../../assets/images/plants_2.png"),
      require("../../assets/images/plants_3.png"),
      require("../../assets/images/plants_1.png"),
      require("../../assets/images/plants_2.png"),
      require("../../assets/images/plants_3.png"),
    ],
  },
];

const explore = [
  // images
  require("../../assets/images/explore_1.png"),
  require("../../assets/images/explore_2.png"),
  require("../../assets/images/explore_3.png"),
  require("../../assets/images/explore_4.png"),
  require("../../assets/images/explore_5.png"),
  require("../../assets/images/explore_6.png"),
];

const profile = {
  name: "GreenVerse User",
  email: "signer@email.com",
  password: "password",
};

export { volunteerCategories, donateCategories, explore, products, profile };
