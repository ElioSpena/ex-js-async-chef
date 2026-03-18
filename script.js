/* In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:
Recuperare la ricetta da https://dummyjson.com/recipes/{id}
Estrarre la proprietà userId dalla ricetta
Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
Restituire la data di nascita dello chef
Note del docente
Scrivi la funzione getChefBirthday(id), che deve:
Essere asincrona (async).
Utilizzare await per chiamare le API.
Restituire una Promise con la data di nascita dello chef.
Gestire gli errori con try/catch */

async function getChefBirthday(id) {
  let recipe;
  try {
    const recipeResp = await fetch(`https://dummyjson.com/recipes/${id}`);
    recipe = await recipeResp.json();
  } catch (error) {
    console.error(error.message);
  }

  if (recipe.message) {
    throw new Error(recipe.message);
  }

  const userId = recipe.userId;

  let chef;
  try {
    const chefResp = await fetch(`https://dummyjson.com/users/${userId}`);
    chef = await chefResp.json();
  } catch (error) {
    console.error(error.message);
  }

  if (chef.message) {
    throw new Error(chef.message);
  }

  const date = chef.birthDate;
  const formatDate = dayjs(date).format("DD/MM/YYYY");
  return formatDate;
}

(async () => {
  try {
    const birthday = await getChefBirthday(1);
    console.log("Data di nascita dello chef:", birthday);
  } catch (error) {
    console.error(error.message);
  }
})();

/* getChefBirthday(1)
  .then((birthday) => console.log("Data di nascita dello chef:", birthday))
  .catch((error) => console.error("Errore:", error.message));
 */
