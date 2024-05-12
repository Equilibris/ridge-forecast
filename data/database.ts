import { Mountain } from "./models"

const database: Mountain[] = [
  {
    id: 0,
    name: "hello world",

    popularity: 2,
    avalancheSafety: "safe",
    pos: { latitude: 45.1075864, longitude: 5.7757925 },
    data: {
      type: "ski",
      conditions: "mid",
      pistes: [
        { popularity: 1, difficulty: "red", name: "hello", snowQuality: 0.4 },
      ],
    },
    wind: [],
    precipitation: [],
    temps: [-3, -15],
    height: 1200,
    baseCamp: 300,
    emergency_services: [],
  },
]

export const getMountainById = async (_: string): Promise<Mountain> =>
  database[0]
export const getMountains = async (): Promise<Mountain[]> => database
