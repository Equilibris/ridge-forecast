export type AvalancheSafety = "safe" | "moderate" | "severe" | "suicide"
export type Popularity = 0 | 1 | 2 | 3
export type Condition = "good" | "mid" | "bad"
export type PrecipitationType = "rain" | "snow" | "clear"

/// type, percent
export type Precipitation = [PrecipitationType, number][]

export interface Pos {
  latitude: number
  longitude: number
}

export interface EmergencyService {
  pos: Pos
}

export interface Climb {
  type: "climb"
  conditions: Condition

  /** percent */
  humidity: number

  /** hours */
  last_percipitation: number

  /** percent */
  grip: number

  gear: string[]
}

export interface Piste {
  // source
  // https://www.quora.com/What-are-the-standard-difficulty-levels-of-ski-slopes
  difficulty: "blue" | "red" | "black"

  name: string

  /** percent */
  snowQuality: number

  popularity: Popularity
}

export interface Ski {
  type: "ski"
  conditions: Condition

  pistes: Piste[]
}

export interface Mountain {
  id: number

  name: string

  pos: Pos

  height: number
  baseCamp: number
  popularity: Popularity

  /** base, top */
  temps: [number, number]

  avalancheSafety: AvalancheSafety

  emergency_services: EmergencyService[]

  /** type, percent */
  precipitation: Precipitation

  /** angle, speed */
  wind: [number, number][]

  data: Ski | Climb
}
