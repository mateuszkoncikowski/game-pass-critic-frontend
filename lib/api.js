import { join, map, pipe, prop, tail } from "ramda";

async function fetchAPI() {
  const games = await fetch(
    "https://catalog.gamepass.com/sigls/v2?id=fdd9e2a7-0fee-49f6-ad69-4354098401ff&language=en-us&market=US"
  )
    .then((res) => res.json())
    .then((data) => data);

  const gamesIds = pipe(tail, map(prop("id")), join(","))(games);

  const gameData = `https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=${gamesIds}&market=US&languages=en-us&MS-CV=DGU1mcuYo0WMMp+F.1`;

  return await fetch(gameData)
    .then((res) => res.json())
    .then((data) => data["Products"]);
}

export default fetchAPI;
