function shuffleArray(arr) {
  const arr2 = [...arr];
  // const arr2 = arr.slice();
  arr2.sort(() => Math.random() - 0.5);
  return arr2;
}
export default shuffleArray;
