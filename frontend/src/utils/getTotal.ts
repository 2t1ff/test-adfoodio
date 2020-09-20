
import { Serving } from "../generated/graphql";
export const getTotal = (values:  Partial<Serving>[]) => {
  let total = 0;
  values.forEach(serving => {
   const totalServing = serving.price * parseInt(localStorage.getItem("item" + serving.id.toString())); 
   total += totalServing;
  });
  return total;
};

