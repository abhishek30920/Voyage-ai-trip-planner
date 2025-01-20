export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    description: 'Stay conscious of your spending',
    icon: '💰'
  },
  {
    id: 2,
    title: 'Moderate',
    description: 'Balanced comfort and cost',
    icon: '💎'
  },
  {
    id: 3,
    title: 'Luxury',
    description: 'Premium experience',
    icon: '👑'
  }
];
export const SelectTravelList = [
  {
    id: 1,
    title: 'Solo',
    description: 'Travel alone',
    icon: '🏃',
    people: '1 People'
  },
  {
    id: 2,
    title: 'Couple',
    description: 'Romantic getaway',
    icon: '💑',
    people: '2 People'
  },
  {
    id: 3,
    title: 'Family',
    description: 'With family or kids',
    icon: '👨‍👩‍👧‍👦',
    people: '4 People' // or any appropriate number for families
  },
  {
    id: 4,
    title: 'Friends',
    description: 'Group adventure',
    icon: '👥',
    people: '5-6 People' // assuming a group of friends could vary, adjust accordingly
  },

];


export const AI_PROMPT = `Generate Travel Plan for Location: {location} for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit ,in JSON format.`;
