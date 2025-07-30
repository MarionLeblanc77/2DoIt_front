/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Power } from "react-feather";
import "./Dashboard.scss";
import Section from "../Section/Section";
import { ISection } from "../../@types/task";
import getNbColumns from "../../utils/app";
import { useAppDispatch, useAppSelector } from "../../store/hooks-redux";
import { actionLogout } from "../../store/reducers/userReducer";
import getUserSections from "../../store/middlewares/getUserSections";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userSections = useAppSelector((state) => state.taskReducer.sections);

  useEffect(() => {
    dispatch(getUserSections());
  }, []);

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
      return [userSections];
    }
    const result: ISection[][] = [];

    for (let i = 0; i < nbColumns; i++) {
      const subSection: ISection[] = [];
      if (userSections[i]) {
        subSection.push(userSections[i]);
      }
      subSection.push(
        ...userSections.filter(
          (_, index) => index > i && index % nbColumns === i
        )
      );
      if (subSection.length > 0) {
        result.push(subSection);
      }
    }
    return result;
  }, [nbColumns, userSections]);

  const handleClickLogout = () => {
    dispatch(actionLogout());
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-logout">
        <button
          type="button"
          className="dashboard-logout-button button"
          onClick={handleClickLogout}
        >
          <Power className="dashboard-logout-button-icon" size="18px" />
          <p>Logout</p>
        </button>
      </div>
      <div className="dashboard-sections">
        {formatedTodoLists.map((subSection) => (
          <div
            key={subSection
              .filter(Boolean)
              .map((section) => section.id)
              .join("-")}
          >
            {subSection.map((section) => {
              if (!section) return null;
              return (
                <div key={section.id} className="dashboard-section">
                  <Section
                    id={section.id}
                    title={section.title}
                    tasks={section.tasks}
                    lastUpdatedDate={section.lastUpdatedDate}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
