/* eslint-disable @typescript-eslint/no-explicit-any */
import { PitchCircleI } from 'components/Formation/ui/Formation';
import { TacticI } from 'components/Formation/ui/types/tacticTypes';

export interface MatchPlacementResponse {
  count: number,
  markers: Array<Marker>,
  match: Match,
}

export interface MatchMarkersResponse extends MatchPlacementResponse {}

export interface Match {
  away_team: Team,
  date: string,
  home_team: Team,
  id: number,
  season: Season,
  status: number,
}

interface Season {
  id: number,
  title: string,
  year_season: string,
}

interface Team {
  color: string,
  color_number: string,
  id: number,
  logo: string,
  name: string,
  score: number,
}

export interface Marker {
  action: Action,
  attack: any,
  body_part: any,
  coord_x: any,
  coord_x_destination: any,
  coord_y: any,
  coord_y_destination: any,
  creator: Creator,
  draft: boolean,
  gate_coord_x: any,
  gate_coord_y: any,
  id: number,
  match: number,
  match_minute: any,
  possession: any,
  recipient: any,
  second: string,
  set_piece: any,
  timing: any,
  touches: any,
  video: any,
}

interface Action {
  id: number,
  title: string,
}

export interface Creator {
  birth_date: string,
  display_name?: string,
  gender: string,
  height: number,
  in_start: boolean,
  leg: string,
  middle_name: any,
  name: string,
  nationality: Array<Nationality>,
  number: number,
  player_id: number,
  player_in_squad_id: number,
  position: Array<Position>,
  surname: string,
  team_id: number,
  teams?: Array<any>,
  weight: number,
}

interface Nationality {
  id: number,
  name: string,
}

interface Position {
  id: number,
  name: string,
  short_name: string,
}

// platform/formation/split/
export type half = Record<string, Array<any>> | []

export interface FormationSplitResponse {
  '45+': half,
  '90+': half,
  first_half: half,
  second_half: half,
}

export interface FormationSchema {
  away_tactic: Array<PitchCircleI>,
  away_tactic_key: keyof TacticI,
  change_side: boolean,
  formation_split_data: FormationSplitResponse,
  home_tactic: Array<PitchCircleI>,
  home_tactic_key: keyof TacticI,
  loading_placement_data: boolean,
  match_markers: Array<Marker>,
  match_placement_data: MatchPlacementResponse,
}

