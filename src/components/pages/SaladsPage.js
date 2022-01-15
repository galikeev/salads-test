import { useState } from "react";

import SaladsList from "../saladsList/SaladsList";
import SaladInfo from "../saladInfo/SaladInfo";

import '../../style/style.scss';

const SaladsPage = () => {

    const [selectedSalad, setSelectedSalad] = useState(null)

    const onSaladSelected = (id) => {
        setSelectedSalad(id);
    }

    return (
        <div className='main__page'>
            <SaladsList onSaladSelected={onSaladSelected}/>
			<SaladInfo saladId={selectedSalad}/>
        </div>
    )
}

export default SaladsPage;