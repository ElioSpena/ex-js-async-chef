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
import dayjs from "dayjs";

async function fetchJson(url) {
  const resp = await fetch(url);
  const obj = await resp.json();
  return obj;
}

async function getChefBirthday(id) {
  let recipe;
  try {
    recipe = await fetchJson(`https://dummyjson.com/recipes/${id}`);
  } catch (error) {
    console.error(error.message);
  }

  if (recipe.message) {
    throw new Error(recipe.message);
  }

  const userId = recipe.userId;

  let chef;
  try {
    chef = await fetchJson(`https://dummyjson.com/users/${userId}`);
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

getChefBirthday(1)
  .then((birthday) => console.log("Data di nascita dello chef:", birthday))
  .catch((error) => console.error("Errore:", error.message));
