<script>
  import { setContext } from "svelte";
  import { v4 as uuidv4 } from "uuid";
  let lostPets = [
    {
      id: uuidv4(),
      name: "Pepper",
      location: "Jasola",
      contact: "12345 67890",
      imgSrc: "/dog.png",
    },
    {
      id: uuidv4(),
      name: "Pepper",
      location: "Jasola",
      contact: "12345 67890",
      imgSrc: "/dog.png",
    },
    {
      id: uuidv4(),
      name: "Pepper",
      location: "Jasola",
      contact: "12345 67890",
      imgSrc: "/dog.png",
    },
    {
      id: uuidv4(),
      name: "Pepper",
      location: "Jasola",
      contact: "12345 67890",
      imgSrc: "/dog.png",
    },
    {
      id: uuidv4(),
      name: "Pepper",
      location: "Jasola",
      contact: "12345 67890",
      imgSrc: "/dog.png",
    },
    {
      id: uuidv4(),
      name: "Pepper",
      location: "Jasola",
      contact: "12345 67890",
      imgSrc: "/dog.png",
    },
    {
      id: uuidv4(),
      name: "Pepper",
      location: "Jasola",
      contact: "12345 67890",
      imgSrc: "/dog.png",
    },
  ];
  setContext("SOS_LOST_PETS", lostPets);
</script>
