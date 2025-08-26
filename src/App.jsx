// import NewsHunter from "./components/NewsHunter";
// import "./App.css";

// function App() {
//   return (
//     <div>
//       <NewsHunter />
//     </div>
//   );
// }

// export default App;




import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsHunter from "./components/NewsHunter";
import Notes from "./components/Notes";
import Chat from "./components/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsHunter />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
