async function fetchAPI() {
  const headers = { "Content-Type": "application/json" };

  const res = await fetch("http://localhost:3000/api/hello", {
    method: "GET",
    headers,
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json;
}

export default fetchAPI;
