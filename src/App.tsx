import "./App.css";
import { Navbar } from "./components/navbar";
import ContestList from "./components/contest-list";
import { Route, Routes } from "react-router-dom";
import BookmarksPage from "./components/Booksmarks/bookmarks";

function App() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Routes>
        <Route path="/bookmarks" element={<BookmarksPage />} />{" "}
        <Route path="/contests" element={<ContestList />} />{" "}
        {/* ✅ Contests Route */}
      </Routes>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Upcoming Coding Contests
        </h1>
        <ContestList />
      </div>
    </main>
  );
}

export default App;
