import { writable } from "svelte/store";

export const pet = writable(0);

export const user = writable(
	{
		name: "Joseph",
		email: "joebiden17@gmail.com",
		phone: "9202035812",
		pets: [
			{
				id: 0,
				name: "Zarun",
				species: "Cat",
				weight: "100",
				breed: "Persian Tabby",
				dob: "1 Jan 2023",
				bloodGroup: "A+",
				notes: "Zarun is a wholesome little chunger who loves to eat and sleep.",
				src: "/zarun.png",
				appointments: [
					{
						id: 1,
						dateTime: "17 March 2023 5:00 PM",
						clinic: "Friendicoes",
						doctor: "Dr. Padam",
						vaccines: ["FHV-1, FeLV"],
						completed: true,
						location: {
								lat: "28.5535",
								lng: "77.2661"
						}
					},
					{
						id: 2,
						dateTime: "31 Jan 2023 4:20 PM",
						clinic: "Friendicoes",
						doctor: "Dr. Padam",
						completed: true,
						location: {
								lat: "28.5535",
								lng: "77.2661"
						}
					},
					{
						id: 3,
						dateTime: "6 Jul 2023 9:00 AM",
						clinic: "Friendicoes",
						doctor: "Dr. Padam",
						vaccines: ["FHV-1, FeLV"],
						completed: false,
						location: {
								lat: "28.5535",
								lng: "77.2661"
						}
					},
					{
						id: 4,
						dateTime: "2 Jun 2023 5:00 PM",
						clinic: "Friendicoes",
						doctor: "Dr. Padam",
						completed: false,
						location: {
								lat: "28.5535",
								lng: "77.2661"
						}
					},
					{
						id: 5,
						dateTime: "22 May 2023 5:00 PM",
						clinic: "Friendicoes",
						doctor: "Dr. Padam",
						vaccines: ["FHV-1, FeLV"],
						completed: false,
						location: {
								lat: "28.5535",
								lng: "77.2661"
						}
					},
					{
						id: 6,
						dateTime: "12 February 2023 6:00 PM",
						clinic: "Friendicoes",
						doctor: "Dr. Padam",
						vaccines: ["FHV-1, FeLV"],
						completed: false,
						location: {
								lat: "28.5535",
								lng: "77.2661"
						}
					},
					{
						id: 7,
						dateTime: "9 April 2023 12:30 PM",
						clinic: "Friendicoes",
						doctor: "Dr. Padam",
						vaccines: ["FHV-1, FeLV"],
						completed: false,
						location: {
								lat: "28.5535",
								lng: "77.2661"
						}
					}
				]
			},
			{
				id: 1,
				name: "Rocky",
				species: "Dog",
				weight: "10",
				breed: "German Shepherd",
				dob: "13 Feb 2023",
				bloodGroup: "B+",
				notes: "Rocky is not dog he is cat",
				src: "/dog.png",
				appointments: [
					{
						id: 1,
						dateTime: "17 March 2023 5:00 PM",
						clinic: "Friendicoes",
						doctor: "Dr. Manas",
						vaccines: ["FHV-1, FeLV"],
						completed: true,
						location: {
								lat: "28.5535",
								lng: "77.2661"
						}
					},
					{
						id: 2,
						dateTime: "31 Jan 2023 4:20 PM",
						clinic: "Friendicoes",
						doctor: "Dr. Padam",
						completed: true,
						location: {
								lat: "28.5535",
								lng: "77.2661"
						}
					},
					{
						id: 3,
						dateTime: "6 Jul 2023 9:00 AM",
						clinic: "Friendicoes",
						doctor: "Dr. Padam",
						vaccines: ["FHV-1, FeLV"],
						completed: false,
						location: {
								lat: "28.5535",
								lng: "77.2661"
						}
					},
					{
						id: 4,
						dateTime: "2 Jun 2023 5:00 PM",
						clinic: "Friendicoes",
						doctor: "Dr. Padam",
						completed: false,
						location: {
								lat: "28.5535",
								lng: "77.2661"
						}
					}
				]
			}
		],
		savedArticles: [2, 3],
		lostPetRequests: [
			{
				id: 0,
				name: "Pepper",
				imgSrc: "/dog.png",
				lastSeen: "Jasola",
				location: {
					lat: "28.5512",
					lng: "77.2661"
				},
				dateTimeMissing: "17 March 2023 7:53 PM",
				contact: "9876467890",
				notes: "Responds to his name. Friendly. Green collar. Last seen near the park. 1 year old"
			}
		]
	}
);

export const lostPetRequests = writable(
	[
		{
			id: 0,
			name: "Pepper",
			imgSrc: "/dog.png",
			lastSeen: "Jasola",
			location: {
				lat: "28.5512",
				lng: "77.2661"
			},
			dateTimeMissing: "17 March 2023 7:53 PM",
			contact: "9876467890",
			notes: "Responds to his name. Friendly. Green collar. Last seen near the park. 1 year old"
		},
		{
			id: 1,
			name: "Pepper",
			imgSrc: "/dog.png",
			lastSeen: "Jasola",
			location: {
				lat: "28.5512",
				lng: "77.2661"
			},
			dateTimeMissing: "17 March 2023 7:53 PM",
			contact: "9876467890",
			notes: "Responds to his name. Friendly. Green collar. Last seen near the park. 1 year old"
		},
		{
			id: 2,
			name: "Pepper",
			imgSrc: "/dog.png",
			lastSeen: "Jasola",
			location: {
				lat: "28.5512",
				lng: "77.2661"
			},
			dateTimeMissing: "17 March 2023 7:53 PM",
			contact: "9876467890",
			notes: "Responds to his name. Friendly. Green collar. Last seen near the park. 1 year old"
		},
		{
			id: 3,
			name: "Pepper",
			imgSrc: "/dog.png",
			lastSeen: "Jasola",
			location: {
				lat: "28.5512",
				lng: "77.2661"
			},
			dateTimeMissing: "17 March 2023 7:53 PM",
			contact: "9876467890",
			notes: "Responds to his name. Friendly. Green collar. Last seen near the park. 1 year old"
		},
		{
			id: 4,
			name: "Pepper",
			imgSrc: "/dog.png",
			lastSeen: "Jasola",
			location: {
				lat: "28.5512",
				lng: "77.2661"
			},
			dateTimeMissing: "17 March 2023 7:53 PM",
			contact: "9876467890",
			notes: "Responds to his name. Friendly. Green collar. Last seen near the park. 1 year old"
		},
	]
);

export const articles = writable(
	[
    {
      id: 1,
      Type: "Nutrition",
      Title: "Wet vs Dry Food",
      Body: "When it comes to food, there are so many options ...",
      Imgsrc: "./zarun.png",
    },
    {
      id: 2,
      Type: "Nutrition",
      Title: "Wet vs Dry Food",
      Body: "When it comes to food, there are so many options ...",
      Imgsrc: "./zarun.png",
    },
    {
      id: 3,
      Type: "Nutrition",
      Title: "Wet vs Dry Food",
      Body: "When it comes to food, there are so many options ...",
      Imgsrc: "./profile-idle.svg",
    },
    {
      id: 4,
      Type: "Nutrition",
      Title: "Wet vs Dry Food",
      Body: "When it comes to food, there are so many options ...",
      Imgsrc: "./bookmark-unchecked.svg",
    },
    {
      id: 5,
      Type: "Nutrition",
      Title: "Wet vs Dry Food",
      Body: "When it comes to food, there are so many options amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus amongus",
      Imgsrc: "./zarun.png",
    }
  ]
);