import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./components/Error";
import SinglePost from "./pages/SinglePost";
import Profile from "./pages/Profile";
import NewPost from "./pages/NewPost";
import UserSearch from "./pages/UserSearch";
import Messages from "./pages/Messages";
import Chat from "./pages/Chat";

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
      { path: "/users/search", element: <UserSearch /> },
      { path: "/chats", element: <Messages /> },
      { path: "/chats/:selectedUserId", element: <Chat /> },
    ],
  },
];

export default routes;
