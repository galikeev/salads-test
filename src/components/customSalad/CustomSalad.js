import { Skeleton } from "@mui/material";

import useSaladsService from "../../services/SaladsService";
import MoleculeInfo from "../moleculeInfo/MoleculeInfo";

import './customSalad.scss';

const CustomSalad = (props) => {

    const {moleculesArray, onDeleteMolecules} = props;

    const {postSalad, setProcess} = useSaladsService();

    const onPostData = (arr) => {
        postSalad()
            .then(console.log(moleculesArray))
            .then(setProcess('confirmed'))
    }

    const elems = moleculesArray.map((elem, i) => {
        return (
            <div key={i} className='custom__wrapper'>
                <MoleculeInfo moleculeId={elem}/>
                <button className='custom__button' onClick={() => onDeleteMolecules(elem)}>delete</button>
            </div>
            
        )
    })

    const renders = moleculesArray.length > 0 ? elems : <Skeleton variant="text" width={350} height={100}/>;

    return (
        <div className='custom'>
            <h2 className='custom__title'>Твой собранный салат</h2>
            {renders}
            <button onClick={() => onPostData(moleculesArray)} className='custom__button custom__button_big'>Заказать</button>
        </div>
    )

}

export default CustomSalad;