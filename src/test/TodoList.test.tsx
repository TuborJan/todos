import { render, screen } from "@testing-library/react";
import TodosList from "../components/TodosList";

describe("TodoList Component", () => {
  it("Should renderw with some data", () => {
    const toggleTodo = jest.fn();
    const data = [
      {
        id: Math.random(),
        description: "data1",
        isComplete: false,
      },
      {
        id: Math.random(),
        description: "data2",
        isComplete: false,
      },
      {
        id: Math.random(),
        description: "data3",
        isComplete: false,
      },
    ];
    render(<TodosList todos={data} toggleTodo={toggleTodo} />);

    const todoElement1 = screen.getByText("data1");
    const todoElement2 = screen.getByText("data2");
    const todoElement3 = screen.getByText("data3");

    expect(todoElement1).toBeInTheDocument();
    expect(todoElement2).toBeInTheDocument();
    expect(todoElement3).toBeInTheDocument();
  });
});
