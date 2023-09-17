import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Todos from "../components/Todos";

describe("Todos Component", () => {
  it("Should add todo when click addTodo button", () => {
    render(<Todos />);

    const inputElement = screen.getByPlaceholderText("What needs to be done?");
    const addTodoButton = screen.getByRole("addTodo");

    userEvent.type(inputElement, "New todo");
    userEvent.click(addTodoButton);

    const todoElement = screen.getByText("New todo");

    expect(todoElement).toBeInTheDocument();
  });

  it("Should toggle todo when click todo item", () => {
    render(<Todos />);

    const inputElement = screen.getByPlaceholderText("What needs to be done?");
    const addTodoButton = screen.getByRole("addTodo");

    userEvent.type(inputElement, "New todo");
    userEvent.click(addTodoButton);

    const todoElement = screen.getByText("New todo");
    const toggleTodo = screen.getByRole("checkbox");

    userEvent.click(toggleTodo);

    expect(todoElement).toHaveClass("description description__complete");
  });

  it("Should filter todos when click filter buttons Completed", () => {
    render(<Todos />);

    const inputElement = screen.getByPlaceholderText("What needs to be done?");
    const addTodoButton = screen.getByRole("addTodo");

    userEvent.type(inputElement, "Todo 1");
    userEvent.click(addTodoButton);

    userEvent.type(inputElement, "Todo 2");
    userEvent.click(addTodoButton);

    const todo1Element = screen.getByText("Todo 1");
    const todo2Element = screen.getByText("Todo 2");

    const completedButton = screen.getByText("Completed");

    userEvent.click(completedButton);

    expect(todo1Element).not.toBeInTheDocument();
    expect(todo2Element).not.toBeInTheDocument();
  });

  it("Should filter todos when click filter buttons Active", () => {
    render(<Todos />);

    const inputElement = screen.getByPlaceholderText("What needs to be done?");
    const addTodoButton = screen.getByRole("addTodo");

    userEvent.type(inputElement, "Todo 1");
    userEvent.click(addTodoButton);

    userEvent.type(inputElement, "Todo 2");
    userEvent.click(addTodoButton);

    const todo1Element = screen.getByText("Todo 1");
    const todo2Element = screen.getByText("Todo 2");

    const activeButton = screen.getByText("Active");

    userEvent.click(activeButton);

    expect(todo1Element).toBeInTheDocument();
    expect(todo2Element).toBeInTheDocument();
  });

  it("Should remove completed todos when click clear all completed button", () => {
    render(<Todos />);

    const inputElement = screen.getByPlaceholderText("What needs to be done?");
    const addTodoButton = screen.getByRole("addTodo");

    userEvent.type(inputElement, "Todo 1");
    userEvent.click(addTodoButton);

    userEvent.type(inputElement, "Todo 2");
    userEvent.click(addTodoButton);

    const todo1Element = screen.getByText("Todo 1");
    const todo2Element = screen.getByText("Todo 2");
    const clearAllButton = screen.getByText("Clear all completed");
    //toggle first element
    const toggleTodo = screen.getAllByRole("checkbox")[0];

    userEvent.click(toggleTodo);
    userEvent.click(clearAllButton);

    expect(todo1Element).not.toBeInTheDocument();
    expect(todo2Element).toBeInTheDocument();
  });
});
