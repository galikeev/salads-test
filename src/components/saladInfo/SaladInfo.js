import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";

import useSaladsService from '../../services/SaladsService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './saladInfo.scss';

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Skeleton variant="text" width={210} height={70}/>
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

const SaladInfo = (props) => {
    
    const [salad, setSalad] = useState(null);

    const {getSalad, clearError, process, setProcess} = useSaladsService();

    useEffect(() => {
        updateSalad();
        // eslint-disable-next-line
    }, [props.saladId])

    const updateSalad = () => {
        const {saladId} = props;
        if(!saladId) {
            return
        }

        clearError();

        getSalad(saladId)
            .then(onSaladLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onSaladLoaded = (salad) => {
        setSalad(salad);
    }

    return (
        <div className='salad'>
            <div className="salad__wrapper">
                {setContent(process, View, salad)}
            </div>
        </div>
    )
}

const View = ({result}) => {

    const {postSalad, process, setProcess} = useSaladsService();

    const {title} = result;

    const onPostData = (result) => {
        postSalad()
            .then(console.log(result))
            .then(setProcess('confirmed'))
    }

    return (
        <div className='salad__block'>
            <h2 className='salad__title'>Выбранный салат</h2>
            <div className='salad__name'>{title}</div>
            {process === 'confirmed' ? <div style={{'textAlign' : 'center', 'marginTop' : '30px'}}>Заказ отправлен</div> : null}
            <button onClick={() => onPostData(result)} className='salad__button'>Заказать</button>
        </div>
    )
}

export default SaladInfo;