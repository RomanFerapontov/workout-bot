export function random(data) {
  if (Array.isArray(data)) {
    return data[Math.floor(Math.random() * data.length)];
  }
  if (typeof data === "object") {
    const keys = Object.keys(data);
    const key = keys[Math.floor(Math.random() * keys.length)];
    return data[key];
  }
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

export function equipmentFilter(array) {
  return array.filter((el) => {
    if (el.split(" ")[0] !== "KB") {
      return el;
    }
  });
}

export function reset(array) {
  if (array.length !== 0) {
    array.splice(0, array.length);
  }
  return;
}
