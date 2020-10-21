addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})
  
async function handleRequest(request) {
    const url = new URL(request.url)
    const path = url.pathname

    if (path === "/links"){
        return new Response(JSON.stringify(links), jsonInit);
    } else {
        const response = await fetch(staticUrl, htmlInit);
        const result = await gatherResponse(response);
        return new Response(result, htmlInit)
    }
}

const links = [
    { name: "Google", address:"https://www.google.com/"},
    { name: "Facebook", address:"https://www.facebook.com"},
    { name: "LinkedIn", address:"https://www.linkedin.com/"}
]

const jsonInit = {
    headers: { 'content-type': 'application/json' },
    status: 200
}

const htmlInit = {
    headers: { 'content-type': 'text/html;charset=UTF-8' },
    status: 200
}

const staticUrl = 'https://static-links-page.signalnerve.workers.dev'

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response) {
    const { headers } = response
    const contentType = headers.get("content-type") || ""
    if (contentType.includes("application/json")) {
      return JSON.stringify(await response.json())
    }
    else if (contentType.includes("application/text")) {
      return await response.text()
    }
    else if (contentType.includes("text/html")) {
      return await response.text()
    }
    else {
      return await response.text()
    }
  }