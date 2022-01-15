import { useState } from "react";

import MoleculesList from "../moleculesList/MoleculesList";
import CustomSalad from "../customSalad/CustomSalad";

const MoleculesPage = (props) => {

    const [selectedMolecules, setSelectedMolecules] = useState([]);

    const onSelectedMolecules = (newId) => {
        setSelectedMolecules(id => [...id, newId])
    }

    const onDeleteMolecules = (id) => {
        setSelectedMolecules(selectedMolecules.filter(elem => elem !== id))
    }

    return (
        <div className='main__page'>
			<MoleculesList onSelectedMolecules={onSelectedMolecules}/>
            <CustomSalad moleculesArray={selectedMolecules} onDeleteMolecules={onDeleteMolecules}/>
        </div>
    )
}

export default MoleculesPage;