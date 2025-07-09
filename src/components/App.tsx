/* eslint-disable no-plusplus */
import { useEffect, useMemo, useState } from "react";
import { ISection } from "../@types/app";
import getNbColumns from "../utils/app";
import "./App.scss";
import Section from "./Sections/Sections";
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

  const sections: ISection[][] = useMemo(() => {
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

  return (
    <div className="app">
      <div className="sections_container">
        {sections.map((subSection) => (
          <div key={subSection[0]?.id} className="subsection__column">
            {subSection.map((section) => (
              <div key={section.id} className="subsection__column">
                <Section
                  id={section.id}
                  title={section.title}
                  tasks={section.tasks}
                  lastUpdatedDate={section.lastUpdatedDate}
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
