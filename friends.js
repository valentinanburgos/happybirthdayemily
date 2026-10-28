/*
  EDIT THIS FILE to personalize Emily's game.

  For each friend:
  - Change name and message.
  - Change animal.name, animal.reason, and animal.image.
  - Put their image in assets/animals/ and update the path.
  - Keep flowerThreshold increasing by 3: 3, 6, 9, 12...
  - Add or remove friend objects as needed (6–8 friends is ideal).

  Tip: Keep apostrophes inside backticks (`like this`) for messages.
*/

const friends = [
  {
    id: "friend-1",
    name: "Matthew",
    message: `Emily, you are so altruistic, potential, and beautiful! I love you pookie and wish you nothing but success. I'll always cherish our memories from going to Rapids together. Happy birthday querida!`,
    animal: {
      name: "Cheetah",
      reason: "Because you're fierce, stylish, and cool.",
      image: "assets/animals/friend-1.svg",
      alt: "A cheetah chosen to represent Emily"
    },
    flowerThreshold: 3
  },
  {
    id: "friend-2",
    name: "Liz",
    message: `Emily, you're so silly, SUPER PRETTY, and genuine. Happy birthday my pookie wooskie trooskie dooskie. I thank God for placing you in my life, you are very dear and special to me. I wish you the very best on any and every endeavor of life. May God continue to bless you for many more years to come, te amo pookie. ♡`,
    animal: {
      name: "Calico cat",
      reason: "Because you're unique, whimsical, and bold.",
      image: "assets/animals/friend-2.svg",
      alt: "A cat chosen to represent Emily"
    },
    flowerThreshold: 6
  },
  {
    id: "friend-3",
    name: "Caelyn",
    message: `Happy birthday, Emily! You deserve all the best things life has to offer. 
    You are beautiful, kind, and radiant. I can always trust in you for a good convo. Love you! ♡`,
    animal: {
      name: "Red Panda",
      reason: "Because you're warm, kind, and give a red panda vibe.",
      image: "assets/animals/friend-3.svg",
      alt: "A golden retriever chosen to represent Emily"
    },
    flowerThreshold: 9
  },
  {
    id: "friend-4",
    name: "Tina",
    message: `Emily thank you so much for being real, joyful, and relatable. 
    I love hanging out with you and talking to you. You're so fun and funny, and 
    yet so grouned and down to earth. You are truly one of a kind, and whenever we 
    talk I feel like I can tell you anything. One memory 
    I'll always treasure is talking at Theo's restaurant. You deserve so much happiness 
    this year and every year. Happy birthday! ♡`,
    animal: {
      name: "Yellow kitten",
      reason: "Because you're full of energy, you give a yellow vibe, and you're SOU KYUTE.",
      image: "assets/animals/friend-4.svg",
      alt: "A kitten chosen to represent Emily"
    },
    flowerThreshold: 12
  },
  {
    id: "friend-5",
    name: "Friend Five",
    message: `Something I love about you is [personal message]. Life is better with you in it, especially when we [inside joke or favorite activity]. Happy birthday! ♡`,
    animal: {
      name: "Fox",
      reason: "Because [your friend's explanation goes here].",
      image: "assets/animals/friend-5.svg",
      alt: "A fox chosen to represent Emily"
    },
    flowerThreshold: 15
  },
  {
    id: "friend-6",
    name: "Friend Six",
    message: `Emily, you have such a special way of [quality or habit]. I'm so happy I get to call you my friend. I hope this next year brings you wonderful things. ♡`,
    animal: {
      name: "Deer",
      reason: "Because [your friend's explanation goes here].",
      image: "assets/animals/friend-6.svg",
      alt: "A deer chosen to represent Emily"
    },
    flowerThreshold: 18
  },
  {
    id: "friend-7",
    name: "Friend Seven",
    message: `I hope you know how loved you are. My favorite thing about our friendship is [personal memory or quality]. Thank you for being you. Happy birthday, Emily! ♡`,
    animal: {
      name: "Bumblebee",
      reason: "Because [your friend's explanation goes here].",
      image: "assets/animals/friend-7.svg",
      alt: "A bumblebee chosen to represent Emily"
    },
    flowerThreshold: 21
  }
];

const birthdayConfig = {
  recipient: "Emily",
  title: "Emily's Little Garden",
  flowersPerLetter: 3,
  finalMessage: "A little bit of everyone who loves you, all in one Emily-shaped creature. Happy birthday, Emily. We love you so much! ♡",
  chimeraImage: "assets/animals/emily-chimera.png"
};
