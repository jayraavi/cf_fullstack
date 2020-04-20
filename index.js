const VARIANTS_URL = new URL(
  "https://cfw-takehome.developers.workers.dev/api/variants"
);
class TitleHandler {
  element(element) {
    element.replace(
      "<div align = 'center' <h1> Jay's Internship Application</h1> </div>",
      { html: true }
    );
  }
}

class HeaderHandler {
  element(element) {
    element.prepend("Welcome to the marvelous ");
    element.append(":)");
  }
}

class DescriptionHandler {
  element(element) {
    element.replace("Wonder what variant you'll get next time...");
  }
}

class UrlHandler {
  element(element) {
    element.setAttribute("href", "https://github.com/jayraavi");
    element.setInnerContent("Check out my GitHub!");
  }
}

const rewriter = new HTMLRewriter()
  .on("title", new TitleHandler())
  .on("h1#title", new HeaderHandler())
  .on("p#description", new DescriptionHandler())
  .on("a#url", new UrlHandler());

async function fetchUrls() {
  let response = await fetch(VARIANTS_URL)
    .then((resp) => resp.json()) //convert response to JSON to index array
    .catch((err) => console.log(err.message));
  return response.variants;
}

function pickRandomVariant(variants) {
  const RANDOM_INDEX = Math.floor(Math.random() * variants.length); // generate random index in array
  return new URL(variants[RANDOM_INDEX]);
}

async function fetchVariantContent(variant) {
  let response = await fetch(variant).catch((err) => console.log(err.message));
  return rewriter.transform(response); // apply rewrites on specified tags
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
/**
 * Get array of variants, pick random variant, fetch from random variant
 * @param {Request} request
 */
async function handleRequest(request) {
  let variants = await fetchUrls();
  let variant = pickRandomVariant(variants);
  let body = await fetchVariantContent(variant);
  return body;
}
