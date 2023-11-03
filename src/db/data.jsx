// class Data {
//   //prettier-ignore
//   constructor(
//     id,
//     {username, occupation, tag, pfp, aboutMe, status, story, displayImg, friends, friendRequest, blocked, isOnline, chatId},
//   ) {
//       this.id = id;
//       this.username = username;
//       this.occupation = occupation;
//       this.tag = tag;
//       this.pfp = pfp;
//       this.aboutMe = aboutMe;
//       this.status = status;
//       this.story = {
//         tag,
//         ...story
//       };
//       this.displayImg = [...displayImg];
//       this.friends = [...friends];
//       this.friendRequest = [...friendRequest];
//       this.blocked = [...blocked];
//       this.isOnline = isOnline;
//       this.chatId = chatId;
//     }
// }

// DEFAULT DATA
export const data = [
  // new Data("AAA01", {
  //   username: "Sarah Wilson",
  //   occupation: "Software Engineer",
  //   tag: "@sarahwls",
  //   pfp: "mEZ3PoFGs_k",
  //   aboutMe: `"Hi, I'm Sarah – a software engineer by day, photographer by night, weaving code and taste into my digital world."`,
  //   status: {
  //     country: "Indonesia",
  //     city: "Jakarta",
  //     activity: "Undergrad, Student",
  //     loveStatus: "Single",
  //     age: "21",
  //   },
  //   story: {
  //     dateCreated: Date.now(),
  //     storyImage: "z4ELCkNmnz0",
  //     storyDescription:
  //       "Peaceful sea breeze in nearby beach",
  //   },
  //   displayImg: [
  //     "9S82-KpAEnE",
  //     "JDrTqKyYPEY",
  //     "oX91BBCi9z4",
  //   ],
  //   friends: ["AAA02", "AAA05", "AAA09"],
  //   friendRequest: ["AAA07", "AAA03"],
  //   blocked: ["AAA10"],
  //   isOnline: Math.random() > 0.5,
  //   chatId: "CCC01",
  // }),
  // new Data("AAA02", {
  //   username: "John Doe",
  //   occupation: "Graphic Designer",
  //   tag: "@johndoe",
  //   pfp: "bodgc6H44FA",
  //   aboutMe: `"Hello there! I'm John, a passionate graphic designer who loves to create visually appealing designs that leave a lasting impression."`,
  //   status: {
  //     country: "Indonesia",
  //     city: "Bandung",
  //     activity: "Freelancer",
  //     loveStatus: "In a Relationship",
  //     age: "25",
  //   },
  //   story: {
  //     dateCreated: Date.now(),
  //     storyImage: "numwIW6i8Iw",
  //     storyDescription:
  //       "Exploring the beauty of nature in Bandung",
  //   },
  //   displayImg: [
  //     "r7eNm-rS8uM",
  //     "9aEILfISeAg",
  //     "I5j46lqAo-o",
  //   ],
  //   friends: ["AAA01", "AAA03", "AAA04"],
  //   friendRequest: ["AAA08"],
  //   blocked: [],
  //   isOnline: Math.random() > 0.5,
  //   chatId: "CCC01",
  // }),
  // new Data("AAA03", {
  //   username: "Linda Smith",
  //   occupation: "Teacher",
  //   tag: "@lindasmith",
  //   pfp: "3TLl_97HNJo",
  //   aboutMe: `"Hi, I'm Linda, a dedicated teacher who finds joy in shaping young minds and fostering a love for learning."`,
  //   status: {
  //     country: "Indonesia",
  //     city: "Surabaya",
  //     activity: "Elementary School Teacher",
  //     loveStatus: "Married",
  //     age: "32",
  //   },
  //   story: {
  //     dateCreated: Date.now(),
  //     storyImage: "d5dIch5tkzs",
  //     storyDescription:
  //       "Educational field trip with my students",
  //   },
  //   displayImg: [
  //     "hxz83k3Ofi0",
  //     "uFLoYNqwbFg",
  //     "4h3GMAnAE-I",
  //   ],
  //   friends: ["AAA01", "AAA02", "AAA05", "AAA07"],
  //   friendRequest: [],
  //   blocked: [],
  //   isOnline: Math.random() > 0.5,
  //   chatId: "CCC01",
  // }),
  // new Data("AAA04", {
  //   username: "Michael Johnson",
  //   occupation: "Doctor",
  //   tag: "@michaeljohnson",
  //   pfp: "RukI4qZGlQs",
  //   aboutMe: `"Greetings! I'm Dr. Michael, a compassionate doctor dedicated to improving people's lives through medical expertise and care."`,
  //   status: {
  //     country: "Indonesia",
  //     city: "Yogyakarta",
  //     activity: "General Practitioner",
  //     loveStatus: "Married",
  //     age: "35",
  //   },
  //   story: {
  //     dateCreated: Date.now(),
  //     storyImage: "epQdtCvBrc4",
  //     storyDescription:
  //       "Volunteering at a local medical camp",
  //   },
  //   displayImg: [
  //     "aor99_D9QGM",
  //     "fYTVHcpak2g",
  //     "jDqwzyP3MlA",
  //   ],
  //   friends: ["AAA01", "AAA03", "AAA05", "AAA06"],
  //   friendRequest: ["AAA09"],
  //   blocked: [],
  //   isOnline: Math.random() > 0.5,
  //   chatId: "CCC01",
  // }),
  // new Data("AAA05", {
  //   username: "Emily Lee",
  //   occupation: "Entrepreneur",
  //   tag: "@emilylee",
  //   pfp: "2rIs8OH5ng0",
  //   aboutMe: `"Hey, I'm Emily, a passionate entrepreneur who believes in the power of innovation and creativity to transform the world."`,
  //   status: {
  //     country: "Indonesia",
  //     city: "Bali",
  //     activity: "Startup Founder",
  //     loveStatus: "In a Relationship",
  //     age: "28",
  //   },
  //   story: {
  //     dateCreated: Date.now(),
  //     storyImage: "f0K_OLxdNcw",
  //     storyDescription:
  //       "Exploring the vibrant culture of Bali",
  //   },
  //   displayImg: [
  //     "IqI5MQi6R0c",
  //     "yx7TJle8LhM",
  //     "T3aGt4SlN_M",
  //   ],
  //   friends: ["AAA01", "AAA03", "AAA04", "AAA06"],
  //   friendRequest: ["AAA10"],
  //   blocked: [],
  //   isOnline: Math.random() > 0.5,
  //   chatId: "CCC01",
  // }),
  // new Data("AAA06", {
  //   username: "Daniel Kim",
  //   occupation: "Architect",
  //   tag: "@danielkim",
  //   pfp: "vEjg_eDaR0Q",
  //   aboutMe: `"Greetings! I'm Daniel, an architect passionate about designing sustainable and innovative spaces that inspire and elevate communities."`,
  //   status: {
  //     country: "Indonesia",
  //     city: "Bandung",
  //     activity: "Architect",
  //     loveStatus: "Single",
  //     age: "30",
  //   },
  //   story: {
  //     dateCreated: Date.now(),
  //     storyImage: "kiv1ggvkgQk",
  //     storyDescription:
  //       "Showcasing my latest architectural project",
  //   },
  //   displayImg: [
  //     "BzZ485WpIZw",
  //     "rVC6O_gDE0Q",
  //     "lc9uYwe54us",
  //   ],
  //   friends: ["AAA01", "AAA05", "AAA07", "AAA10"],
  //   friendRequest: ["AAA08"],
  //   blocked: [],
  //   isOnline: Math.random() > 0.5,
  //   chatId: "CCC01",
  // }),
  // new Data("AAA07", {
  //   username: "Nadia Rahman",
  //   occupation: "Writer",
  //   tag: "@nadiar",
  //   pfp: "lxsduAdWXy4",
  //   aboutMe: `"Hello! I'm Nadia, a writer who believes in the power of words to create change, inspire minds, and tell compelling stories."`,
  //   status: {
  //     country: "Indonesia",
  //     city: "Surabaya",
  //     activity: "Freelance Writer",
  //     loveStatus: "Single",
  //     age: "27",
  //   },
  //   story: {
  //     dateCreated: Date.now(),
  //     storyImage: "ip9R11FMbV8",
  //     storyDescription:
  //       "Lost in the world of books and imagination",
  //   },
  //   displayImg: [
  //     "w5QDlbjJwEY",
  //     "mo9VZnIfRIU",
  //     "cYy-o9i8aCs",
  //   ],
  //   friends: ["AAA01", "AAA03", "AAA04", "AAA09"],
  //   friendRequest: [],
  //   blocked: [],
  //   isOnline: Math.random() > 0.5,
  //   chatId: "CCC01",
  // }),
  // new Data("AAA08", {
  //   username: "Elena Martinez",
  //   occupation: "Chef",
  //   tag: "@elenam",
  //   pfp: "6W4F62sN_yI",
  //   aboutMe: `"Hola! I'm Elena, a chef with a passion for creating delightful culinary experiences that tantalize taste buds and warm hearts."`,
  //   status: {
  //     country: "Indonesia",
  //     city: "Bali",
  //     activity: "Restaurant Owner",
  //     loveStatus: "Married",
  //     age: "34",
  //   },
  //   story: {
  //     dateCreated: Date.now(),
  //     storyImage: "feAeauewzF0",
  //     storyDescription: "Cooking up a storm in the kitchen",
  //   },
  //   displayImg: [
  //     "enG-8kd_2qc",
  //     "xhMz5xIbhRg",
  //     "iczxV56AsXg",
  //   ],
  //   friends: ["AAA03", "AAA07", "AAA09"],
  //   friendRequest: [],
  //   blocked: ["AAA05"],
  //   isOnline: Math.random() > 0.5,
  //   chatId: "CCC01",
  // }),
  // new Data("AAA09", {
  //   username: "Olivia Tan",
  //   occupation: "Fashion Designer",
  //   pfp: "6LZuSzSwso0",
  //   tag: "@oliviatan",
  //   aboutMe: `"Hey there! I'm Olivia, a fashion designer dedicated to creating unique and stylish clothing that reflects personality and confidence."`,
  //   status: {
  //     country: "Indonesia",
  //     city: "Jakarta",
  //     activity: "Fashion Designer",
  //     loveStatus: "In a Relationship",
  //     age: "29",
  //   },
  //   story: {
  //     dateCreated: Date.now(),
  //     storyImage: "ShAHFTy-HKQ",
  //     storyDescription:
  //       "Behind the scenes at a fashion show",
  //   },
  //   displayImg: [
  //     "3b22YhWeYMU",
  //     "7CKUpr_WHJk",
  //     "Y3Mr-tGXrS0",
  //   ],
  //   friends: ["AAA01", "AAA03", "AAA05", "AAA08"],
  //   friendRequest: [],
  //   blocked: [],
  //   isOnline: Math.random() > 0.5,
  //   chatId: "CCC01",
  // }),
  // new Data("AAA10", {
  //   username: "Mark Johnson",
  //   occupation: "Engineer",
  //   tag: "@markj",
  //   pfp: "oRsSeYqJUgY",
  //   aboutMe: `"Hi, I'm Mark, an engineer who finds joy in solving complex problems and turning innovative ideas into reality."`,
  //   status: {
  //     country: "Indonesia",
  //     city: "Yogyakarta",
  //     activity: "Mechanical Engineer",
  //     loveStatus: "Single",
  //     age: "31",
  //   },
  //   story: {
  //     dateCreated: Date.now(),
  //     storyImage: "K7OUs6y_cm8",
  //     storyDescription:
  //       "Testing a new prototype at the workshop",
  //   },
  //   displayImg: [
  //     "g6Me5mUQQIQ",
  //     "k9tjyC1D7BY",
  //     "aGT4YgcOMMw",
  //   ],
  //   friends: ["AAA02", "AAA06", "AAA08"],
  //   friendRequest: ["AAA04"],
  //   blocked: [],
  //   isOnline: Math.random() > 0.5,
  //   chatId: "CCC01",
  // }),
];

