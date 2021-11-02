import classes from './MenuDisplay.module.css';
import { useContext } from 'react';
import DisplayContext from '../Store/display-context';
import SongsMenu from './SongsMenu';

import MainMenu from './MainMenu';

import ZingTouch from 'zingtouch';

var temp_change_in_angle = 0;

const zingTouchControl = (displayCtx) => {

    var zt = new ZingTouch.Region(document.getElementsByClassName('area-for-zing')[0]);

    zt.bind(document.getElementsByClassName('area-for-zing')[0], 'rotate', (event) => {

        let dist = event.detail.distanceFromLast;
        temp_change_in_angle += dist;
        if (temp_change_in_angle > 100) {
            displayCtx.changeMMOption('add');
            temp_change_in_angle = 0;
        }
        else if (temp_change_in_angle < -100) {
            displayCtx.changeMMOption('sub');
            temp_change_in_angle = 0;
        }

    });
}

function MenuDisplay() {
    const displayCtx = useContext(DisplayContext);
    zingTouchControl(displayCtx);
    return (
        <div className={classes.show}>
            {displayCtx.currentActiveScreen.at(-1) === "main" && <MainMenu />}
            {displayCtx.currentActiveScreen.at(-1) === "songs" && <SongsMenu />}
        </div>
    );
}


export default MenuDisplay;