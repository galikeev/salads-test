import { useState, useEffect, useMemo } from "react";

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useSaladsService from "../../services/SaladsService";

import './moleculesList.scss';

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

const MoleculesList = (props) => {

    const [moleculesList, setMoleculesList] = useState([]);

    const {getAllMolecules, process, setProcess} = useSaladsService();

    useEffect(() => {
        onRequest();
        // eslint-disable-next-line
    }, [])

    const onRequest = () => {
        getAllMolecules()
            .then(onMoleculesListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onMoleculesListLoaded = (moleculesList) => {
        setMoleculesList(() => [...moleculesList]);
    }

    const renderItems = (arr) => {
        const items = arr.map((elem) => {
            return (
                <li className="molecules__item" key={elem._id}>
                    <div className="molecules__name">Молекула: {elem.title}</div>
                    <div className='molecules__img'>
                        <img src={elem.image} alt="d" />
                    </div>
                    <div className="molecules__price">Цена: {elem.price}$</div>
                    <div className="molecules__discount">Со скидкой: {elem.discount_price}$</div>
                    <button className="molecules__button" onClick={() => props.onSelectedMolecules(elem._id)}>Добавить</button>
                </li>
            )
        })

        return (
            <ul className="molecules__wrapper">
                {items}
            </ul>
        )
    }

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(moleculesList))
        // eslint-disable-next-line
    }, [process])

    return (
        <div className="molecules">
            <h2>Создай собственный салат</h2>
            <h3>Выбери ингредиенты</h3>
            {elements}
        </div>
    )
}

export default MoleculesList;