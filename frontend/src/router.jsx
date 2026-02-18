import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./components/Error";
import SinglePost from "./pages/SinglePost";
import Profile from "./pages/Profile";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/posts/:postId", element: <SinglePost /> },
      { path: "/users/:username", element: <Profile /> },
    ],
  },
];

export default routes;
