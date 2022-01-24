import { Skeleton } from "@mui/material";

import useSaladsService from "../../services/SaladsService";
import MoleculeInfo from "../moleculeInfo/MoleculeInfo";

import './customSalad.scss';


const CustomSalad = (props) => {

    const {moleculesArray, onDeleteMolecules} = props;

    const {postSalad, process, setProcess} = useSaladsService();

    const onPostData = (e, arr) => {
        e.preventDefault()
        if (arr.length > 0) {
            postSalad()
                .then(arr)
                .then(setProcess('confirmed'))
        } else {
            return null
        }
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
            <form onSubmit={(e) => onPostData(e, moleculesArray)}>
                {renders}
                {process === 'confirmed' ? <div style={{'textAlign' : 'center', 'marginTop' : '30px'}}>Заказ отправлен</div> : null}
                <button className='custom__button custom__button_big'>Заказать</button>
            </form>
        </div>
    )

}

export default CustomSalad;