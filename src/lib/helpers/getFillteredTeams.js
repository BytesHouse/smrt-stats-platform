export const getFillteredTeams = (arr1, arr2) => {
  const tmp = [];
  for (let i = 0; i < arr1?.length; i++) {
    for (let j = 0; j < arr2?.length; j++) {
      if (arr1[i] === arr2[j].id) {
        tmp.push(arr2[j]);
      }
    }
  }
  return tmp;
};
