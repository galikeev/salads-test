import { useState, useEffect } from 'react';

import useSaladsService from '../../services/SaladsService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './moleculeInfo.scss';

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>
        case 'loading':
            return <Spinner/>
        case 'confirmed':
            return <Component result={data}/>
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('Unexpected process state')
    }
}

const MoleculeInfo = (props) => {

    const [molecule, setMolecule] = useState(null);

    const {getMolecule, clearError, process, setProcess} = useSaladsService();

    useEffect(() => {
        updateMolecule();
        // eslint-disable-next-line
    }, [props.moleculeId])

    const updateMolecule = () => {
        const {moleculeId} = props;
        if (!moleculeId) {
            return
        }

        clearError();

        getMolecule(moleculeId)
            .then(onMoleculeLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onMoleculeLoaded = (molecule) => {
        setMolecule(molecule);
    }

    return (
        <div>
            {setContent(process, View, molecule)}
        </div>
    )
}

const View = ({result}) => {
    const {title, price, discount_price, image} = result;

    return (
        <div className='molecule'>
            <div className='molecule__block'>
                <div className='molecule__name'>{title}</div>
                <div className='molecule__img'>
                    <img src={image} alt="d" />
                </div>
            </div>
            <div>
                <div className='molecule__price'>Цена молекулы: {price}$</div>
                <div className='molecule__discount'>Цена со скидкой: {discount_price}$</div>
            </div>
        </div>
    )
}

export default MoleculeInfo;