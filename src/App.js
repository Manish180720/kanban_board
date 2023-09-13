import React from "react";
import "./App.css";
import KanbanBoard from "./components/Board";
import GroupTitle from "./components/GroupTitle";


function App() {
  return (
    <div className="App">


      <header className="app-header">
        {/* Add any header content here */}
      </header>
      <main className="app-main">
        {/* <GroupTitle title="" ticketCount={10} /> */}
        <KanbanBoard />
      </main>
    </div>
  );
}

export default App;
