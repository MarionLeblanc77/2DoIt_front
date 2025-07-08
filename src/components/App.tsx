import "./App.scss";
import Section from "./Sections/Sections";

function App() {
  const sections = [
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

  return sections.map((section) => (
    <div key={section.id}>
      <Section
        title={section.title}
        tasks={section.tasks}
        lastUpdatedDate={section.lastUpdatedDate}
      />
    </div>
  ));
}

export default App;
