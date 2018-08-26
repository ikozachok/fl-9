function reverseNumber(number) {
  let str = number.toString();
  let strRevert = '';
  let isNule = true;
  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] === "-") {
      continue;
    }
    if (str[i] === "0" && isNule) {
      continue;
    } else {
      isNule = false;
    }
    strRevert = strRevert + str[i];
  }
  let result = number > 0 ? strRevert : "-" + strRevert;
  return result;
}
