import { render } from "@testing-library/react";
import SearchBar from "../SearchBar";
import { fireEvent } from "@testing-library/react";

test("<SearchBar /> renders and calls onSearch with input", () => {
  const testOnSearch = jest.fn();
  const { container } = render(<SearchBar onSearch={testOnSearch} />);
  const input = container.querySelector("input");
  const testInput = "test input";
  fireEvent.change(input, { target: { value: testInput } });
  const button = container.querySelector("button");
  button.click();
  expect(testOnSearch).toBeCalledWith(testInput);
});
