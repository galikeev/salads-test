import { useState, useEffect, useMemo } from "react";

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useSaladsService from "../../services/SaladsService";

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
    const [newItemLoading, setNewItemLoading] = useState(false);

    const {getAllMolecules, process, setProcess} = useSaladsService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllMolecules()
            .then(onSaladsListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onSaladsListLoaded = (newSaladsList) => {
        setSaladsList(saladsList => [...saladsList, ...newSaladsList]);
        setNewItemLoading(() => false)
    }

    const renderItems = (arr) => {
        const items = arr.map((elem, i) => {
            return (
                <li key={elem._id}>
                    <div>{elem.title}</div>
                    <img src={elem.image} alt={elem.title} />
                    <div>Цена: {elem.price}$</div>
                    <div>Со скидкой: {elem.discount_price}$</div>
                </li>
            )
        })

        return (
            <ul>
                {items}
            </ul>
        )
    }

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(saladsList), newItemLoading)
    }, [process])

    return (
        <>
            {elements}
        </>
    )
}

export default SaladsList;