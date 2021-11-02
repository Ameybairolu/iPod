import React, { useState, useContext } from 'react';

import classes from './WheelContainer.module.css';
import Wheel from './Wheel';
import Screen from '../Screen';


import DisplayContext from '../Store/display-context';

// This component is responsible for the entire display of iPod. This also enables changing values of the displayContext to control behaviour of each component
// The names of each function is pretty much self explanatory.


function WheelContainer() {

    const displayCtx = useContext(DisplayContext);
    const [menuIsShown, setMenuIsShown] = useState(false);
    // showMenuHandler helps display/hide menu bar by toggling menuIsShown state. 
    const showMenuHandler = () => {
        const cur = menuIsShown;
        setMenuIsShown(!cur);
        displayCtx['sidebarVisibleControl']();
    }
    // When an option is selected, we need to hide the menu bar, That is controlled by the below function
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

    // When we click on the left button, we need to go to the previous song. This uses changeSongIndex function provided by context and sends argument 'prev'
    const changeMusicLeftButton = () => {
        if (menuIsShown) {
            displayCtx['backToMainMenu']();
            return;
        }
        displayCtx['changeSongIndex']('prev');
    }
    // When we click on the right button, we need to go to the next song. This uses changeSongIndex function provided by context and sends argument 'next'
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