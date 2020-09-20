import { Offer, Serving } from "../generated/graphql";
export const getTotal = (values: Partial<Serving>[], offer?: Offer) => {
  let total = 0;

  //IF NO OFFER IS PROVIDED, PLAIN SIMPLE SUMM FUNCTION
  if (!offer) {
    values.forEach((serving) => (total += serving.price));
  } else {
    const mealsArray = values
      .filter((serving) => serving.category === "food")
      .sort((a, b) => b.price - a.price);
    const drinksArray = values
      .filter((serving) => serving.category === "drink")
      .sort((a, b) => b.price - a.price);
    const dessertsArray = values
      .filter((serving) => serving.category === "dessert")
      .sort((a, b) => b.price - a.price);
    const mealsWithOffer: Partial<Serving>[] = [];
    const drinksWithOffer: Partial<Serving>[] = [];
    const dessertsWithOffer: Partial<Serving>[] = [];
    if (offer.type === "discount") {
      while (
        mealsArray.length >= offer.requiredMeals &&
        drinksArray.length >= offer.requiredDrinks &&
        dessertsArray.length >= offer.requiredDesserts
      ) {
        mealsWithOffer.push(...mealsArray.splice(0, offer.requiredMeals));
        drinksWithOffer.push(...drinksArray.splice(0, offer.requiredDrinks));
        dessertsWithOffer.push(
          ...dessertsArray.splice(0, offer.requiredDesserts)
        );
      }
      mealsWithOffer.forEach(
        (meal) => (total += meal.price * ((100 - offer.value) / 100))
      );
     console.log(total);
      drinksWithOffer.forEach(
        (drink) => (total += drink.price * ((100 - offer.value) / 100))
      );
      console.log(total);
      dessertsWithOffer.forEach(
        (dessert) => (total += dessert.price * ((100 - offer.value) / 100))
      );
      console.log(total)
      mealsArray.forEach((meal) => (total += meal.price));
      drinksArray.forEach((drink) => (total += drink.price));
      dessertsArray.forEach((dessert) => (total += dessert.price));
    } else {
      let timesApplied = 0;
      while (
        mealsArray.length >= offer.requiredMeals &&
        drinksArray.length >= offer.requiredDrinks &&
        dessertsArray.length >= offer.requiredDesserts
      ) {
        mealsArray.splice(0, offer.requiredMeals);
        drinksArray.splice(0, offer.requiredDrinks);
        dessertsArray.splice(0, offer.requiredDesserts);
        timesApplied++;
      }
     total += timesApplied * offer.value;
      mealsArray.forEach((meal) => (total += meal.price));
      drinksArray.forEach((drink) => (total += drink.price));
      dessertsArray.forEach((dessert) => (total += dessert.price));
    }

  }
  return total;
};
