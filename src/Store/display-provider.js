import { useReducer } from "react";

import DisplayContext from "./display-context";

const defaultDisplayState = {
    currentActiveScreen: ['main', 'main'],
    mainMenuOptionSelected: -1,
    songMenuOptionSelected: 0,
    songIndex: 0,
    sidebarVisible: false
}

const displayReducer = (state, action) => {

    if (action.type === 'prev') {
        const update = { ...state };
        update.songIndex = state.songIndex - 1 < 0 ? 8 : state.songIndex - 1;
        return update;
    }

    if (action.type === 'next') {
        const update = { ...state };
        update.songIndex = (state.songIndex + 1) % 9;
        return update;
    }

    if (action.type === 'main') {
        let updatedMainMenuOption = state.mainMenuOptionSelected;
        const updatedActiveScreen = [...state.currentActiveScreen, 'main'];
        return {
            currentActiveScreen: updatedActiveScreen,
            mainMenuOptionSelected: updatedMainMenuOption,
            songMenuOptionSelected: state.songMenuOptionSelected,
            songIndex: state.songIndex,
            sidebarVisible: state.sidebarVisible
        }
    }

    if (action.type === 'songs') {
        const updatedMainMenuOption = state.mainMenuOptionSelected;
        const updatedActiveScreen = [...state.currentActiveScreen, 'songs'];
        return {
            currentActiveScreen: updatedActiveScreen,
            mainMenuOptionSelected: updatedMainMenuOption,
            songMenuOptionSelected: state.songMenuOptionSelected,
            songIndex: state.songIndex,
            sidebarVisible: state.sidebarVisible
        }
    }

    if (action.type === 'add') {
        let updatedMainMenuOption = state.mainMenuOptionSelected;
        let updatedSongMenuOption = state.songMenuOptionSelected;
        if (state.sidebarVisible && state.currentActiveScreen.at(-1) === 'songs') {
            updatedSongMenuOption++;
            if (updatedSongMenuOption > 1) {
                updatedSongMenuOption = 0;
            }

        }

        if (state.sidebarVisible && state.currentActiveScreen.at(-1) === 'main') {
            updatedMainMenuOption++;
            if (updatedMainMenuOption > 2) {
                updatedMainMenuOption = -1;
            }

        }

        const updatedActiveScreen = state.currentActiveScreen;
        return {
            currentActiveScreen: updatedActiveScreen,
            mainMenuOptionSelected: updatedMainMenuOption,
            songMenuOptionSelected: updatedSongMenuOption,
            songIndex: state.songIndex,
            sidebarVisible: state.sidebarVisible
        }
    }

    if (action.type === 'sub') {
        let updatedMainMenuOption = state.mainMenuOptionSelected;
        let updatedSongMenuOption = state.songMenuOptionSelected;
        if (state.sidebarVisible && state.currentActiveScreen.at(-1) === 'songs') {
            updatedSongMenuOption--;
            if (updatedSongMenuOption < 0) {
                updatedSongMenuOption = 1;
            }

        }

        if (state.sidebarVisible && state.currentActiveScreen.at(-1) === 'main') {
            updatedMainMenuOption--;
            if (updatedMainMenuOption < -1) {
                updatedMainMenuOption = 2;
            }

        }

        const updatedActiveScreen = state.currentActiveScreen;
        return {
            currentActiveScreen: updatedActiveScreen,
            mainMenuOptionSelected: updatedMainMenuOption,
            songMenuOptionSelected: updatedSongMenuOption,
            songIndex: state.songIndex,
            sidebarVisible: state.sidebarVisible
        }
    }

    if (action.type === 'backToMain') {
        const update = { ...state };

        if (state.currentActiveScreen.at(-1) === 'songs') {
            update.currentActiveScreen.pop();
        }

        return update;
    }

    if (action.type === 'toggle') {
        const update = { ...state };

        if (state.sidebarVisible) {
            update.sidebarVisible = false;
        }
        else {
            update.sidebarVisible = true;
        }

        return update;
    }

    return defaultDisplayState;
}

const DisplayProvider = props => {
    const [displayState, dispatchDisplayAction] = useReducer(displayReducer, defaultDisplayState);

    const changeDisplayState = newState => {
        dispatchDisplayAction({
            type: newState
        });
    }

    const changeMainMenuSelectedOption = newSelect => {
        dispatchDisplayAction({
            type: newSelect
        });
    }

    const changeSongIndex = action => {
        dispatchDisplayAction({
            type: action
        });
    }

    const backToMainMenu = () => {
        dispatchDisplayAction(
            {
                type: 'backToMain'
            }
        )
    }

    const showingSideBarControl = () => {
        dispatchDisplayAction(
            {
                type: 'toggle'
            }
        )
    }

    const displayContext = {
        currentActiveScreen: displayState.currentActiveScreen,
        mainMenuOptionSelected: displayState.mainMenuOptionSelected,
        songMenuOptionSelected: displayState.songMenuOptionSelected,
        changeState: changeDisplayState,
        changeMMOption: changeMainMenuSelectedOption,
        changeSongIndex: changeSongIndex,
        songIndex: displayState.songIndex,
        backToMainMenu: backToMainMenu,
        sidebarVisibleControl: showingSideBarControl,
        sidebarVisible: displayState.sidebarVisible

    }

    return (
        <DisplayContext.Provider value={displayContext}>
            {props.children}
        </DisplayContext.Provider>
    )
}

export default DisplayProvider;