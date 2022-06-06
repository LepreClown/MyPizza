import Header from "./components/Header";
import Home from "./Pages/Home";
import {Routes, Route} from "react-router-dom";
import './scss/app.scss'
import NotFound from "./Pages/NotFound";
import Cart from "./Pages/Cart";
import {createContext, useState} from "react";

export const SearchContext = createContext('')

function App() {
	const [searchValue, setSearchValue] = useState('')
	return (
		<SearchContext.Provider value={{searchValue, setSearchValue}}>
			<div className="wrapper">
				<Header/>
				<div className="content">
					<Routes>
						<Route path={'/'} element={<Home/>}/>
						<Route path={'*'} element={<NotFound/>}/>
						<Route path={'/cart'} element={<Cart/>}/>
					</Routes>
				</div>
			</div>
		</SearchContext.Provider>
	);
}

export default App;