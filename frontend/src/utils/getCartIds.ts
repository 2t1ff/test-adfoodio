export const getCartIds = () => {
  let ids = [];
  for (let i = 0; i < localStorage.length; i++) {
    const currentKey = localStorage.key(i);
    if (currentKey.slice(0, 4) === "item") {
      ids.push(currentKey.slice(4));
    }
  }
  return ids;
};
