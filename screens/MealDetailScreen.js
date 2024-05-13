import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { useContext, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MEALS } from "../data/dummy-data";
import React from "react";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/favorite-context";
import { addFavorite, removeFavorite } from "../store/redux/favorites";

// MealDetailScreen merupakan children dari MealItem
const MealDetailScreen = ({ route, navigation }) => {
  // const favoriteMealsCtx = useContext(FavoritesContext); // FavoriteContext merupakan objek context dari favorite-context.js
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  // route.params.mealId didapat dari parent yaitu MealItem
  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  // cek jika favorite ids sama/mengandung/bagian dari mealId
  // jika terdapat mealId maka include() akan me return true
  // const mealIsfavorite = favoriteMealsCtx.ids.includes(mealId);
  const mealIsfavorite = favoriteMealIds.includes(mealId);

  //   membuat button pada header navigation menggunakan props dari navigations
  function changeFavoriteStatusHandler() {
    // console.log("pressed");
    if (mealIsfavorite) {
      // favoriteMealsCtx.removeFavorite(mealId);
      dispatch(removeFavorite({ id: mealId }));
    } else {
      // favoriteMealsCtx.addFavorite(mealId);
      dispatch(addFavorite({ id: mealId }));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            onPress={changeFavoriteStatusHandler}
            icon={mealIsfavorite ? "star" : "star-outline"}
            color="white"
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        affordability={selectedMeal.affordability}
        complexity={selectedMeal.complexity}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    maxWidth: "80%",
  },
});
