import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const server = setupServer(
  http.post("https://fakestoreapi.com/carts",  () => {
    return HttpResponse.json({
        data: 'hello'
    })
  })
);

export { server, http };
