import { createSelector } from 'reselect'

const getIngredients = state => {
  let ingredients = state.ingredients.byId
  return ingredients
}
const getFoodstuffs = state => {
  let foodstuffs = state.foodstuffs.byId
  return foodstuffs
}

const makeGetIngredientsWithFoodstuff = () => createSelector(
  [getIngredients, getFoodstuffs],
  (ingredients, foodstuffs) => {
    console.log('mapping ingredients', ingredients)
    console.log(foodstuffs)
    let ingredientsWithFoodstuff = []
    if (ingredients && Object.keys(ingredients).length > 0) {
      console.log(Object.entries(ingredients))
      ingredientsWithFoodstuff = Object.entries(ingredients).map(i => {
        i[1].foodstuff = foodstuffs[i[1].foodstuff]
        return i[1]
      })
    }
    console.log('mapped ingredients', ingredientsWithFoodstuff)
    return ingredientsWithFoodstuff
  }
)

export {
  makeGetIngredientsWithFoodstuff
}