const generateRandomString = (length: number) => {
  let s = '';
  const randomchar = () => {
    const randomNumber = Math.floor(Math.random() * 62);
    if (randomNumber < 10) return randomNumber; // 1-10
    if (randomNumber < 36) return String.fromCharCode(randomNumber + 55); // A-Z
    return String.fromCharCode(randomNumber + 61); // a-z
  }
  while (s.length < length) s += randomchar();
  return s;
}

export default generateRandomString;
