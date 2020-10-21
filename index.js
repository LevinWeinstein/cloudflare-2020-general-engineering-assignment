import {
    links,
    jsonInit,
    htmlInit,
    staticUrl,
    gatherResponse,
    BackgroundColorTransformer,
    TitleTransformer,
    SocialTransformer,
    LinkTransformer
} from './utilities'

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})
  
async function handleRequest(request) {
    const url = new URL(request.url)
    const path = url.pathname

    if (path === "/links"){
        return new Response (JSON.stringify(links), jsonInit);
    } else {
        const response = await fetch(staticUrl, htmlInit);
        const result = await gatherResponse(response);
        return new HTMLRewriter()
            .on('body', new BackgroundColorTransformer())
            .on('title', new TitleTransformer())
            .on('div#links', new LinkTransformer())
            .on('div#social', new SocialTransformer())
            .transform(new Response(result, htmlInit))        
    }
}