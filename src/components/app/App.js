import { useState } from "react";

import SaladsList from "../saladsList/SaladsList";
import SaladInfo from "../saladInfo/SaladInfo";

const App = () => {

	const [selectedSalad, setSelectedSalad] = useState(null)

    const onSaladSelected = (id) => {
        setSelectedSalad(id);
    }

	return (
		<div className="app">
			<SaladsList onSaladSelected={onSaladSelected}/>
			<h2>Выбранный салат</h2>
			<SaladInfo saladId={selectedSalad}/>
		</div>
	);
}

export default App;
