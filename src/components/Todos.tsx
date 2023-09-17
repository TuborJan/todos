import { useEffect, useState } from "react";
import { ITodo } from "../Types/Todos";
import "../styles/Todos.scss";
import TodosList from "./TodosList";

const Todos = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") addTodo();
  };

  const addTodo = () => {
    if (inputValue) {
      setTodos([
        ...todos,
        {
          id: Math.random(),
          description: inputValue,
          isComplete: false,
        },
      ]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isComplete: !todo.isComplete,
        };
      })
    );
  };

  const removeCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.isComplete));
  };

  const filterTodos = (status: string) => {
    switch (status) {
      case "All":
        setFilteredTodos(todos);
        break;
      case "Active":
        setFilteredTodos(todos.filter((todo) => !todo.isComplete));
        break;
      case "Completed":
        setFilteredTodos(todos.filter((todo) => todo.isComplete));
        break;
    }
  };

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  return (
    <div className="todos">
      <div className="todos__input">
        <button data-testid="addBtn" role="addTodo" onClick={addTodo}>
          V
        </button>
        <input
          type="text"
          value={inputValue}
          placeholder="What needs to be done?"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {filteredTodos.length > 0 ? (
        <TodosList todos={filteredTodos} toggleTodo={toggleTodo} />
      ) : (
        <div className="todos__placeholder">
          <h2>No todos</h2>
        </div>
      )}
      <div className="todos__info">
        <span>{filteredTodos.length} items left</span>

        <div className="todos__filter">
          <button onClick={() => filterTodos("All")}>All</button>
          <button onClick={() => filterTodos("Active")}>Active</button>
          <button onClick={() => filterTodos("Completed")}>Completed</button>
        </div>

        <button onClick={removeCompletedTodos}>Clear all completed</button>
      </div>
    </div>
  );
};

export default Todos;
