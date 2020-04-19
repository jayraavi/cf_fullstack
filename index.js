const variants_url = new URL(
  "https://cfw-takehome.developers.workers.dev/api/variants"
);

async function fetchUrls() {
  let response = await fetch(variants_url).then((resp) => resp.json());
  console.log(response);
  return response.variants;
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  let variants = await fetchUrls();
  console.log(variants);
  return new Response("Hello worker!", {
    headers: { "content-type": "text/plain" },
  });
}
