import { ISection } from "../@types/app";
import getNbColumns from "../utils/app";
import "./App.scss";
import Section from "./Sections/Sections";

function App() {
  const data = [
    {
      id: 1,
      title: "À faire",
      tasks: [
        { id: 1, content: "Tâche 1", users: [1, 2] },
        { id: 2, content: "Tâche 2", users: [1, 2] },
        { id: 3, content: "Tâche 3", users: [1, 2] },
      ],
      lastUpdatedDate: new Date(),
    },
    {
      id: 2,
      title: "En cours",
      tasks: [
        { id: 3, content: "Tâche 3", users: [1, 2] },
        { id: 4, content: "Tâche 4", users: [1, 2] },
      ],
      lastUpdatedDate: new Date(),
    },
    {
      id: 3,
      title: "Terminées",
      tasks: [
        { id: 5, content: "Tâche 5", users: [1, 2] },
        { id: 6, content: "Tâche 6", users: [1, 2] },
        { id: 1, content: "Tâche 5", users: [1, 2] },
        { id: 2, content: "Tâche 6", users: [1, 2] },
      ],
      lastUpdatedDate: new Date(),
    },
    {
      id: 1,
      title: "À faire",
      tasks: [
        { id: 1, content: "Tâche 1", users: [1, 2] },
        { id: 2, content: "Tâche 2", users: [1, 2] },
      ],
      lastUpdatedDate: new Date(),
    },
    {
      id: 2,
      title: "En cours",
      tasks: [
        { id: 3, content: "Tâche 3", users: [1, 2] },
        { id: 4, content: "Tâche 4", users: [1, 2] },
      ],
      lastUpdatedDate: new Date(),
    },
    {
      id: 3,
      title: "Terminées",
      tasks: [
        { id: 5, content: "Tâche 5", users: [1, 2] },
        { id: 6, content: "Tâche 6", users: [1, 2] },
      ],
      lastUpdatedDate: new Date(),
    },
  ];

  const nbColumns = getNbColumns();
  const sections: ISection[] = [];

  if (nbColumns === 1) {
    const sections = data;
  } else {  
    for (let i = 0; i < nbColumns; i++) {
      const subSection = 
        sections.push()
  }

  return (
    <div className="app">
      <div className="sections_container">
        {sections.map((section) => (
          <div key={section.id} className="section">
            <Section
              title={section.title}
              tasks={section.tasks}
              lastUpdatedDate={section.lastUpdatedDate}
            />
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
}

export default App;
