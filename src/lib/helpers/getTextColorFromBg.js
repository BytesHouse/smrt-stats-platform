export const getTextColorFromBg = (rgb) => {
  // eslint-disable-next-line no-param-reassign
  rgb = rgb.match(/\d+/g);
  if ((rgb[0] * 0.299) + (rgb[1] * 0.587) + (rgb[2] * 0.114) > 186) {
    return 'black';
  }
  return 'white';
}
