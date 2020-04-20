const VARIANTS_URL = new URL(
  "https://cfw-takehome.developers.workers.dev/api/variants"
);
const rewriter = new HTMLRewriter();

async function fetchUrls() {
  let response = await fetch(VARIANTS_URL).then((resp) => resp.json());
  console.log(response);
  return response.variants;
}

function pickRandomVariant(variants) {
  const RANDOM_INDEX = Math.floor(Math.random() * 2);
  return new URL(variants[RANDOM_INDEX]);
}

async function fetchVariantContent(variant) {
  let response = await fetch(variant);
  return rewriter.transform(response);
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
  variant = pickRandomVariant(variants);
  console.log(variant);
  let body = await fetchVariantContent(variant);
  return body;
}
