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
]

export const getMountainById = async (_: string): Promise<Mountain> =>
  database[0]
export const getMountains = async (): Promise<Mountain[]> => database