export const db = {
  AAA01: {
    username: "Sarah Wilson",
    id: "AAA01",
    occupation: "Software Engineer",
    tag: "@sarahwls",
    pfp: "mEZ3PoFGs_k",
    aboutMe: `"Hi, I'm Sarah – a software engineer by day, photographer by night, weaving code and taste into my digital world."`,
    status: {
      country: "Indonesia",
      city: "Jakarta",
      activity: "Undergrad, Student",
      loveStatus: "Single",
      age: "21",
      tag: "@sarahwls",
    },
    story: {
      dateCreated: Date.now(),
      storyImage: "z4ELCkNmnz0",
      storyDescription:
        "Peaceful sea breeze in nearby beach",
    },
    displayImg: [
      "9S82-KpAEnE",
      "JDrTqKyYPEY",
      "oX91BBCi9z4",
    ],
    friends: ["AAA02", "AAA05", "AAA09"],
    friendRequest: ["AAA07", "AAA03"],
    blocked: ["AAA10"],
    isOnline: Math.random() > 0.5,
    chatId: "CCC01",
  },
  AAA02: {
    username: "John Doe",
    id: "AAA02",
    occupation: "Graphic Designer",
    tag: "@johndoe",
    pfp: "bodgc6H44FA",
    aboutMe: `"Hello there! I'm John, a passionate graphic designer who loves to create visually appealing designs that leave a lasting impression."`,
    status: {
      country: "Indonesia",
      city: "Bandung",
      activity: "Freelancer",
      loveStatus: "In a Relationship",
      age: "25",
    },
    story: {
      dateCreated: Date.now(),
      storyImage: "numwIW6i8Iw",
      storyDescription:
        "Exploring the beauty of nature in Bandung",
      tag: "@johndoe",
    },
    displayImg: [
      "r7eNm-rS8uM",
      "9aEILfISeAg",
      "I5j46lqAo-o",
    ],
    friends: ["AAA01", "AAA03", "AAA04"],
    friendRequest: ["AAA08"],
    blocked: [],
    isOnline: Math.random() > 0.5,
    chatId: "CCC01",
  },
  AAA03: {
    username: "Linda Smith",
    id: "AAA03",
    occupation: "Teacher",
    tag: "@lindasmith",
    pfp: "3TLl_97HNJo",
    aboutMe: `"Hi, I'm Linda, a dedicated teacher who finds joy in shaping young minds and fostering a love for learning."`,
    status: {
      country: "Indonesia",
      city: "Surabaya",
      activity: "Elementary School Teacher",
      loveStatus: "Married",
      age: "32",
    },
    story: {
      dateCreated: Date.now(),
      storyImage: "d5dIch5tkzs",
      storyDescription:
        "Educational field trip with my students",
      tag: "@lindasmith",
    },
    displayImg: [
      "hxz83k3Ofi0",
      "uFLoYNqwbFg",
      "4h3GMAnAE-I",
    ],
    friends: ["AAA01", "AAA02", "AAA05", "AAA07"],
    friendRequest: [],
    blocked: [],
    isOnline: Math.random() > 0.5,
    chatId: "CCC01",
  },
  AAA04: {
    username: "Michael Johnson",
    id: "AAA04",
    occupation: "Doctor",
    tag: "@michaeljohnson",
    pfp: "RukI4qZGlQs",
    aboutMe: `"Greetings! I'm Dr. Michael, a compassionate doctor dedicated to improving people's lives through medical expertise and care."`,
    status: {
      country: "Indonesia",
      city: "Yogyakarta",
      activity: "General Practitioner",
      loveStatus: "Married",
      age: "35",
    },
    story: {
      dateCreated: Date.now(),
      storyImage: "epQdtCvBrc4",
      storyDescription:
        "Volunteering at a local medical camp",
      tag: "@michaeljohnson",
    },
    displayImg: [
      "aor99_D9QGM",
      "fYTVHcpak2g",
      "jDqwzyP3MlA",
    ],
    friends: ["AAA01", "AAA03", "AAA05", "AAA06"],
    friendRequest: ["AAA09"],
    blocked: [],
    isOnline: Math.random() > 0.5,
    chatId: "CCC01",
  },
  AAA05: {
    username: "Emily Lee",
    id: "AAA05",
    occupation: "Entrepreneur",
    tag: "@emilylee",
    pfp: "2rIs8OH5ng0",
    aboutMe: `"Hey, I'm Emily, a passionate entrepreneur who believes in the power of innovation and creativity to transform the world."`,
    status: {
      country: "Indonesia",
      city: "Bali",
      activity: "Startup Founder",
      loveStatus: "In a Relationship",
      age: "28",
    },
    story: {
      dateCreated: Date.now(),
      storyImage: "f0K_OLxdNcw",
      storyDescription:
        "Exploring the vibrant culture of Bali",
      tag: "@emilylee",
    },
    displayImg: [
      "IqI5MQi6R0c",
      "yx7TJle8LhM",
      "T3aGt4SlN_M",
    ],
    friends: ["AAA01", "AAA03", "AAA04", "AAA06"],
    friendRequest: ["AAA10"],
    blocked: [],
    isOnline: Math.random() > 0.5,
    chatId: "CCC01",
  },
  AAA06: {
    username: "Daniel Kim",
    id: "AAA06",
    occupation: "Architect",
    tag: "@danielkim",
    pfp: "vEjg_eDaR0Q",
    aboutMe: `"Greetings! I'm Daniel, an architect passionate about designing sustainable and innovative spaces that inspire and elevate communities."`,
    status: {
      country: "Indonesia",
      city: "Bandung",
      activity: "Architect",
      loveStatus: "Single",
      age: "30",
    },
    story: {
      dateCreated: Date.now(),
      storyImage: "kiv1ggvkgQk",
      storyDescription:
        "Showcasing my latest architectural project",
      pfp: "vEjg_eDaR0Q",
    },
    displayImg: [
      "BzZ485WpIZw",
      "rVC6O_gDE0Q",
      "lc9uYwe54us",
    ],
    friends: ["AAA01", "AAA05", "AAA07", "AAA10"],
    friendRequest: ["AAA08"],
    blocked: [],
    isOnline: Math.random() > 0.5,
    chatId: "CCC01",
  },
  AAA07: {
    username: "Nadia Rahman",
    id: "AAA07",
    occupation: "Writer",
    tag: "@nadiar",
    pfp: "lxsduAdWXy4",
    aboutMe: `"Hello! I'm Nadia, a writer who believes in the power of words to create change, inspire minds, and tell compelling stories."`,
    status: {
      country: "Indonesia",
      city: "Surabaya",
      activity: "Freelance Writer",
      loveStatus: "Single",
      age: "27",
    },
    story: {
      dateCreated: Date.now(),
      storyImage: "ip9R11FMbV8",
      storyDescription:
        "Lost in the world of books and imagination",
      tag: "@nadiar",
    },
    displayImg: [
      "w5QDlbjJwEY",
      "mo9VZnIfRIU",
      "cYy-o9i8aCs",
    ],
    friends: ["AAA01", "AAA03", "AAA04", "AAA09"],
    friendRequest: [],
    blocked: [],
    isOnline: Math.random() > 0.5,
    chatId: "CCC01",
  },
  AAA08: {
    username: "Elena Martinez",
    id: "AAA08",
    occupation: "Chef",
    tag: "@elenam",
    pfp: "6W4F62sN_yI",
    aboutMe: `"Hola! I'm Elena, a chef with a passion for creating delightful culinary experiences that tantalize taste buds and warm hearts."`,
    status: {
      country: "Indonesia",
      city: "Bali",
      activity: "Restaurant Owner",
      loveStatus: "Married",
      age: "34",
    },
    story: {
      dateCreated: Date.now(),
      storyImage: "feAeauewzF0",
      storyDescription: "Cooking up a storm in the kitchen",
      tag: "@elenam",
    },
    displayImg: [
      "enG-8kd_2qc",
      "xhMz5xIbhRg",
      "iczxV56AsXg",
    ],
    friends: ["AAA03", "AAA07", "AAA09"],
    friendRequest: [],
    blocked: ["AAA05"],
    isOnline: Math.random() > 0.5,
    chatId: "CCC01",
  },
  AAA09: {
    username: "Olivia Tan",
    id: "AAA09",
    occupation: "Fashion Designer",
    pfp: "6LZuSzSwso0",
    tag: "@oliviatan",
    aboutMe: `"Hey there! I'm Olivia, a fashion designer dedicated to creating unique and stylish clothing that reflects personality and confidence."`,
    status: {
      country: "Indonesia",
      city: "Jakarta",
      activity: "Fashion Designer",
      loveStatus: "In a Relationship",
      age: "29",
    },
    story: {
      dateCreated: Date.now(),
      storyImage: "ShAHFTy-HKQ",
      storyDescription:
        "Behind the scenes at a fashion show",
      tag: "@oliviatan",
    },
    displayImg: [
      "3b22YhWeYMU",
      "7CKUpr_WHJk",
      "Y3Mr-tGXrS0",
    ],
    friends: ["AAA01", "AAA03", "AAA05", "AAA08"],
    friendRequest: [],
    blocked: [],
    isOnline: Math.random() > 0.5,
    chatId: "CCC01",
  },
  AAA10: {
    username: "Mark Johnson",
    id: "AAA10",
    occupation: "Engineer",
    tag: "@markj",
    pfp: "oRsSeYqJUgY",
    aboutMe: `"Hi, I'm Mark, an engineer who finds joy in solving complex problems and turning innovative ideas into reality."`,
    status: {
      country: "Indonesia",
      city: "Yogyakarta",
      activity: "Mechanical Engineer",
      loveStatus: "Single",
      age: "31",
    },
    story: {
      dateCreated: Date.now(),
      storyImage: "K7OUs6y_cm8",
      storyDescription:
        "Testing a new prototype at the workshop",
      tag: "@markj",
    },
    displayImg: [
      "g6Me5mUQQIQ",
      "k9tjyC1D7BY",
      "aGT4YgcOMMw",
    ],
    friends: ["AAA02", "AAA06", "AAA08"],
    friendRequest: ["AAA04"],
    blocked: [],
    isOnline: Math.random() > 0.5,
    chatId: "CCC01",
  },
};

export const setDb = (newData, targetId) => {
  db[targetId] = newData;
};

// MOCK DATABASE
