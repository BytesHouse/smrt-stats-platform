/* eslint-disable no-param-reassign */
export interface Event {
  action: string,
  coord_x: string | null,
  coord_x_destination: string | null,
  coord_y: string | null,
  coord_y_destination: string | null,
  creator: Player | null,
  id: number,
  match: Match,
  recipient: Player | null,
  second: string,
  video: string | null,
}

export interface Match {
  away_team: Team,
  competition: Competition,
  date: string,
  home_team: Team,
  id: number,
}

export interface Team {
  id: number,
  logo: string,
  name: string,
  short_name: string,
}

export interface Competition {
  id: number,
  name: string,
  short_name: string,
}

export interface Player {
  display_name: string,
  id: number,
  number: number | null,
  photo: string,
}

export const groupEventsByTeam = (
  events: Array<Event>,
): Array<{markers: Array<Event>, match: Match}> => {
  try {
    const groupedDataByTeam = events?.reduce((
      data: Array<{markers: Array<Event>, match: Match}>,
      item,
    ) => {
      const idxGroup = data.findIndex((a) => a.match.id === item.match.id)
      if (idxGroup >= 0) {
        data[idxGroup] = { ...data[idxGroup], markers: [...data[idxGroup].markers, item] }
      } else {
        data.push({ markers: [item], match: item.match })
      }
      return data
    }, [])
    return groupedDataByTeam;
  } catch {
    return [];
  }
}
