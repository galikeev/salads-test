import { useState, useEffect, useMemo } from "react";

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useSaladsService from "../../services/SaladsService";
import MoleculeInfo from "../moleculeInfo/MoleculeInfo";

import './saladsList.scss';

const setContent = (process, Component) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>
        case 'loading':
            return <Spinner/>
        case 'confirmed':
            return <Component/>
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('Unexpected process state')
    }
}

const SaladsList = (props) => {
    const [saladsList, setSaladsList] = useState([]);

    const {getAllSalads, process, setProcess} = useSaladsService();

    useEffect(() => {
        onRequest();
        // eslint-disable-next-line
    }, [])

    const onRequest = () => {
        getAllSalads()
            .then(onSaladsListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onSaladsListLoaded = (saladsList) => {
        setSaladsList(() => [...saladsList]);
    }

    const renderItems = (arr) => {
        const items = arr.map((elem) => {
            const molecules = elem.composition.map((id, i) => <MoleculeInfo key={i} moleculeId={id}/>);
            return (
                <li className="salads__item" key={elem._id}>
                    <div>
                        <div className="salads__name">{elem.title}</div>
                        <div className="salads__structure">Состав:</div>
                        <div className="salads__molecule">{molecules}</div>
                    </div>
                    <div>
                        <div className="salads__price">Цена: {elem.price}$</div>
                        <div className="salads__discount">Со скидкой: {elem.discount_price}$</div>
                        <button onClick={() => props.onSaladSelected(elem._id)} className="salads__button">Выбрать</button>
                    </div>
                </li>
            )
        })

        return (
            <ul className="salads__wrapper">
                {items}
            </ul>
        )
    }

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(saladsList))
        // eslint-disable-next-line
    }, [process])

    return (
        <div className="salads">
            <h2 className="salads__title">Выбери готовый салат</h2>
            {elements}
        </div>
    )
}

export default SaladsList;