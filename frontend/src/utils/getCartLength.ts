export const getCartLength = () => {
  let itemCount = 0;

  for (let i = 0; i < localStorage.length; i++) {
      if(localStorage.key(i).slice(0,4) === 'item'){
          itemCount += parseInt(localStorage.getItem(localStorage.key(i)));
      }
      
  }
  return itemCount;
};
