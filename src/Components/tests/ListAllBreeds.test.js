import { render } from "@testing-library/react";
import ListAllBreeds from "../ListAllBreeds";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

const mockApi = setupServer(
  rest.get(`https://dog.ceo/api/breeds/list/all`, (req, res, ctx) => {
    return res(
      ctx.json({
        message: { testBreed1: [], testBreed2: ["testSubBreed"] },
        status: "success",
      })
    );
  })
);
beforeAll(() => mockApi.listen());
afterAll(() => mockApi.close());

test("<ListAllBreeds /> renders list of breeds", async () => {
  const history = createMemoryHistory();
  const { container } = render(
    <Router history={history}>
      <ListAllBreeds />
    </Router>
  );
  await waitFor(() => {
    const lis = container.querySelectorAll("li");
    expect(lis).toHaveLength(2);
  });
});
