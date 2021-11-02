import React, { useState, useContext } from 'react';

import classes from './WheelContainer.module.css';
import Wheel from './Wheel';
import Screen from '../Screen';


import DisplayContext from '../Store/display-context';


function WheelContainer() {

    const displayCtx = useContext(DisplayContext);
    const [menuIsShown, setMenuIsShown] = useState(false);

    const showMenuHandler = () => {
        const cur = menuIsShown;
        setMenuIsShown(!cur);
        displayCtx['sidebarVisibleControl']();
    }

    const displayingSelectedOptionHandler = () => {
        const cur = menuIsShown;
        if (displayCtx.currentActiveScreen.at(-1) === 'main' && displayCtx.mainMenuOptionSelected === 1) {
            // console.log(displayCtx);
            displayCtx['changeState']('songs');
            return;
        }
        if (cur) {
            setMenuIsShown(!cur);
        }
        displayCtx['sidebarVisibleControl']();
    }

    const changeMusicLeftButton = () => {
        if (menuIsShown) {
            displayCtx['backToMainMenu']();
            return;
        }
        displayCtx['changeSongIndex']('prev');
    }

    const changeMusicRightButton = () => {
        if (menuIsShown) {
            return;
        }
        displayCtx['changeSongIndex']('next');
    }

    return (
        <div className={classes.background}>
            <Screen show={menuIsShown} songsOrMenu={displayCtx.currentActiveScreen.at(-1)} screenCount={[displayCtx.mainMenuOptionSelected, displayCtx.songMenuOptionSelected]} />

            <Wheel onShowMenu={showMenuHandler} onClickSelect={displayingSelectedOptionHandler} onClickLeft={changeMusicLeftButton} onClickRight={changeMusicRightButton} />
        </div>
    );
}

export default WheelContainer;