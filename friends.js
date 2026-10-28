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
    name: "Friend One",
    message: `Emily, one of my favorite things about you is [what you love about her]. I'll always remember [a favorite memory]. I'm so lucky to have you in my life. Happy birthday! ♡`,
    animal: {
      name: "Bunny",
      reason: "Because you're sweet, thoughtful, and ridiculously adorable.",
      image: "assets/animals/friend-1.svg",
      alt: "A bunny chosen to represent Emily"
    },
    flowerThreshold: 3
  },
  {
    id: "friend-2",
    name: "Friend Two",
    message: `Emily, you make every room brighter by [something special about her]. Thank you for being the kind of friend who [something she does]. Love you lots! ♡`,
    animal: {
      name: "Cat",
      reason: "Because of your [funny or sweet reason here].",
      image: "assets/animals/friend-2.svg",
      alt: "A cat chosen to represent Emily"
    },
    flowerThreshold: 6
  },
  {
    id: "friend-3",
    name: "Friend Three",
    message: `My favorite thing about you is [personal quality]. I'll always smile when I think about [your memory together]. I hope your birthday is as lovely as you are! ♡`,
    animal: {
      name: "Golden Retriever",
      reason: "Because you make people feel welcome and loved.",
      image: "assets/animals/friend-3.svg",
      alt: "A golden retriever chosen to represent Emily"
    },
    flowerThreshold: 9
  },
  {
    id: "friend-4",
    name: "Friend Four",
    message: `Emily, I'm grateful for the way you [something you appreciate]. One memory I'll always treasure is [memory]. You deserve so much happiness this year. ♡`,
    animal: {
      name: "Duck",
      reason: "Because [your friend's explanation goes here].",
      image: "assets/animals/friend-4.svg",
      alt: "A duck chosen to represent Emily"
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
