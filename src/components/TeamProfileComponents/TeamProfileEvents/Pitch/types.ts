import { Event } from 'lib/helpers/groupEventsByTeam'

// type TCreator = {
//   leg: string,
//   middle_name: string | null,
//   name: string,
//   photo?: string | null,
//   surname: string,
// }

// type TCreatorTeam = {
//   id: number,
//   logo: string,
//   name: string,
//   short_name: string,
//   team_status: string,
//   team_type: string,
// }

export interface TMarker extends Event {
  // action: string,
  // action_group_title: MatchEvents,
  // attack: string| null,
  // body_part: string| null,
  // coord_x: string,
  // coord_x_destination: string| null,
  // coord_y: string,
  // coord_y_destination: string| null,
  // creator: TCreator,
  // creator_team: TCreatorTeam,
  // gate_coord_x: string| null,
  // gate_coord_y: string| null,
  // id: number,
  // match_minute: string| null,
  // possession: string| null,
  // recipient: TCreator,
  // recipient_team: TCreatorTeam,
  // season: {
  //   id: number,
  //   title: string,
  // },
  // second: string,
  // set_piece: string| null,
  // timing: string| null,
  // video: string,
  // video_tracks: [],
}

export type TPitchEvent = {
  height?: number,
  heightContainer?: 'fit-content',
  resultMarkers: Array<TMarker>,
  width?:number,
  widthContainer?: string,
}

export enum MatchEvents {
  ATTACKS = 'Attacks',
  DUELS = 'Duels',
  GK_EVENTS = 'GK events',
  MATCH_PERIOD = 'Match period',
  MISTAKES = 'Mistakes',
  OTHER_EVENTS = 'Other events',
  PASSES = 'Passes',
  REFEREE_DECISIONS = 'Referee decisions',
  SHOTS = 'Shots',
  TACTICS = 'Tactics'
}
