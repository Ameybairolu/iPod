// import React, { useState } from 'react';
import classes from './Screen.module.css';
import MenuDisplay from './MENU/MenuDisplay';
import Games from './SCREENS/Games';
import Settings from './SCREENS/Settings';
import Songs from './SCREENS/Songs';
import Index from './SCREENS/example/script';
import Artists from './SCREENS/Artists';
import { useTransition, animated } from 'react-spring';

function Screen(props) {

    const transition = useTransition(props.show, {
        from: { x: -100, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        leave: { x: - 100, opacity: 0 },
    })

    return (
        <>
            <div className={classes.display}>
                {
                    transition((style, item) => item ? <animated.div style={style} className={classes['menu-container']}><MenuDisplay /></animated.div> : '')
                }
                {/* {props.show && <MenuDisplay />} */}
                {(props.songsOrMenu === 'main') && (props.screenCount[0] === 0) && < Games />}
                {(props.songsOrMenu === 'main') && (props.screenCount[0] === 1) && < Songs />}
                {(props.songsOrMenu === 'main') && (props.screenCount[0] === 2) && < Settings />}

                {(props.songsOrMenu === 'songs') && (props.screenCount[1] === 0) && < Index />}
                {(props.songsOrMenu === 'songs') && (props.screenCount[1] === 1) && < Artists />}
            </div>
        </>
    );
}

export default Screen;