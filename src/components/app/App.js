import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import SaladsPage from "../pages/SaladsPage";
import MoleculesPage from "../pages/MoleculesPage";

const App = () => {

	return (
		<Router>
			<div className="app">
				<AppHeader/>
				<div className="app__wrapper">
					<Routes>
						<Route path='/' element={<SaladsPage/>}/>
						<Route path='/molecules' element={<MoleculesPage/>}/>
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
