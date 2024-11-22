// Router sve komponente

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./UserList";
import Albums from "./Albums";
import Todos from "./Todos";
import Posts from "./Posts";
import PostDetails from "./PostDetails";
import Photos from "./Photos";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users/:userId/albums" element={<Albums />} />
        <Route path="/albums/:albumId/photos" element={<Photos />} />
        <Route path="/users/:userId/todos" element={<Todos />} />
        <Route path="/users/:userId/posts" element={<Posts />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
