export function random(data) {
  if (Array.isArray(data)) {
    return data[Math.floor(Math.random() * data.length)];
  }
  if (typeof data === "object") {
    const keys = Object.keys(data);
    const key = keys[Math.floor(Math.random() * keys.length)];
    return key;
  }
}

export function filter(option, object) {
  const arrayOfKeys = Object.keys(object);
  arrayOfKeys.forEach((key) => {
    if (!option.includes(key)) {
      delete object[key];
    }
  });
}

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
