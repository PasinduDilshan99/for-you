export interface Chapter {
  day: number;
  unlockAt: string; // ISO string, local time
  title: string;
  theme: string;
  content: string[];
  poetry?: string;
  cards?: string[]; // used only on day 3 ("the little things")
}

export const chapters: Chapter[] = [
  {
    day: 1,
    unlockAt: "2026-06-27T00:00:00",
    title: "A Special Day For A Special Person",
    theme: "Happy Birthday",
    content: [],
  },
  {
    day: 2,
    unlockAt: "2026-07-28T19:27:00",
    title: "The Beginning",
    theme: "Every Story Has a Beginning",
    poetry: "I'm glad you came.",
    content: [
      "First of all, thank you for coming back today. I hope yesterday made you smile, even just a little.",

      "Sometimes, we do small things for people who are important to us. Not because we have to, but because we want to make their day a little more special.",

      "I know a simple birthday wish is something anyone can send, but I wanted to create something different. Something that shows a little more thought, time, and effort.",

      "Maybe this is not the biggest gift in the world, but every small detail here was created with care. I wanted you to have a memory that feels a little different from an ordinary birthday message.",

      "Some people deserve more than just a few words. They deserve moments, smiles, and something created especially for them.",
      "Maybe nobody has created something like this for anyone before, but I wanted to make this moment unique in my own way. Not because it is a big thing, but because you deserve something special.",

      "That's all for today. This story still has more pages waiting. I'll see you again tomorrow after 07:27 PM. 😊",
    ],
  },
  {
    day: 3,
    unlockAt: "2026-07-29T19:27:00",
    title: "The Little Things I Notice",
    theme: "Things That Make You Special",
    poetry: "Have you eaten?",
    cards: [
      "Your beautiful smile 😊",
      "Your amazing personality ✨",
      "The way you notice everything 🌸",
      "Your way of speaking 💬",
      "Your little habits 🌻",
    ],
    content: [
      "Welcome back. 😊 Today, I want to share some small things that I have noticed about you.",

      "Sometimes, the things that make a person special are not big things. They are the small details that make them different from everyone else.",

      "Your smile is one of the first things I noticed. It has a way of making the people around you feel happier.",

      "You are a very kind person. You care about people and you always notice the little details that many others miss. That is something really special about you.",

      "I also like your little habits and the way you express yourself. The way you speak, the way you share your thoughts, and your confidence while talking make you an amazing person to be around.",

      "You have a beautiful personality. Of all the people I have met, you are someone who stands out in your own way.",

      "And there is one more funny thing I noticed... even when you get angry quickly, somehow that expression also has its own charm. 😊",

      "These may seem like small things, but these are the little moments that make someone memorable.",

      "Tomorrow, I will share some memories and moments that stayed in my mind. Until then, take care of yourself. 🌙",
    ],
  },
  {
    day: 4,
    unlockAt: "2026-07-30T19:27:00",
    title: "Moments I Remember",
    theme: "Small Moments, Beautiful Memories",
    poetry: "Take care on your way home.",
    content: [
      "Welcome back. 😊 Today I want to share some moments that stayed in my mind.",

      "Sometimes, the most valuable memories are not the big events. They are simple moments that happen naturally, but somehow remain in our hearts for a long time.",

      "I still remember the first time we met at the Cafe Of The 5th. It was just a normal day, but that day became the beginning of many little memories. Walking with you on the road at night, seeing the university night view, and talking about the night sky are moments I still remember.",

      "Sometimes, when you are busy doing something, I quietly look at you without you noticing. Your eyes are really beautiful. I know you can feel when someone is looking at you, but that small moment is something I cannot explain with words.",

      'I remember the day we went to Port City and sat together looking at the sea. While taking a selfie from your phone, you said something that made me smile: "E hinawe sathuta." That simple happiness in that moment became a beautiful memory for me.',

      "The day we went to the sea and saw the turtles is another memory I will never forget. I don't know how that moment happened, but seeing the turtles brought such a beautiful smile to your face. Your eyes were shining with happiness, and that is something I still remember.",

      "I also remember the day at the Barista in Pasyala when I told you that you looked beautiful in that dress. Your answer made me smile because you said there was no other dress to wear, so you wore that one. Sometimes the simplest moments become the sweetest memories.",

      "There are many more little moments that I keep in my heart. I cannot fit all of them into one page, so I will share some more with you on the final chapter.",

      "Thank you for being part of these memories. Take care of yourself, and I'll see you again tomorrow after 8:00 PM. 🌙",
    ],
  },
  {
    day: 5,
    unlockAt: "2026-07-31T19:27:00",
    title: "Thank You For Being You",
    theme: "The Person You Are",
    poetry: "Sleep well.",
    content: [
      "Welcome back. 😊",

      "Today, I want to tell you something that you may not know.",

      "Sometimes, after meeting someone, we don't immediately realize how much a person can become a part of our everyday thoughts. But slowly, small moments start becoming something we look forward to.",

      "A simple conversation with you, a small joke, seeing your smile, or even just spending a little time together can make a normal day feel different.",

      "I like those simple moments. Not because something special always happens, but because they become special when they are shared with the right person.",

      "There are times when you are busy with your own things, and I just enjoy watching you be yourself. The way you focus, the way you think, and the way you react to little things are moments that stay in my mind.",

      "You probably don't realize it, but you have created many small happy moments for me without even trying.",

      "Today, I just wanted to say thank you for those moments. Thank you for being someone who makes ordinary days a little more beautiful.",

      "Sleep well. 🌙 I'll see you again tomorrow after 8:00 PM.",
    ],
  },
  {
    day: 6,
    unlockAt: "2026-08-01T19:27:00",
    title: "The Moments I Treasure",
    theme: "Simple Moments, Special Memories",
    poetry: "The night is quiet.",
    content: [
      "Welcome back. 😊",

      "Today, I want to talk about some moments that are difficult to explain with just words.",

      "Sometimes, the best memories are not created during big events. They come from simple moments that happen naturally and quietly become special.",

      "There was something peaceful about those moments. Just walking, talking, sharing thoughts, and enjoying the atmosphere without needing anything more.",

      "Sometimes I think the beauty of a memory is not only about where we were or what we did. It is about who was there with us at that moment.",

      "There are many small moments like these that I quietly remember. Moments that may have felt ordinary at the time, but became something meaningful later.",

      "Thank you for being part of those memories. Some moments are special simply because they happened with the right person.",

      "Have a peaceful night. 🌙 I'll see you again tomorrow after 8:00 PM.",
    ],
  },
  {
    day: 7,
    unlockAt: "2026-08-02T19:27:00",
    title: "Someone Special",
    theme: "A Place You Hold",
    poetry: "You feel like home.",
    content: [
      "Welcome back. 😊",

      "Today, I want to share something that I slowly realized over time.",

      "In life, we meet many people. We talk with many people and create many memories. But sometimes, without even noticing, one person starts becoming different from everyone else.",

      "For me, you became someone like that.",

      "I like the way we can talk about simple things, laugh about random things, and enjoy small moments without needing a special reason.",

      "There is a comfort in being around you. Even ordinary moments feel a little different when I share them with you.",

      "I know I am not a perfect person. I have my own mistakes, weaknesses, and things I need to improve.",

      "But one thing I truly appreciate about you is that you always try to help me become better. Your advice, your thoughts, and the way you encourage me have helped me see things differently.",

      "Sometimes, a person becomes special not only because of the happiness they bring, but also because they inspire us to grow and become a better version of ourselves.",

      "You have that kind of presence in my life. You make me want to improve, learn, and become better than who I was before.",

      "I don't know if you realize it, but the small conversations, the advice you give, and the time we spend together have meant a lot to me.",

      "Thank you for being someone who brings happiness, kindness, and positive changes into my life.",

      "There are still a few more pages waiting. I'll see you again tomorrow after 8:00 PM. 🌙",
    ],
  },
  {
    day: 8,
    unlockAt: "2026-08-03T19:27:00",
    title: "Words I Kept Inside",
    theme: "Some Feelings Need Time",
    poetry: "I don't mind waiting.",
    content: [
      "Welcome back. 😊",

      "Only a few pages are left in this little journey. Looking back at the previous chapters, each one was made from small moments, memories, and things that I quietly kept in my mind.",

      "Sometimes, the most meaningful things in life are not the things we say. They are the moments we remember, the feelings we keep, and the little details that stay with us.",

      "There were many times when I wanted to share certain thoughts, but I simply enjoyed those moments as they were.",

      "I believe some things become more valuable when we give them time. Just like a beautiful story, the best parts should come at the right moment.",

      "This journey was never about creating something perfect. It was about collecting small pieces of happiness, memories, and moments that made me smile.",

      "Thank you for being part of those moments. Thank you for all the simple memories that became special without either of us realizing it.",

      "One more chapter is waiting tomorrow. Until then, enjoy your evening, take care of yourself, and I'll see you again after 8:00 PM. 🌙",
    ],
  },
  {
    day: 9,
    unlockAt: "2026-08-04T19:27:00",
    title: "The Final Chapter",
    theme: "A Story I Wanted To Tell You",
    poetry: "The moon is beautiful, isn't it?",
    content: [
      "Welcome to the final chapter. 🌙",

      "If you have reached here, it means you walked through this little journey with me from the beginning. Thank you for giving your time to read every page.",

      "Every chapter was created from things I noticed, moments I remembered, and feelings that slowly became important to me.",

      "The birthday wish, the memories, the little things I noticed about you, and all the words in these pages were not just random. They were pieces of a story that I wanted to share with you.",

      "For a long time, I have been grateful to know you. I have enjoyed our conversations, our moments together, and the happiness that came from simply spending time with you.",

      "Today, I finally wanted to tell you something that has been in my heart for a long time.",

      "I like you. ❤️",

      "More than that, I have realized that my feelings for you have grown into something deeper. You became someone very special to me, someone I truly care about.",

      "I don't know what the future will bring, and I don't want to put any pressure on you. I just wanted you to know the truth about how I feel.",

      "Whatever your answer is, I am thankful for every smile, every conversation, and every memory we have shared.",

      "Thank you for being you. Thank you for becoming a beautiful part of my story.",

      "The moon is beautiful, isn't it? 🌙❤️",
    ],
  },
];
