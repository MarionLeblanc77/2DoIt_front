/* eslint-disable no-plusplus */
import { useEffect, useMemo, useState } from "react";
import { ITodoList } from "../@types/app";
import getNbColumns from "../utils/app";
import "./App.scss";
import TodoList from "./Sections/TodoList";
import data from "../utils/tempData";

function App() {
  const [nbColumns, setNbColumns] = useState(getNbColumns());

  useEffect(() => {
    function handleResize() {
      const newColumns = getNbColumns();
      setNbColumns((prev) => (prev !== newColumns ? newColumns : prev));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatedTodoLists: ITodoList[][] = useMemo(() => {
    if (nbColumns === 1) {
      return [data];
    }
    const result: ITodoList[][] = [];

    for (let i = 0; i < nbColumns; i++) {
      let subSection: ITodoList[] = [];
      subSection = [data[i]];
      subSection.push(
        ...data.filter((_, index) => index > i && index % nbColumns === i)
      );
      result.push(subSection);
    }
    return result;
  }, [nbColumns]);

  return (
    <div className="app">
      <div className="todolists_container">
        {formatedTodoLists.map((subSection) => (
          <div key={subSection[0]?.id} className="todolists__column">
            {subSection.map((todoList) => (
              <div key={todoList.id} className="todolist__container">
                <TodoList
                  id={todoList.id}
                  title={todoList.title}
                  tasks={todoList.tasks}
                  lastUpdatedDate={todoList.lastUpdatedDate}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
