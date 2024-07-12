export interface Nationality {
  id: number,
  name: string,
}

export interface Position {
  id: number,
  name: string,
  short_name: string,
}

export interface Roster {
  birth_date: string,
  gender: string,
  height: number,
  in_start: boolean,
  leg: string,
  middle_name: string | null,
  name: string,
  nationality: Array<Nationality>,
  number: number | null,
  player_id: number,
  player_in_squad_id: number,
  position: Array<Position>,
  surname: string | null,
  weight: number,
}

export interface ZoneI {
  action_id: number,
  coords_pos: { x: number, y: number },
  id: number,
  long_name: string,
  movable: boolean,
  player: null | Roster,
  position_id: number,
  short_name: string,
  zone: { maxX: number, maxY: number, minX: number, minY: number },
}

export interface TacticI {
  '3-3-3-1': Array<string>,
  '3-4-3': Array<string>,
  '3-5-2': Array<string>,
  '3-5-2*': Array<string>,
  '4-1-4-1': Array<string>,
  '4-2-3-1': Array<string>,
  '4-3-3-Down': Array<string>,
  '4-4-2-Classic': Array<string>,
  '4-4-2-Diamond': Array<string>,
}

export type tacticKeys = keyof TacticI;

