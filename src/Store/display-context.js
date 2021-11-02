import React from 'react';

const DisplayContext = React.createContext({
    currentActiveScreen: ['main', 'main'],
    mainMenuOptionSelected: 0,
    songMenuOptionSelected: 0,
    songIndex: 0,
    sidebarVisible: false
});

export default DisplayContext;

