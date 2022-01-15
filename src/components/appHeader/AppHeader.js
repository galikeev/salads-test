import { NavLink } from 'react-router-dom';

import './appHeader.scss';

const AppHeader = () => {
    return (
        <header>
            <nav className="app__header">
                <h2 className="app__title">
                    <NavLink to="/">Salads App</NavLink>
                </h2>
                <div className="app__menu">
                    <ul>
                        <li><NavLink end style={({isActive}) => ({color: isActive ? '#ffffff' : null})} to="/">Салаты</NavLink></li>
                        <li><NavLink end style={({isActive}) => ({color: isActive ? '#ffffff' : null})} to="molecules">Молекулы</NavLink></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;