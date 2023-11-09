


export async function bodyParse(request, response, next) {

    if (request.method === "GET") {
        next()
    } else {
        let body = '';
        function getBody(chunk) {
            body += chunk.toString();
        }

        function appendToBodyRequest() {
            request.body = JSON.parse(body || '{}');
            request.removeListener("data", getBody);
            request.removeListener("end", appendToBodyRequest);
            next()
        }

        await request.on("data", getBody);
        await request.on("end", appendToBodyRequest);
    }
}