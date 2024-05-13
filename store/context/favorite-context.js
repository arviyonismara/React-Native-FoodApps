import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  addFavorites: (id) => {},
  removeFavorite: (id) => {},
});

function FavoritesContextProvider({ children }) {
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);

  // function menambahkan ke favorit
  // cara dibawah pernah dilakukan di latihan pertama membuat list
  function addFavorite(id) {
    setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
  }

  // function menghapus favorit
  function removeFavorite(id) {
    setFavoriteMealIds((currentFavIds) =>
      currentFavIds.filter((mealId) => mealId !== id)
    );
  }

  // value akan digunakan di komponent FavoriteContext.Provider sebagai value
  const value = {
    ids: favoriteMealIds,
    // yang disebelah kanan merujuk pada function,
    // yang dikiri merupakan nama yang akan dieksekusi didalam komponen
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {/* {children merupakan apapun yang berada didalam tag/component FavoriteContextProvider} */}
      {/* dengan menanamkan property value di component ini, maka semua component children dapat mengakses context dan semua fungsi yang ada didalam file ini */}
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
