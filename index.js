class TitleHandler {
  element(element) {
    console.log(`Incoming element: ${element.tagName}`);
    element.replace("Jay's App");
  }
}

class HeaderHandler {
  element(element) {
    console.log(`Incoming element: ${element.tagName}`);
    // console.log(element.attributes);
    element.prepend("Welcome to the marvelous ");
    element.append(":)");
  }
}

class DescriptionHandler {
  element(element) {
    console.log(`Incoming element: ${element.tagName}`);
    element.replace("Wonder what variant you'll get next time...");
  }
}

class UrlHandler {
  element(element) {
    console.log(`Incoming element: ${element.tagName}`);
    element.setAttribute("href", "https://github.com/jayraavi");
    element.setInnerContent("Check out my GitHub!");
  }
}
const VARIANTS_URL = new URL(
  "https://cfw-takehome.developers.workers.dev/api/variants"
);
const rewriter = new HTMLRewriter()
  .on("title", new TitleHandler())
  .on("h1#title", new HeaderHandler())
  .on("p#description", new DescriptionHandler())
  .on("a#url", new UrlHandler());

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
