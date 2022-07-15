import React from "react";
import {BrowserRouter , Routes,  Route} from 'react-router-dom';
import Home from "./pages/home";
import Create from "./pages/createBlog";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import Blog from "./pages/blog";
import NotFound from "./pages/notFound";
const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/register" element={<Register/>} />
				<Route path="/login" element={<Login/>} />
				<Route path="/home" element={<Home/>} />
				<Route path="/profile" element={<Profile/>} />
				<Route path="/profile/:id" element={<Profile/>} />
				<Route path="/blog/:id" element={<Blog/>} />
				<Route path="/Create" element={<Create/>} />
				<Route path="*" element={<NotFound code={404} msg={"Page Not Found"}/>} />
			</Routes>
		</BrowserRouter>
	);
}
export default App;
