/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
export interface Parametr {
  by_halves: boolean,
  by_periods: boolean,
  by_zones: boolean,
  checked: boolean,
  clickable: boolean,
  group: Group | null,
  id: number,
  lexic: number | null,
  name: string,
  sort_order: number,
}

export interface Group {
  id: number,
  name: string,
}

export interface GroupedParametr {
  [group: string]: Array<Parametr>,
}

export type Entries<T> = Array<{
  [K in keyof T]: [K, T[K]];
}[keyof T]>;

export const getGroupedAndSortedParametrs = (parametrs: Array<Parametr>): Entries<GroupedParametr> => {
  try {
    const groupedParams = parametrs?.sort((a, b) => {
      if (a.group === null) {
        return 1;
      }
      if (b.group === null) {
        return -1;
      }
      return a.group.id < b.group.id ? -1 : 1;
    })
      .reduce((group: GroupedParametr, item) => {
        if (item.group) {
          if (!group[item.group.name]) {
            group[item.group.name] = [];
          }
          group[item.group.name].push({ ...item, checked: true });
          group[item.group.name] = group[item.group.name]
            .sort((a, b) => (a.sort_order < b.sort_order ? -1 : 1))
          return group;
        }

        // uncomment if you need parameters without a group

        // if (!group['Without group']) {
        //   group['Without group'] = []
        // }
        // group['Without group'].push({ ...item, checked: true });
        // group['Without group'] = group['Without group']
        //   .sort((a, b) => (a.name < b.name ? -1 : 1))
        return group;
      }, {});
    return Object.entries(groupedParams);
  } catch {
    return [];
  }
}
