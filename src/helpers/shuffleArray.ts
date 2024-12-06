const shuffleArray = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

const checkSameIndex = <T>(prev: T[], current: T[]) => {
  for (let i = 0; i < current.length; i++) {
    if (prev[i] === current[i]) {
      return true;
    }
  }
  return false;
};

export default function shuffleArrayNoSameIndex<T>(array: T[]) {
  const savePrev = [...array];
  let result = [];

  do {
    result = [...shuffleArray(array)];
  } while (checkSameIndex(savePrev, array));

  return result;
}
