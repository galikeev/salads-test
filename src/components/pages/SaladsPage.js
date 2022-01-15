import { useState } from "react";

import SaladsList from "../saladsList/SaladsList";
import SaladInfo from "../saladInfo/SaladInfo";

const SaladsPage = () => {

    const [selectedSalad, setSelectedSalad] = useState(null)

    const onSaladSelected = (id) => {
        setSelectedSalad(id);
    }

    return (
        <>
            <SaladsList onSaladSelected={onSaladSelected}/>
			<h2>Выбранный салат</h2>
			<SaladInfo saladId={selectedSalad}/>
        </>
    )
}

export default SaladsPage;