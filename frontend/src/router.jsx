import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./components/Error";
import SinglePost from "./pages/SinglePost";
import Profile from "./pages/Profile";
import PostForm from "./components/posts/PostForm";
import NewPost from "./pages/NewPost";

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
      { path: "/posts/new", element: <NewPost /> },
    ],
  },
];

export default routes;
