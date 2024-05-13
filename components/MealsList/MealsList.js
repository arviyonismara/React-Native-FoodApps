import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import MealItem from "./MealItem";

const MealsList = ({ items }) => {
  function renderMealItem(itemData) {
    // berikut merupakan cara lain memanggil item
    const item = itemData.item;
    const mealItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration,
    };

    return (
      <MealItem
        // title={itemData.item.title}
        // imageUrl={itemData.item.imageUrl}
        // affordability={itemData.item.affordability}
        // complexity={itemData.item.complexity}
        // duration={itemData.item.duration}
        // ingredients={itemData.item.ingredients}
        {...mealItemProps}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

export default MealsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
