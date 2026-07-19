export interface Chapter {
  day: number;
  unlockAt: string; // ISO string, local time
  title: string;
  theme: string;
  content: string[];
  poetry?: string;
  cards?: string[]; // used only on day 3 ("the little things")
}

// Note: day 1 and day 9 have their own dedicated components
// (Day1Birthday.tsx, Day9Confession.tsx) — these entries exist only
// so the unlock logic knows their dates. Their `content`/`poetry` here
// isn't rendered by the generic StoryBook.
export const chapters: Chapter[] = [
  {
    day: 1,
    unlockAt: "2026-05-27T00:00:00",
    title: "A Special Day For A Special Person",
    theme: "Happy Birthday",
    content: [],
  },
  {
    day: 2,
    unlockAt: "2026-05-28T20:00:00",
    title: "The Person I Notice",
    theme: "The First Chapter",
    content: [
      "Sometimes we don't realize when someone slowly becomes important in our life.",
      "It can be a smile, a small conversation, or simply the way someone treats others.",
    ],
    poetry: "The world seems brighter today.",
  },
  {
    day: 3,
    unlockAt: "2026-05-29T20:00:00",
    title: "Things You Probably Don't Notice",
    theme: "The Little Things",
    content: [
      "You may think these are normal things, but sometimes the smallest things are what make someone special.",
    ],
    cards: ["Your smile", "Your kindness", "Your laughter", "Your way of caring", "Your personality"],
    poetry: "You feel like home.",
  },
  {
    day: 4,
    unlockAt: "2026-05-30T20:00:00",
    title: "Moments I Keep Remembering",
    theme: "Memories",
    content: [
      "Some moments are short, but they stay with us for a long time.",
      "I don't know if you remember these moments, but I do.",
    ],
    poetry: "I could stay here forever.",
  },
  {
    day: 5,
    unlockAt: "2026-05-31T20:00:00",
    title: "Thank You For Being You",
    theme: "Thank You",
    content: [
      "I want to thank you. Not because you did something big, but because your existence itself has brought many beautiful moments.",
    ],
    poetry: "I'm glad you came.",
  },
  {
    day: 6,
    unlockAt: "2026-05-01T20:00:00",
    title: "A Road We Walk Together",
    theme: "The Journey",
    content: [
      "Every journey starts with a small step. Some people enter our lives and slowly become someone we don't want to lose.",
    ],
    poetry: "I hope tomorrow is sunny.",
  },
  {
    day: 7,
    unlockAt: "2026-05-02T20:00:00",
    title: "Words I Couldn't Say",
    theme: "The Unspoken Words",
    content: [
      "There are some feelings that are difficult to explain with words. Sometimes we keep them quietly inside our hearts because they are important.",
    ],
    poetry: "The night is quiet.",
  },
  {
    day: 8,
    unlockAt: "2026-05-03T20:00:00",
    title: "Almost Time",
    theme: "One More Day",
    content: [
      "Tomorrow is another ordinary day for the world, but maybe a memorable day for us.",
      "Some stories take time because the most important words deserve the right moment.",
    ],
    poetry: "I don't mind waiting.",
  },
  {
    day: 9,
    unlockAt: "2026-05-04T20:00:00",
    title: "The Words I Finally Said",
    theme: "The Confession Day",
    content: [],
  },
];