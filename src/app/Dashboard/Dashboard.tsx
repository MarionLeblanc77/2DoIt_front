/* eslint-disable no-plusplus */
import { useEffect, useMemo, useState } from "react";
import "./Dashboard.scss";
import Section from "../../components/Section/Section";
import { ISection } from "../../@types/task";
import getNbColumns from "../../utils/app";
import { useAppDispatch, useAppSelector } from "../../store/hooks-redux";
import { actionChangeSectionOrder } from "../../store/reducers/taskReducer";
import updateSectionsPositions from "../../store/middlewares/updateSectionsPositions";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const userSections = useAppSelector((state) => state.taskReducer.sections);

  const [nbColumns, setNbColumns] = useState<number>(getNbColumns);
  const [dragData, setDragData] = useState({
    id: 0,
    fixedInitialPosition: 0,
    moveInitialPosition: 0,
  });
  const [currentHover, setCurrentHover] = useState<number | null>(null);

  useEffect(() => {
    function handleResize() {
      const newColumns = getNbColumns();
      setNbColumns((prev) => (prev !== newColumns ? newColumns : prev));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatedTodoLists: ISection[][] = useMemo(() => {
    const sortedUserSections = [...userSections].sort(
      (a, b) => a.position - b.position
    );
    if (nbColumns === 1) {
      return [sortedUserSections];
    }
    const result: ISection[][] = [];

    for (let i = 0; i < nbColumns; i++) {
      const subSection: ISection[] = [];
      if (sortedUserSections[i]) {
        subSection.push(sortedUserSections[i]);
      }
      subSection.push(
        ...sortedUserSections.filter(
          (_, index) => index > i && index % nbColumns === i
        )
      );
      if (subSection.length > 0) {
        result.push(subSection);
      }
    }
    return result;
  }, [nbColumns, userSections]);

  const handleDragStart = (
    e: React.DragEvent<HTMLElement>,
    id: number,
    initialPosition: number
  ) => {
    setDragData({
      id,
      fixedInitialPosition: initialPosition,
      moveInitialPosition: initialPosition,
    });
    setCurrentHover(initialPosition);
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    if (e.clientY < 100) {
      window.scrollBy(0, -5);
    } else if (e.clientY > document.documentElement.clientHeight - 100) {
      window.scrollBy(0, 5);
    }
  };

  const handleDragEnter = (
    e: React.DragEvent<HTMLElement>,
    arrivalPosition: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentHover !== arrivalPosition) {
      setCurrentHover(arrivalPosition);
      dispatch(
        actionChangeSectionOrder({
          sectionId: dragData.id,
          arrivalPosition,
          initialPosition: dragData.moveInitialPosition,
        })
      );
      setDragData((prev) => ({
        ...prev,
        moveInitialPosition: arrivalPosition,
      }));
    }
  };

  const handleDragDrop = () => {
    if (dragData.fixedInitialPosition !== currentHover) {
      const newPositions = userSections
        .map((section) => ({
          id: section.id,
          position: section.position,
        }))
        .filter(
          (section) =>
            section.id !== 0 &&
            (dragData.fixedInitialPosition < currentHover!
              ? section.position >= dragData.fixedInitialPosition &&
                section.position <= currentHover!
              : section.position <= dragData.fixedInitialPosition &&
                section.position >= currentHover!)
        );
      dispatch(updateSectionsPositions({ newPositions }));
    }
    setCurrentHover(null);
    setDragData({
      id: 0,
      fixedInitialPosition: 0,
      moveInitialPosition: 0,
    });
  };

  return (
    <div className="dashboard">
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
              <div
                key={section.id}
                onDragOver={section.id !== 0 ? handleDragOver : undefined}
                onDragEnter={
                  section.id !== 0
                    ? (e) => handleDragEnter(e, section.position)
                    : undefined
                }
              >
                <div
                  className="dashboard-section"
                  draggable={section.id !== 0}
                  onDragStart={(e) =>
                    handleDragStart(e, section.id, section.position)
                  }
                  onDrop={handleDragDrop}
                >
                  <Section
                    id={section.id}
                    title={section.title}
                    position={section.position}
                    tasks={section.tasks}
                    lastUpdatedDate={section.lastUpdatedDate}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
