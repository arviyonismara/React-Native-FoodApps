import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import FavoritesContextProvider from "./store/context/favorite-context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// cara alternatif untuk menggunakan dua jenis navigator dalam satu aplikasi
// ini dinamakan nested navigator
// fungsi ini nantinya digunakan di Stack.Screen dibawah
function Drawernavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: "#3f2f25" },
        drawerContentStyle: { backgroundColor: "#351401" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#351401",
        drawerActiveBackgroundColor: "#e4baa1",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <FavoritesContextProvider>
        {/* jika ingin menggunakan Navigation perlu menginstall NavigationContainer */}
        <NavigationContainer>
          {/* didalam Component NavigationContainer diisi halaman2/screen navigation */}
          <Stack.Navigator
            // screenOptions props untuk mengatur fitur2 dari navigation
            screenOptions={{
              headerStyle: { backgroundColor: "#351401" },
              headerTintColor: "white",
              contentStyle: { backgroundColor: "#3f2f25" },
            }}
          >
            {/* Stack.screen untuk mendaftarkan halaman menjadi halaman navigation */}
            <Stack.Screen
              // name="MealsCategories"
              name="Drawer"
              // component={CategoriesScreen}
              component={Drawernavigation}
              // options sama halnya seperti screenOptions
              // tetapi hanya berlaku pada screen tertentu
              options={{
                // title: "All Categories",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MealsOverview"
              component={MealsOverviewScreen}
              // options bisa menerima arrow function dengan parameter berisi route & navigation
              // cara dibawah bisa digunakan untuk memunculkan title spesifik untuk setiap kategori
              // options={({ route, navigation }) => {
              //   const catId = route.params.categoryId;
              //   return {
              //     title: catId,
              //   };
              // }}
            />
            <Stack.Screen
              name="MealDetail"
              component={MealDetailScreen}
              options={{
                title: "About the Meal",
                // options header untuk menambah sesuatu pada header, bisa berupa text, maupun button
                // headerRight: () => {
                //   return <Button title="Tap Me" onPress={}/>;
                // },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
