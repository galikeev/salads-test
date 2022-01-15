import { Skeleton } from "@mui/material";

import MoleculeInfo from "../moleculeInfo/MoleculeInfo";

const CustomSalad = (props) => {

    const {moleculesArray} = props;

    const elems = moleculesArray.map((elem, i) => <MoleculeInfo key={i} moleculeId={elem}/>)

    const renders = moleculesArray.length > 0 ? elems : <Skeleton variant="text" width={210} height={70}/>;

    return (
        <div>
            {renders}
        </div>
    )

}

export default CustomSalad;