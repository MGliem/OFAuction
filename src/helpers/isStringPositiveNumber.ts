export default function isStringPositiveNumber (number: string) {
  const numeric = +number;
  if (Number.isInteger(numeric) && numeric >= 0) {
    return true;
  }
  return false;
}
