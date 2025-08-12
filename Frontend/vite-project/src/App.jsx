import { Outlet, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/Landing/LandingPage";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";
import AboutUs from "./pages/About/AboutUs";
import TodoList from "./pages/Todo/TodoList";
import Header from "./components/common/header";
import Footer from "./components/common/footer";
// import "./index.css";
import "./App.css";
import AuthForm from "./pages/Auth/AuthForm";
import HomePage from "./pages/Home/HomePage";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-160px)]">
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
        <Route index element={<LandingPage />} />
        <Route path="auth" element={<AuthForm />}></Route>
        <Route path="home" element={<HomePage />}></Route>
        <Route path="about-us" element={<AboutUs />} />
        <Route path="todo-list" element={<TodoList />} />
      </Route>
    </Routes>
  );
};

export default App;
