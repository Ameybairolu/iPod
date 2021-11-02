import React, { useContext } from "react";
import classes from './style.module.css';
import ReactDOM from 'react-dom';

import DisplayContext from "../../Store/display-context";

// contains all the links to the songs used in the project

const tracks = [
    {
        name: "Mekanın Sahibi",
        artist: "Norm Ender",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3",
        url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
        favorited: false
    },
    {
        name: "Everybody Knows",
        artist: "Leonard Cohen",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3",
        url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
        favorited: true
    },
    {
        name: "Extreme Ways",
        artist: "Moby",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3",
        url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
        favorited: false
    },
    {
        name: "Butterflies",
        artist: "Sia",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3",
        url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y",
        favorited: false
    },
    {
        name: "The Final Victory",
        artist: "Haggard",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3",
        url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
        favorited: true
    },
    {
        name: "Genius ft. Sia, Diplo, Labrinth",
        artist: "LSD",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/6.mp3",
        url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
        favorited: false
    },
    {
        name: "The Comeback Kid",
        artist: "Lindi Ortega",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3",
        url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
        favorited: true
    },
    {
        name: "Overdose",
        artist: "Grandson",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
        url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
        favorited: false
    },
    {
        name: "Rag'n'Bone Man",
        artist: "Human",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
        url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
        favorited: false
    }]



// Declare player
const player = new Audio(tracks[0].source);
player.setAttribute('preload', 'metadata');


// Component to display controls
function Control(props) {

    return (
        <div className={classes.controls}>
            {
                props.playState === true ?
                    <button
                        className={classes.centerButton}
                        onClick={x => props.setPlayState(false)}>

                    </button> :
                    <button
                        className={classes.centerButton}
                        onClick={x => props.setPlayState(true)}>
                    </button>
            }
        </div>
    );
}

const userOptions = React.createContext({
    shuffle: false,
    repeat: true,
})

// component to display progress of song being played

function Progress(props) {

    let options = React.useContext(userOptions);

    const refInterval = setInterval(() => {


        // let secPerPx = Math.ceil(player.duration) / 280
        // let newWidth = player.currentTime / secPerPx
        let newWidth = (player.currentTime / player.duration) * 100;

        let progressBar = document.querySelector('.progressBar')
        if (!progressBar) {
            clearInterval(refInterval)
            return;
        }
        document.querySelector('.progressBar').style.width = newWidth + "%"

        document.querySelector('.currentTime').innerHTML = `${formatTime(Math.ceil(player.currentTime))}`;
        document.querySelector('.songLength').innerHTML = `${formatTime(Math.ceil(player.duration))}`;

        if (player.currentTime === player.duration) {
            if (options.repeat === true) {
                player.play();
            }
        }
    }, 1000);

    function formatTime(s) {
        return Number.isNaN(s) ? '0:00' : (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
    }

    return (
        <div className="progress">
            <div className="currentTime">
            </div>
            <div
                className="progressCenter"
            >
                <div className="progressBar">
                </div>
            </div>
            <div className="songLength">
                {/* <p>{formatTime(length)}</p> */}
            </div>
        </div>
    );
}


// component to display album cover, singer and song name on the  screen

function Avatar(props) {
    return (
        <>
            <img src={tracks[props.idx].cover} className={classes.avatar1} alt="blur" />
            <img src={tracks[props.idx].cover} className={classes.avatar} alt="main" />
            <h4 className={classes.name}>{tracks[props.idx].artist}</h4>
            <h1 className={classes.title}>{tracks[props.idx].name}</h1>
        </>
    );
}


// Wrapping all the above defined components in a single container
function Container() {
    const displayCtx = useContext(DisplayContext);
    let [playState, setPlayState] = React.useState(false);
    let oldIdx = React.useRef(displayCtx.songIndex);


    React.useEffect(() => {

        if (playState === true)
            player.play();
        else
            player.pause();
        if (displayCtx.songIndex !== oldIdx.current) {
            player.pause();
            player.src = tracks[displayCtx.songIndex].source;
            player.load();
            player.play();
            setPlayState(true);
            oldIdx.current = displayCtx.songIndex;
        }

    }, [displayCtx.songIndex, playState])

    const portalElement = document.querySelector('.play-pause');

    return (
        <>
            <div className={classes.playerContaier}>
                <Avatar idx={displayCtx.songIndex} />
                <Progress
                    idx={displayCtx.songIndex}
                    songMenuOption={displayCtx.songMenuOptionSelected}
                />
            </div>
            {ReactDOM.createPortal(<Control
                idx={displayCtx.songIndex}
                playState={playState}
                setPlayState={setPlayState} />, portalElement)}
        </>
    );
}


// root method
function Index() {
    return (
        <div className={classes.container} >
            <Container />
        </div>
    );
}

export default Index;