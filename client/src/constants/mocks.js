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
    name: "Recycle",
    tags: ["products", "shop"],
    count: 16,
    description:
      "Join others in cleaning up the streets and parks for a safe environment.",
    image: require("../../assets/icons/recycle.png"),
  },
  // {
  //   id: 3,
  //   name: "Teach.",
  //   tags: ["products", "inspirations"],
  //   count: 68,
  //   description:
  //     "Teach at one of our partner charity schools to give these a bright future",
  //   image: require("../../assets/icons/teach.png"),
  // },
];

const tasks = [
  {
    id: 1,
    name: "Expressway Project",
    location: "Islamabad, Expressway",
    description:
      "Need a team of five people to plant 25 trees on a patch on the expressway from karal chowk to Khanna pul.",
    date: "25th December, 2021",
    time: "5.30 - 7.30",
    image: require("../../assets/icons/plant.jpg"),
  },
  {
    id: 2,
    name: "Sea View Project",
    location: "Karachi, Seaview",
    description:
      "Need a team of five people to plant 25 trees on a patch on sea view boundary wall",
    date: "13th January, 2021",
    time: "4.00 - 6.30",
    image: require("../../assets/images/explore_3.png"),
  },
  {
    id: 3,
    name: "Minar-e-Pakistan Project",
    location: "Lahore, Azadi Chowk",
    description:
      "Need a team of five people to plant 100 trees around the border of park grass",
    date: "16th July, 2021",
    time: "4.00 - 6.30",
    image: require("../../assets/images/1.png"),
  },
];

const ngos = [
  {
    id: 1,
    name: "EDHI Welfare Trust",
    description:
      "The Edhi Foundation is a non-profit social welfare organization based in Pakistan. It was founded by Abdul Sattar Edhi in 1951, who served as the head of the organization until his death on 8 July 2016.",

    image: require("../../assets/images/edhi_icon.jpg"),
  },
  {
    id: 2,
    name: "Saylani Trust",
    description:
      "Saylani Welfare International Trust is a Pakistani charity focusing primarily on feeding the homeless. It was established in May 1999 and is headquartered at Bahdurabad, Karachi, Pakistan. It was founded and headed by spiritual and religious scholar Maulana Bashir Farooq Qadri.",
    image: require("../../assets/images/saylani_icon.jpg"),
  },
];

// const profile = {
//   name: "GreenVerse User",
//   email: "signer@email.com",
//   password: "password",
// };

const taskMessages = [
  {
    text: "Hi",
    user: "wasiq",
  },
  {
    text: "How are you",
    user: "sufyan",
  },
  {
    text: "Is your task complete",
    user: "wasiq",
  },
  {
    text: "No, not yet",
    user: "sufyan",
  },
  {
    text: "it will be completed soon",
    user: "sufyan",
  },
];

const donationMessages = [
  {
    text: "Hi",
    user: "ngo",
  },
  {
    text: "Hey",
    user: "sufyan",
  },
  {
    text: "We have received your donation",
    user: "ngo",
  },
  {
    text: "Thanks for the update",
    user: "sufyan",
  },
];

const categories = [
  {
    id: "plants",
    name: "Plants",
    tags: ["products", "inspirations"],
    count: 147,
    image: require("../../assets/icons/plants.png"),
  },
  {
    id: "seeds",
    name: "Seeds",
    tags: ["products", "shop"],
    count: 16,
    image: require("../../assets/icons/seeds.png"),
  },
  {
    id: "flowers",
    name: "Flowers",
    tags: ["products", "inspirations"],
    count: 68,
    image: require("../../assets/icons/flowers.png"),
  },
  {
    id: "sprayers",
    name: "Sprayers",
    tags: ["products", "shop"],
    count: 17,
    image: require("../../assets/icons/sprayers.png"),
  },
  {
    id: "pots",
    name: "Pots",
    tags: ["products", "shop"],
    count: 47,
    image: require("../../assets/icons/pots.png"),
  },
  {
    id: "fertilizers",
    name: "Fertilizers",
    tags: ["products", "shop"],
    count: 47,
    image: require("../../assets/icons/fertilizers.png"),
  },
];

const products = [
  {
    id: 1,
    name: "Plant 1",
    price: "250",
    image: require("../../assets/images/plants_1.png"),
  },
  {
    id: 2,
    name: "Plant 2",
    price: "250",
    image: require("../../assets/images/plants_2.png"),
  },
  {
    id: 3,
    name: "Plant 3",
    price: "250",
    image: require("../../assets/images/plants_3.png"),
  },
  {
    id: 4,
    name: "Plant 4",
    price: "250",
    image: require("../../assets/images/plants_4.png"),
  },
  {
    id: 5,
    name: "Plant 5",
    price: "250",
    image: require("../../assets/images/plants_5.png"),
  },
  {
    id: 6,
    name: "Plant 6",
    price: "250",
    image: require("../../assets/images/plants_6.png"),
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

const cartItems = [
  {
    id: 1,
    name: "Plant 1",
    price: "250",
    image: require("../../assets/images/plants_1.png"),
  },
  {
    id: 2,
    name: "Plant 2",
    price: "250",
    image: require("../../assets/images/plants_2.png"),
  },
];

const profile = {
  username: "react-ui-kit",
  location: "Europe",
  email: "contact@react-ui-kit.com",
  avatar: require("../../assets/images/avatar.png"),
  budget: 1000,
  monthly_cap: 5000,
  notifications: true,
  newsletter: false,
};

export {
  volunteerCategories,
  donateCategories,
  ngos,
  tasks,
  taskMessages,
  donationMessages,
  categories,
  explore,
  products,
  profile,
  cartItems,
};
