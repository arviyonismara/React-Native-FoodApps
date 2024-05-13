import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import MealsList from "../components/MealsList/MealsList";
import { MEALS } from "../data/dummy-data";
import { FavoritesContext } from "../store/context/favorite-context";
import { useSelector } from "react-redux";

const FavoritesScreen = () => {
  // const favoriteMealsCtx = useContext(FavoritesContext);
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);

  // filter akan mereturn sebuah array yang berisikan meals yang memiliki ids sama dengan meal.id
  const favoriteMeals = MEALS.filter((meal) =>
    // favoriteMealsCtx.ids.includes(meal.id)
    favoriteMealIds.includes(meal.id)
  );

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.rootcontainer}>
        <Text style={styles.text}>You Have no favorite meals yet</Text>
      </View>
    );
  }

  return <MealsList items={favoriteMeals} />;
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
