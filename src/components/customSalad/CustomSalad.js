import { Skeleton } from "@mui/material";

import MoleculeInfo from "../moleculeInfo/MoleculeInfo";

const CustomSalad = (props) => {

    const {moleculesArray, onDeleteMolecules} = props;

    const elems = moleculesArray.map((elem, i) => {
        return (
            <div key={i} className='custom__wrapper'>
                <MoleculeInfo moleculeId={elem}/>
                <button onClick={() => onDeleteMolecules(elem)}>delete</button>
            </div>
            
        )
    })

    const renders = moleculesArray.length > 0 ? elems : <Skeleton variant="text" width={210} height={70}/>;

    return (
        <div className='custom'>
            {renders}
        </div>
    )

}

export default CustomSalad;