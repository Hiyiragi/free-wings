export function removeTrailingZeros(value: string) {
  const stringValue = value.toString();

  if (stringValue === "" || /^0+$/.test(stringValue)) {
    return stringValue === "" ? "" : "0";
  }

  return parseFloat(stringValue.replace(/(\d*\.\d*?[1-9])0+$/, "$1"));
}
