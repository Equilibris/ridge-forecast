import { Mountain } from "./models"

const database: Mountain[] = [
  {
    id: 0,
    name: "hellossss world",

    popularity: 2,
    avalancheSafety: "safe",
    pos: { latitude: 45.1075864, longitude: 5.7757925 },
    data: {
      type: "ski",
      conditions: "mid",
      pistes: [
        {
          name: "hello",
          difficulty: "red",
          popularity: 1,
          snowQuality: 0.5,
        },
        {
          name: "world",
          difficulty: "blue",
          popularity: 2,
          snowQuality: 0.6,
        },
      ],
    },
    wind: [],
    precipitation: [
      ["clear", 0.0],
      ["rain", 0.1],
      ["snow", 0.2],
      ["snow", 0.2],
      ["snow", 0.2],
      ["snow", 0.2],
      ["snow", 1],
      ["snow", 0.2],
      ["snow", 0.2],
      ["snow", 0.2],
      ["snow", 0.2],
    ],
    temps: [-3, -15],
    height: 1200,
    baseCamp: 300,
    emergency_services: [
      { pos: { latitude: 45.1075869, longitude: 5.7757926 } },
    ],
  },
  {
    id: 1,
    name: "Grenoble :scream: ??",

    popularity: 3,
    avalancheSafety: "moderate",
    pos: { latitude: 46.738056, longitude: 11.96 },
    data: {
      type: "ski",
      conditions: "mid",
      pistes: [
        { popularity: 1, difficulty: "red",   name: "Lumen",       snowQuality: 0.4 },
        { popularity: 2, difficulty: "black", name: "Sylvester",   snowQuality: 0.3 },
        { popularity: 2, difficulty: "black", name: "Trasse",      snowQuality: 0.5 },
        { popularity: 1, difficulty: "red",   name: "Seewiese",    snowQuality: 0.6 },
        { popularity: 1, difficulty: "black", name: "Seewiese 2R", snowQuality: 0.1 },
        { popularity: 2, difficulty: "blue",  name: "Seewiese 2C", snowQuality: 0.4 },
        { popularity: 2, difficulty: "red",   name: "Pramstall",   snowQuality: 0.4 },
        { popularity: 1, difficulty: "black", name: "Herrnegg",    snowQuality: 0.3 },
        { popularity: 3, difficulty: "blue",  name: "Olang 2",     snowQuality: 0.5 },
        { popularity: 2, difficulty: "blue",  name: "Plateau",     snowQuality: 0.7 },
        { popularity: 3, difficulty: "blue",  name: "Belvedere 7", snowQuality: 0.4 },
      ],
    },
    wind: [[135, 20]],
    precipitation: [["rain", 0.6]],
    temps: [2, -5],
    height: 2275,
    baseCamp: 900,
    emergency_services: [ 
      { pos: { latitude: 46.738156, longitude: 11.949 } }, 
    ]
  },
  {
    id: 2,
    name: "Val d'Isere",

    popularity: 3,
    avalancheSafety: "suicide",
    pos: { latitude: 50.059167, longitude: -122.956944 },
    data: {
      type: "ski",
      conditions: "good",
      pistes: [
        { popularity: 1, difficulty: "blue",  name: "Boucle Daille",              snowQuality: 0.4 },
        { popularity: 2, difficulty: "blue",  name: "Boucle Laisinant",           snowQuality: 0.3 },
        { popularity: 2, difficulty: "blue",  name: "Piste Fond Le Manchet",      snowQuality: 0.5 },
        { popularity: 1, difficulty: "red",   name: "Piste Fond Manchet Cascade", snowQuality: 0.6 },
        { popularity: 1, difficulty: "black", name: "Cretes",                     snowQuality: 0.1 },
        { popularity: 0, difficulty: "black", name: "Campanules",                 snowQuality: 0.2 },
        { popularity: 1, difficulty: "black", name: "Paquerettes",                snowQuality: 0.3 },
        { popularity: 2, difficulty: "blue",  name: "Cafo",                       snowQuality: 0.4 },
        { popularity: 3, difficulty: "blue",  name: "Lavachet",                   snowQuality: 0.4 },
        { popularity: 2, difficulty: "red",   name: "Edelweiss",                  snowQuality: 0.1 },
      ],
    },
    wind: [[185, 15]],
    precipitation: [["rain", 0.8]],
    temps: [9, -13],
    height: 3488,
    baseCamp: 1850,
    emergency_services: [ 
      { pos: { latitude: 46.738256, longitude: 11.849 } }, 
    ]
  },
]

export const getMountainById = async (_: string): Promise<Mountain> =>
  database[0]
export const getMountains = async (): Promise<Mountain[]> => database
