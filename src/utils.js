export const dateFormatter = (str) => {
  str = str.replace("th", "");
  str = str.replace("st", "");
  str = str.replace("nd", "");
  return str;
};
