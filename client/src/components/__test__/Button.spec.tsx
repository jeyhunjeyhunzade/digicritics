import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../Button";

describe("Button Component", () => {
  it("renders button with children", () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Click me</Button>);

    const buttonElement = getByText("Click me");
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button onClick={onClickMock}>Click me</Button>
    );
    const buttonElement = getByText("Click me");

    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
