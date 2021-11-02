import classes from './MainMenu.module.css';
import { useContext } from 'react';
import DisplayContext from '../Store/display-context';

const MainMenu = () => {
    const displayCtx = useContext(DisplayContext);

    return (
        <>
            <div className={`${displayCtx.mainMenuOptionSelected === -1 ? classes.selected : ''} ${classes.divCommonStyle}`}><h2>
                iPod.js
            </h2>
            </div>

            <div className={`${displayCtx.mainMenuOptionSelected === 0 ? classes.selected : ''} ${classes.divCommonStyle}`}><p>Games</p></div>
            <div className={`${displayCtx.mainMenuOptionSelected === 1 ? classes.selected : ''} ${classes.divCommonStyle}`}><p>Songs</p></div>
            <div className={`${displayCtx.mainMenuOptionSelected === 2 ? classes.selected : ''} ${classes.divCommonStyle}`}><p>Settings</p></div>
        </>
    );
}

export default MainMenu;
