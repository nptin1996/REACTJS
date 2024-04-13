export function truncateString(str, num = 200) {
  return str.length > num ? str.substring(0, num) + "..." : str;
}

export function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
