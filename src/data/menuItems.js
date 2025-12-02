// Normalized menu data for Prayz Cafe
// Each item has: category, name, sizes[], and optional description

const menuItems = [
  {
    category: 'Coffee',
    name: 'Cafe Latte',
    sizes: [
      { label: 'S', price: 110 },
      { label: 'M', price: 130 },
    ],
  },
  {
    category: 'Coffee',
    name: 'Americano',
    sizes: [
      { label: 'S', price: 100 },
      { label: 'M', price: 110 },
    ],
  },
  {
    category: 'Coffee',
    name: 'Cappuccino',
    sizes: [
      { label: 'S', price: 100 },
      { label: 'M', price: 110 },
    ],
  },
  {
    category: 'Coffee',
    name: 'French Vanilla',
    sizes: [
      { label: 'S', price: 110 },
      { label: 'M', price: 130 },
    ],
  },
  {
    category: 'Coffee',
    name: 'Spanish',
    sizes: [
      { label: 'S', price: 110 },
      { label: 'M', price: 130 },
    ],
  },
  {
    category: 'Coffee',
    name: "Prayz's Blend",
    sizes: [
      { label: 'S', price: 110 },
      { label: 'M', price: 130 },
    ],
  },
  {
    category: 'Coffee',
    name: 'Cereal Milk',
    sizes: [
      { label: 'S', price: 110 },
      { label: 'M', price: 130 },
    ],
  },
  {
    category: 'Coffee',
    name: 'Caramel',
    sizes: [
      { label: 'S', price: 110 },
      { label: 'M', price: 130 },
    ],
  },
  {
    category: 'Coffee',
    name: 'Dark Mocha',
    sizes: [
      { label: 'S', price: 110 },
      { label: 'M', price: 130 },
    ],
  },
  {
    category: 'Coffee',
    name: 'Hazelnut Mocha',
    sizes: [
      { label: 'S', price: 110 },
      { label: 'M', price: 130 },
    ],
  },
  {
    category: 'Coffee',
    name: 'White Mocha',
    sizes: [
      { label: 'S', price: 110 },
      { label: 'M', price: 130 },
    ],
  },
  {
    category: 'Coffee',
    name: 'Biscoff',
    sizes: [
      { label: 'S', price: 110 },
      { label: 'M', price: 130 },
    ],
  },
  {
    category: 'Coffee',
    name: 'Barista Drink',
    sizes: [
      { label: 'S', price: 130 },
      { label: 'M', price: 150 },
    ],
  },

  // Non-coffee
  {
    category: 'Non Coffee',
    name: 'Biscoff',
    sizes: [
      { label: 'S', price: 110 },
      { label: 'M', price: 130 },
    ],
  },
  {
    category: 'Non Coffee',
    name: 'Matcha',
    sizes: [
      { label: 'S', price: 110 },
      { label: 'M', price: 130 },
    ],
  },
  {
    category: 'Non Coffee',
    name: 'Strawberry',
    sizes: [
      { label: 'S', price: 110 },
      { label: 'M', price: 130 },
    ],
  },
  {
    category: 'Non Coffee',
    name: 'Chocolate',
    sizes: [
      { label: 'S', price: 110 },
      { label: 'M', price: 130 },
    ],
  },

  // Ice Blended
  {
    category: 'Ice Blended',
    name: 'Java Chip',
    sizes: [
      { label: 'M', price: 150 },
      { label: 'L', price: 180 },
    ],
  },
  {
    category: 'Ice Blended',
    name: 'Caramel',
    sizes: [
      { label: 'M', price: 150 },
      { label: 'L', price: 180 },
    ],
  },
  {
    category: 'Ice Blended',
    name: 'Strawberry',
    sizes: [
      { label: 'M', price: 150 },
      { label: 'L', price: 180 },
    ],
  },
  {
    category: 'Ice Blended',
    name: 'Cookies n Cream',
    sizes: [
      { label: 'M', price: 150 },
      { label: 'L', price: 180 },
    ],
  },
  {
    category: 'Ice Blended',
    name: 'Choco',
    sizes: [
      { label: 'M', price: 150 },
      { label: 'L', price: 180 },
    ],
  },
  {
    category: 'Ice Blended',
    name: 'Matcha',
    sizes: [
      { label: 'M', price: 150 },
      { label: 'L', price: 180 },
    ],
  },

  // Fruit Fizz Slushie
  {
    category: 'Fruit Fizz Slushie',
    name: 'Strawberry',
    sizes: [
      { label: 'M', price: 100 },
      { label: 'L', price: 130 },
    ],
  },
  {
    category: 'Fruit Fizz Slushie',
    name: 'Lemon',
    sizes: [
      { label: 'M', price: 100 },
      { label: 'L', price: 130 },
    ],
  },
  {
    category: 'Fruit Fizz Slushie',
    name: 'Passion',
    sizes: [
      { label: 'M', price: 100 },
      { label: 'L', price: 130 },
    ],
  },
  {
    category: 'Fruit Fizz Slushie',
    name: 'Blueberry',
    sizes: [
      { label: 'M', price: 100 },
      { label: 'L', price: 130 },
    ],
  },
  {
    category: 'Fruit Fizz Slushie',
    name: 'Mango',
    sizes: [
      { label: 'M', price: 100 },
      { label: 'L', price: 130 },
    ],
  },
  {
    category: 'Fruit Fizz Slushie',
    name: 'Lychee',
    sizes: [
      { label: 'M', price: 100 },
      { label: 'L', price: 130 },
    ],
  },
  {
    category: 'Fruit Fizz Slushie',
    name: 'Green Apple',
    sizes: [
      { label: 'M', price: 100 },
      { label: 'L', price: 130 },
    ],
  },

  // Milktea
  {
    category: 'Milktea',
    name: 'Matcha',
    sizes: [{ label: 'Reg', price: 120 }],
  },
  {
    category: 'Milktea',
    name: 'Wintermelon',
    sizes: [{ label: 'Reg', price: 120 }],
  },
  {
    category: 'Milktea',
    name: 'Taro',
    sizes: [{ label: 'Reg', price: 120 }],
  },
  {
    category: 'Milktea',
    name: 'Cookies n Cream',
    sizes: [{ label: 'Reg', price: 120 }],
  },
  {
    category: 'Milktea',
    name: 'Chocolate',
    sizes: [{ label: 'Reg', price: 120 }],
  },
  {
    category: 'Milktea',
    name: 'Strawberry',
    sizes: [{ label: 'Reg', price: 120 }],
  },
  {
    category: 'Milktea',
    name: 'Brown Sugar',
    sizes: [{ label: 'Reg', price: 120 }],
  },

  // Tropical Fruit Frappe
  {
    category: 'Tropical Fruit Frappe',
    name: 'Mango Banana',
    sizes: [{ label: 'Reg', price: 100 }],
  },
  {
    category: 'Tropical Fruit Frappe',
    name: 'Dragon Fruit',
    sizes: [{ label: 'Reg', price: 100 }],
  },
  {
    category: 'Tropical Fruit Frappe',
    name: 'Avocado',
    sizes: [{ label: 'Reg', price: 100 }],
  },
  {
    category: 'Tropical Fruit Frappe',
    name: 'Mango',
    sizes: [{ label: 'Reg', price: 100 }],
  },

  // Natural juices
  {
    category: 'Natural Juices',
    name: 'Sunshine Blend',
    description: 'orange + pineapple + mango',
    sizes: [{ label: 'Reg', price: 100 }],
  },
  {
    category: 'Natural Juices',
    name: 'Tropical Glow',
    description: 'pineapple + cucumber + lemon',
    sizes: [{ label: 'Reg', price: 110 }],
  },
  {
    category: 'Natural Juices',
    name: 'Morning Boost',
    description: 'carrot + orange + ginger',
    sizes: [{ label: 'Reg', price: 100 }],
  },
  {
    category: 'Natural Juices',
    name: 'Citrus Bliss',
    description: 'calamansi + lemon + honey',
    sizes: [{ label: 'Reg', price: 110 }],
  },
  {
    category: 'Natural Juices',
    name: 'Apple Grace',
    description: 'apple + calamansi + honey',
    sizes: [{ label: 'Reg', price: 120 }],
  },

  // Ice cream cones
  {
    category: 'Ice Cream Cones',
    name: 'Belgian Cone',
    sizes: [{ label: 'Reg', price: 30 }],
  },
  {
    category: 'Ice Cream Cones',
    name: 'Sugar Cone',
    sizes: [{ label: 'Reg', price: 25 }],
  },
  {
    category: 'Ice Cream Cones',
    name: 'Wafer Cone',
    sizes: [{ label: 'Reg', price: 15 }],
  },

  // Floats
  {
    category: 'Floats',
    name: 'Coke',
    sizes: [
      { label: 'S', price: 60 },
      { label: 'L', price: 70 },
    ],
  },
  {
    category: 'Floats',
    name: 'Chuckie',
    sizes: [
      { label: 'S', price: 60 },
      { label: 'L', price: 70 },
    ],
  },
  {
    category: 'Floats',
    name: 'Dutchmill',
    sizes: [
      { label: 'S', price: 60 },
      { label: 'L', price: 70 },
    ],
  },
  {
    category: 'Floats',
    name: 'Milo',
    sizes: [
      { label: 'S', price: 60 },
      { label: 'L', price: 70 },
    ],
  },

  // Sundae
  {
    category: 'Sundae',
    name: 'Chocolate',
    sizes: [
      { label: 'S', price: 40 },
      { label: 'M', price: 60 },
      { label: 'L', price: 80 },
    ],
  },
  {
    category: 'Sundae',
    name: 'Caramel',
    sizes: [
      { label: 'S', price: 40 },
      { label: 'M', price: 60 },
      { label: 'L', price: 80 },
    ],
  },
  {
    category: 'Sundae',
    name: 'Mango',
    sizes: [
      { label: 'S', price: 69 },
      { label: 'M', price: 109 },
      { label: 'L', price: 149 },
    ],
  },
  {
    category: 'Sundae',
    name: 'Matcha',
    sizes: [
      { label: 'S', price: 69 },
      { label: 'M', price: 109 },
      { label: 'L', price: 149 },
    ],
  },
  {
    category: 'Sundae',
    name: 'Strawberry',
    sizes: [
      { label: 'S', price: 69 },
      { label: 'M', price: 109 },
      { label: 'L', price: 149 },
    ],
  },
  {
    category: 'Sundae',
    name: 'Pistachio',
    sizes: [
      { label: 'S', price: 99 },
      { label: 'M', price: 149 },
      { label: 'L', price: 179 },
    ],
  },
  {
    category: 'Sundae',
    name: 'Biscoff',
    sizes: [
      { label: 'S', price: 99 },
      { label: 'M', price: 149 },
      { label: 'L', price: 179 },
    ],
  },

  // Pizza
  {
    category: 'Pizza',
    name: 'Hawaiian',
    sizes: [
      { label: '10"', price: 180 },
      { label: '12"', price: 270 },
    ],
  },
  {
    category: 'Pizza',
    name: 'Pepperoni',
    sizes: [
      { label: '10"', price: 180 },
      { label: '12"', price: 270 },
    ],
  },
  {
    category: 'Pizza',
    name: 'Ham n Cheese',
    sizes: [
      { label: '10"', price: 180 },
      { label: '12"', price: 270 },
    ],
  },
  {
    category: 'Pizza',
    name: 'Cheesy Trio',
    sizes: [
      { label: '10"', price: 180 },
      { label: '12"', price: 270 },
    ],
  },
  {
    category: 'Pizza',
    name: 'Beef n Mushroom',
    sizes: [
      { label: '10"', price: 200 },
      { label: '12"', price: 290 },
    ],
  },
  {
    category: 'Pizza',
    name: 'Creamy Spinach',
    sizes: [
      { label: '10"', price: 200 },
      { label: '12"', price: 290 },
    ],
  },

  // Appetizers
  {
    category: 'Appetizers',
    name: 'Fries',
    sizes: [
      { label: 'S', price: 60 },
      { label: 'L', price: 150 },
    ],
  },
  {
    category: 'Appetizers',
    name: 'Takoyaki',
    sizes: [{ label: 'Reg', price: 35 }],
  },
  {
    category: 'Appetizers',
    name: 'Messy Donut',
    sizes: [{ label: 'Reg', price: 100 }],
  },
  {
    category: 'Appetizers',
    name: 'Burger',
    sizes: [{ label: 'Reg', price: 50 }],
  },
  {
    category: 'Appetizers',
    name: 'Grilled Sandwich',
    sizes: [{ label: 'Reg', price: 80 }],
  },
  {
    category: 'Appetizers',
    name: 'Mango Sticky Rice',
    sizes: [{ label: 'Reg', price: 150 }],
  },

  // Toast
  {
    category: 'Toast',
    name: 'Margarine',
    sizes: [{ label: 'Reg', price: 49 }],
  },
  {
    category: 'Toast',
    name: 'Butter & Sugar',
    sizes: [{ label: 'Reg', price: 49 }],
  },
  {
    category: 'Toast',
    name: 'Peanut Butter',
    sizes: [{ label: 'Reg', price: 59 }],
  },
  {
    category: 'Toast',
    name: 'Chocolate Spread',
    sizes: [{ label: 'Reg', price: 59 }],
  },
  {
    category: 'Toast',
    name: 'Ham & Cheese',
    sizes: [{ label: 'Reg', price: 79 }],
  },
  {
    category: 'Toast',
    name: 'Cheese Toast',
    sizes: [{ label: 'Reg', price: 79 }],
  },
  {
    category: 'Toast',
    name: 'Egg Mayo',
    sizes: [{ label: 'Reg', price: 79 }],
  },
  {
    category: 'Toast',
    name: 'Avocado',
    sizes: [{ label: 'Reg', price: 99 }],
  },
  {
    category: 'Toast',
    name: 'Avocado & Egg',
    sizes: [{ label: 'Reg', price: 119 }],
  },
  {
    category: 'Toast',
    name: 'Mozzarella Garlic',
    sizes: [{ label: 'Reg', price: 99 }],
  },
  {
    category: 'Toast',
    name: 'Pizza Toast',
    sizes: [{ label: 'Reg', price: 99 }],
  },

  // Mains
  {
    category: 'Mains',
    name: 'Pesto Pasta',
    sizes: [{ label: 'Reg', price: 230 }],
  },
  {
    category: 'Mains',
    name: 'Chicken Alfredo',
    sizes: [{ label: 'Reg', price: 200 }],
  },
  {
    category: 'Mains',
    name: 'Spaghetti',
    sizes: [{ label: 'Reg', price: 200 }],
  },
  {
    category: 'Mains',
    name: 'Wings',
    sizes: [{ label: 'Reg', price: 160 }],
  },

  // Noodles
  {
    category: 'Noodles',
    name: 'Samyang',
    sizes: [{ label: 'Reg', price: 149 }],
  },
  {
    category: 'Noodles',
    name: 'Ramen',
    sizes: [{ label: 'Reg', price: 89 }],
  },
  {
    category: 'Noodles',
    name: 'Ramen Overload',
    sizes: [{ label: 'Reg', price: 150 }],
  },

  // All day breakfast
  {
    category: 'All Day Breakfast',
    name: 'Tapa',
    sizes: [{ label: 'Reg', price: 120 }],
  },
  {
    category: 'All Day Breakfast',
    name: 'Corned Beef',
    sizes: [{ label: 'Reg', price: 120 }],
  },
  {
    category: 'All Day Breakfast',
    name: 'Sausage',
    sizes: [{ label: 'Reg', price: 120 }],
  },
  {
    category: 'All Day Breakfast',
    name: 'Tocino',
    sizes: [{ label: 'Reg', price: 120 }],
  },
  {
    category: 'All Day Breakfast',
    name: 'Spam',
    sizes: [{ label: 'Reg', price: 150 }],
  },
  {
    category: 'All Day Breakfast',
    name: 'Bangus',
    sizes: [{ label: 'Reg', price: 200 }],
  },
  {
    category: 'All Day Breakfast',
    name: 'Beef Pepper Rice',
    sizes: [{ label: 'Reg', price: 210 }],
  },

  // Add-ons
  {
    category: 'Add Ons',
    name: 'Egg',
    sizes: [{ label: 'Reg', price: 20 }],
  },
  {
    category: 'Add Ons',
    name: 'Cheese',
    sizes: [{ label: 'Reg', price: 20 }],
  },
  {
    category: 'Add Ons',
    name: 'Fish Cake',
    sizes: [{ label: 'Reg', price: 50 }],
  },
  {
    category: 'Add Ons',
    name: 'Tteokbokki',
    sizes: [{ label: 'Reg', price: 60 }],
  },
  {
    category: 'Add Ons',
    name: 'Seaweed',
    sizes: [{ label: 'Reg', price: 60 }],
  },
];

export default menuItems;


