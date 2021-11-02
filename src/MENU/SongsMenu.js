import classes from './SongsMenu.module.css';
import { useContext } from 'react';
import DisplayContext from '../Store/display-context';

const SongsMenu = () => {
    const displayCtx = useContext(DisplayContext);

    return (
        <>
            <h2>
                Music
            </h2>
            <div className={`${displayCtx.songMenuOptionSelected === 0 ? classes.selected : ''} ${classes.divCommonStyle}`}><p>Playing</p></div>
            <div className={`${displayCtx.songMenuOptionSelected === 1 ? classes.selected : ''} ${classes.divCommonStyle}`}><p>Artists</p></div>

            <div className={classes.divCommonStyle} id={classes.instruct}><p><i className="fas fa-backward"></i>&emsp;Main Menu</p> </div>
        </>
    );
}

export default SongsMenu;
