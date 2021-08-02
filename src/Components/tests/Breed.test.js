import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import Breed from "../Breed";
import { Router } from "react-router-dom";
import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { waitFor } from "@testing-library/react";

const testBreedName = "testBreed";
const mockMatchBreedName = () => ({
  params: { breedName: testBreedName },
});

const mockApi = setupServer(
  rest.get(
    `https://dog.ceo/api/breed/${testBreedName}/images/random/4`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          message: ["url1", "url2", "url3", "url4"],
          status: "success",
        })
      );
    }
  )
);
beforeAll(() => mockApi.listen());
afterAll(() => mockApi.close());

test("Breed component renders images", async () => {
  const history = createMemoryHistory();
  const { getByText, container } = render(
    <Router history={history}>
      <Breed match={mockMatchBreedName()} />
    </Router>
  );

  expect(getByText(/see all breeds/i)).toBeInTheDocument();

  await waitFor(() => {
    const images = container.querySelectorAll("img");
    expect(images).toHaveLength(4);
  });
});
