export const dateFormatter = (str) => {
  str = str.replace("th", "");
  str = str.replace("st", "");
  str = str.replace("nd", "");
  str = str.replace(/[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/g, "00:00:00");
  return str;
};
