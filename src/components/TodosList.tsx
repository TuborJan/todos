import React from "react";
import { ITodo } from "../Types/Todos";

interface ITodosProps {
  todos: ITodo[];
  toggleTodo: (id: number) => void;
}

const TodosList: React.FC<ITodosProps> = ({ todos, toggleTodo }) => {
  return (
    <div className="todos__list">
      {todos.map((todo) => (
        <div key={todo.id} className="todos__todo">
          <input
            type="checkbox"
            checked={todo.isComplete}
            onChange={() => toggleTodo(todo.id)}
          />
          <span
            className={
              todo.isComplete
                ? "description description__complete"
                : "description"
            }
          >
            {todo.description}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TodosList;
