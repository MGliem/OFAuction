export default function isStringNumber (number: string) {
  const numeric = +number;
  if (Number.isInteger(numeric)) {
    return true;
  }
  return false;
}
