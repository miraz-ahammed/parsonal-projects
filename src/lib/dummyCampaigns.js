// TODO: backend ready হলে এই ফাইল বাদ দিয়ে API থেকে data আনবে
export const dummyCampaigns = [
  {
    id: "1",
    title: "Solar-Powered Water Pump for Rural Villages",
    creatorName: "Nusrat Jahan",
    creatorEmail: "nusrat@example.com",
    category: "Environment",
    story:
      "Many villages near the river still depend on diesel pumps that break down every monsoon. We plan to install five solar-powered water pumps so families get clean water all year without fuel costs. Every credit goes toward panels, pipes and local technician training.",
    goal: 6000,
    raised: 4800,
    minContribution: 10,
    deadline: "2027-02-20",
    reward: "Your name on the village water board and a quarterly progress report.",
    image: "https://picsum.photos/seed/solar/900/540",
  },
  {
    id: "2",
    title: "Open-Source Learning App for Village Schools",
    creatorName: "Rafiq Ahmed",
    creatorEmail: "rafiq@example.com",
    category: "Education",
    story:
      "Students in remote schools lack interactive lessons. We are building an offline-first learning app in Bangla with math, science and English practice. Funding covers development, tablets for pilot schools and teacher workshops.",
    goal: 5000,
    raised: 4200,
    minContribution: 5,
    deadline: "2027-01-30",
    reward: "Early access to the app and a thank-you mention in the credits screen.",
    image: "https://picsum.photos/seed/learning/900/540",
  },
  {
    id: "3",
    title: "Community Library on Wheels",
    creatorName: "Tasnim Akter",
    creatorEmail: "tasnim@example.com",
    category: "Community",
    story:
      "A converted van stocked with children's books will visit neighbourhoods that have no library. We need funds for the vehicle conversion, an initial collection of 2,000 books and a part-time librarian.",
    goal: 4500,
    raised: 3650,
    minContribution: 10,
    deadline: "2027-03-10",
    reward: "A bookplate with your name inside every donated book.",
    image: "https://picsum.photos/seed/library/900/540",
  },
  {
    id: "4",
    title: "Handmade Clay Art Studio for Young Artists",
    creatorName: "Sadia Rahman",
    creatorEmail: "sadia@example.com",
    category: "Art",
    story:
      "Our studio will give teenagers a free space to learn pottery and sculpture. Contributions pay for two kilns, clay supplies and monthly workshops led by local artisans.",
    goal: 4000,
    raised: 3100,
    minContribution: 5,
    deadline: "2027-01-25",
    reward: "A handmade ceramic cup from the first batch of students.",
    image: "https://picsum.photos/seed/clay/900/540",
  },
  {
    id: "5",
    title: "Free Health Camp for Riverside Communities",
    creatorName: "Imran Hossain",
    creatorEmail: "imran@example.com",
    category: "Health",
    story:
      "Families along the riverbank rarely see a doctor. We will run a monthly health camp offering eye checks, blood pressure screening and basic medicines, staffed by volunteer physicians.",
    goal: 3500,
    raised: 2750,
    minContribution: 10,
    deadline: "2027-02-05",
    reward: "A volunteer day invitation and the camp's annual impact report.",
    image: "https://picsum.photos/seed/health/900/540",
  },
  {
    id: "6",
    title: "Rooftop Gardens for Dhaka Neighbourhoods",
    creatorName: "Mahmuda Khatun",
    creatorEmail: "mahmuda@example.com",
    category: "Environment",
    story:
      "We turn unused rooftops into vegetable gardens that feed local families and cool the buildings below. Funds cover soil, raised beds, seeds and training for residents.",
    goal: 3000,
    raised: 2400,
    minContribution: 5,
    deadline: "2027-02-14",
    reward: "A starter pack of seasonal vegetable seeds.",
    image: "https://picsum.photos/seed/garden/900/540",
  },
  {
    id: "7",
    title: "Low-Cost Smart Meter for Small Shops",
    creatorName: "Arif Chowdhury",
    creatorEmail: "arif@example.com",
    category: "Technology",
    story:
      "Small shop owners often overpay for electricity because they cannot see usage in real time. Our smart meter shows daily consumption on a phone and costs a fraction of imported devices.",
    goal: 7000,
    raised: 1900,
    minContribution: 20,
    deadline: "2027-04-01",
    reward: "A discounted meter when the product launches.",
    image: "https://picsum.photos/seed/meter/900/540",
  },
  {
    id: "8",
    title: "Street Mural Festival in Old Dhaka",
    creatorName: "Farhana Islam",
    creatorEmail: "farhana@example.com",
    category: "Art",
    story:
      "Twenty local painters will brighten the lanes of Old Dhaka with murals that tell neighbourhood stories. Funding covers paint, scaffolding, permits and artist stipends.",
    goal: 2800,
    raised: 900,
    minContribution: 5,
    deadline: "2027-03-22",
    reward: "A limited-edition postcard set of every mural.",
    image: "https://picsum.photos/seed/mural/900/540",
  },
];

export const categories = [
  "All",
  "Technology",
  "Art",
  "Community",
  "Health",
  "Education",
  "Environment",
];

export function daysLeft(deadline) {
  const diff = new Date(deadline) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}