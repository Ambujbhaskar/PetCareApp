import { error } from "@sveltejs/kit";
import { v4 as uuidv4 } from "uuid";
/** @type {import('./$types').PageLoad} */

export function load() {
  return {
    lostPets: [
      {
        id: uuidv4(),
        name: "Pepper",
        location: "Jasola",
        contact: "12345 67890",
        imgSrc: "/dog.png",
        dateMissing: "17 March 2023",
        notes:
          "Responds to his name. Friendly. Green collar. Last seen near the park. 1 year old",
        reward: 2000,
      },
      {
        id: uuidv4(),
        name: "Pepper",
        location: "Jasola",
        contact: "12345 67890",
        imgSrc: "/dog.png",
        dataMissing: "17 March 2023",
        notes:
          "Responds to his name. Friendly. Green collar. Last seen near the park. 1 year old",
        reward: 2000,
      },
      {
        id: uuidv4(),
        name: "Pepper",
        location: "Jasola",
        contact: "12345 67890",
        imgSrc: "/dog.png",
        dataMissing: "17 March 2023",
        notes:
          "Responds to his name. Friendly. Green collar. Last seen near the park. 1 year old",
        reward: 2000,
      },
      {
        id: uuidv4(),
        name: "Pepper",
        location: "Jasola",
        contact: "12345 67890",
        imgSrc: "/dog.png",
        dataMissing: "17 March 2023",
        notes:
          "Responds to his name. Friendly. Green collar. Last seen near the park. 1 year old",
        reward: 2000,
      },
      {
        id: uuidv4(),
        name: "Pepper",
        location: "Jasola",
        contact: "12345 67890",
        imgSrc: "/dog.png",
        dataMissing: "17 March 2023",
        notes:
          "Responds to his name. Friendly. Green collar. Last seen near the park. 1 year old",
        reward: 2000,
      },
      {
        id: uuidv4(),
        name: "Pepper",
        location: "Jasola",
        contact: "12345 67890",
        imgSrc: "/dog.png",
        dataMissing: "17 March 2023",
        notes:
          "Responds to his name. Friendly. Green collar. Last seen near the park. 1 year old",
        reward: 2000,
      },
      {
        id: uuidv4(),
        name: "Pepper",
        location: "Jasola",
        contact: "12345 67890",
        imgSrc: "/dog.png",
        dataMissing: "17 March 2023",
        notes:
          "Responds to his name. Friendly. Green collar. Last seen near the park. 1 year old",
        reward: 2000,
      },
    ],
  };
}
