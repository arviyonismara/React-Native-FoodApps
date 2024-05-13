import { StyleSheet, Text, View, FlatList } from "react-native";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import { useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import React from "react";
import MealItem from "../components/MealsList/MealItem";
import MealsList from "../components/MealsList/MealsList";

// sama seperti prop navigation, route merupakan prop yang hanya bisa digunakan pada komponen yang terdaftar sebagai screen
const MealsOverviewScreen = ({ route, navigation }) => {
  // navigation.navigate("MealDetail", {

  // });

  // berikut cara mengambil data dari CategoriesScreen
  //   const route = useRoute();
  // route.params
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);

  return <MealsList items={displayedMeals} />;
};

export default MealsOverviewScreen;

const styles = StyleSheet.create({});
