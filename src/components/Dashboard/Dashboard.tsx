/* eslint-disable no-plusplus */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Power } from "react-feather";
import "./Dashboard.scss";
import Section from "../Section/Section";
import { ISection } from "../../@types/task";
import getNbColumns from "../../utils/app";
import data from "../../utils/tempData";
import { useAppDispatch } from "../../store/hooks-redux";
import { actionLogout } from "../../store/reducers/userReducer";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [nbColumns, setNbColumns] = useState(getNbColumns());

  useEffect(() => {
    function handleResize() {
      const newColumns = getNbColumns();
      setNbColumns((prev) => (prev !== newColumns ? newColumns : prev));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatedTodoLists: ISection[][] = useMemo(() => {
    if (nbColumns === 1) {
      return [data];
    }
    const result: ISection[][] = [];

    for (let i = 0; i < nbColumns; i++) {
      let subSection: ISection[] = [];
      subSection = [data[i]];
      subSection.push(
        ...data.filter((_, index) => index > i && index % nbColumns === i)
      );
      result.push(subSection);
    }
    return result;
  }, [nbColumns]);

  const handleClickLogout = () => {
    dispatch(actionLogout());
    navigate("/");
  };

  return (
    <>
      <div className="dashboard">
        <button type="button" className="logout" onClick={handleClickLogout}>
          <Power className="logout--icon" />
          <p>Se déconnecter</p>
        </button>
      </div>
      {formatedTodoLists.map((subSection) => (
        <div key={subSection[0]?.id} className="todolists__column">
          {subSection.map((todoList) => (
            <div key={todoList.id} className="todolist__container">
              <Section
                id={todoList.id}
                title={todoList.title}
                tasks={todoList.tasks}
                lastUpdatedDate={todoList.lastUpdatedDate}
              />
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
