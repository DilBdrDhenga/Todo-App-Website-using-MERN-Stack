import { Outlet, Route, Routes } from "react-router-dom";

import "./App.css";
import Footer from "./components/common/footer";
import Header from "./components/common/header";
import AuthForm from "./pages/Auth/AuthForm";
import ErrorPage from "./pages/Error/ErrorPage";
import HomePage from "./pages/Home/HomePage";
import LandingPage from "./pages/Landing/LandingPage";
import TodoList from "./pages/Todo/TodoList";

const Layout = () => {
  return (
    <>
      <main className="min-h-[calc(100vh-95px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <>
              <Header />
              <LandingPage />
            </>
          }
        />
        <Route
          path="auth"
          element={
            <>
              <Header />
              <AuthForm />
            </>
          }
        />
        <Route path="home" element={<HomePage />} />
        <Route path="todo-list" element={<TodoList />} />
      </Route>

      <Route
        path="*"
        element={
          <>
            <Header />
            <ErrorPage />
            <Footer />
          </>
        }
      />
    </Routes>
  );
};

export default App;
