export const chatDb = {
  CCC01: {
    id: "CCC01",
    user: ["AAA01", "AAA05"],
    chatLog: [
      {
        user: "AAA01",
        timestamp: new Date().getTime(),
        message: "Hey, how's it going?",
      },
      {
        user: "AAA01",
        timestamp: new Date().getTime(),
        message: "I just finished reading a great book. It's a must-read!",
      },
      {
        user: "AAA01",
        timestamp: new Date().getTime(),
        message: "Have you read any good books lately?",
      },
      {
        user: "AAA05",
        timestamp: new Date().getTime(),
        message: "Oh, really? What's the title?",
      },
      {
        user: "AAA05",
        timestamp: new Date().getTime(),
        message: "Not recently. Any recommendations?",
      },
      {
        user: "AAA05",
        timestamp: new Date().getTime(),
        message: "I've heard about it. I'll definitely check it out. Thanks!",
      },
      {
        user: "AAA01",
        timestamp: new Date().getTime(),
        message:
          "How about 'The Alchemist'? It's a classic with a profound message.",
      },
      {
        user: "AAA01",
        timestamp: new Date().getTime(),
        message: "Sure thing! Let me know what you think after you read it.",
      },
      {
        user: "AAA01",
        timestamp: new Date().getTime(),
        message:
          "Absolutely, will do! By the way, did you catch the latest episode of that TV series we like?",
      },
      {
        user: "AAA01",
        timestamp: new Date().getTime(),
        message:
          "Not yet! I'm planning to watch it tonight. No spoilers, please!",
      },
      {
        user: "AAA01",
        timestamp: new Date().getTime(),
        message: "No worries, lips sealed! Enjoy the episode!",
      },
      {
        user: "AAA05",
        timestamp: new Date().getTime(),
        message:
          "I recently tried a new recipe. It turned out surprisingly well!",
      },
      {
        user: "AAA05",
        timestamp: new Date().getTime(),
        message: "If you're into cooking, I can share the details with you.",
      },
      {
        user: "AAA01",
        timestamp: new Date().getTime(),
        message:
          "That sounds delicious! Please share the recipe. I love trying new things in the kitchen.",
      },
      {
        user: "AAA05",
        timestamp: new Date().getTime(),
        message: "Sure thing! It's a simple pasta dish with a twist.",
      },
      {
        user: "AAA05",
        timestamp: new Date().getTime(),
        message:
          "First, you sauté garlic and onions, then add your favorite veggies and pasta sauce.",
      },
      {
        user: "AAA05",
        timestamp: new Date().getTime(),
        message:
          "Finally, mix in some cooked pasta and top it with grated Parmesan. Voilà!",
      },
      {
        user: "AAA01",
        timestamp: new Date().getTime(),
        message:
          "That sounds amazing! I'll definitely try it out this weekend. Thanks for sharing!",
      },
      {
        user: "AAA05",
        timestamp: new Date().getTime(),
        message:
          "You're welcome! Let me know how it turns out. Enjoy your cooking adventure!",
      },
    ],
  },
};

export const setChatDb = (newData, targetId, type) => {
  // if (type === "modify_chat") chatDb[targetId].chatLog = newData;
  if (type === "update_chat") {
    chatDb[targetId] = newData;
  }
  // if (type === "new_chat") {
  //   const newId = uuid();
  //   chatDb[newId] = { id: newId, user: [newData], chatLog: [] };
  // }
};

// 10
// 20
/*
10 <-> 20

activeUser.id = 10
targerUser.id = 20

if(obj.user includes activeUser.id && obj.user includes === targetUser.id)

[{
  user: [10, 20];
  chat : [
    {
      user : 10
      chat: ...
      timestamp: ...
    },
    {
      user : 20
      chat: ...
      timestamp: ...
    },
    {
      user : 10
      chat: ...
      timestamp: ...
    }
  ]
}]
*/
