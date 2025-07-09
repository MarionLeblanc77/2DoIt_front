/* eslint-disable no-plusplus */
import { useEffect } from "react";
import { ISection } from "../@types/app";
import getNbColumns from "../utils/app";
import "./App.scss";
import Section from "./Sections/Sections";

function App() {
  const data: ISection[] = [
    {
      id: 1,
      title: "À faire1",
      tasks: [
        { id: 1, content: "Tâche 1", users: [1, 2] },
        { id: 2, content: "Tâche 2", users: [1, 2] },
        { id: 3, content: "Tâche 3", users: [1, 2] },
      ],
      lastUpdatedDate: new Date(),
    },
    {
      id: 2,
      title: "En cours2",
      tasks: [
        { id: 3, content: "Tâche 3", users: [1, 2] },
        { id: 4, content: "Tâche 4", users: [1, 2] },
      ],
      lastUpdatedDate: new Date(),
    },
    {
      id: 3,
      title: "Terminées3",
      tasks: [
        { id: 5, content: "Tâche 5", users: [1, 2] },
        { id: 6, content: "Tâche 6", users: [1, 2] },
        { id: 1, content: "Tâche 5", users: [1, 2] },
        { id: 2, content: "Tâche 6", users: [1, 2] },
      ],
      lastUpdatedDate: new Date(),
    },
    {
      id: 4,
      title: "À faire4",
      tasks: [
        { id: 1, content: "Tâche 1", users: [1, 2] },
        { id: 2, content: "Tâche 2", users: [1, 2] },
      ],
      lastUpdatedDate: new Date(),
    },
    {
      id: 5,
      title: "En cours5",
      tasks: [
        { id: 3, content: "Tâche 3", users: [1, 2] },
        { id: 4, content: "Tâche 4", users: [1, 2] },
      ],
      lastUpdatedDate: new Date(),
    },
    {
      id: 6,
      title: "Terminées6",
      tasks: [
        { id: 5, content: "Tâche 5", users: [1, 2] },
        { id: 6, content: "Tâche 6", users: [1, 2] },
      ],
      lastUpdatedDate: new Date(),
    },
  ];

  const nbColumns = getNbColumns();
  const sections: ISection[][] = [];

  if (nbColumns === 1) {
    sections.push(data);
  } else {
    for (let i = 0; i < nbColumns; i++) {
      let subSection: ISection[] = [];
      subSection = [data[i]];
      // console.log("subSection after first push", subSection);
      const filteredSections = data.filter(
        (_, index) => index > i && index % nbColumns === i
      );
      subSection.push(...filteredSections);

      sections.push(subSection);
    }
  }

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
