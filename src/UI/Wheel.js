import classes from './Wheel.module.css';

function Wheel(props) {

    return (

        <div className={`area-for-zing ${classes['buttons-container']}`}>
            <button className={classes['center-circle']} onClick={props.onClickSelect}>
                <h2>Select</h2>
            </button>

            <button className={classes['menu-button']} onClick={props.onShowMenu}>
                MENU
            </button>
            <button className={classes['left-button']} onClick={props.onClickLeft}>
                <i className="fas fa-backward"></i>
            </button>
            <button className={classes['right-button']} onClick={props.onClickRight}>
                <i className="fas fa-forward"></i>
            </button>
            <div className="play-pause" >
                <i className="fas fa-play"></i>/<i className="fas fa-pause"></i>
            </div>
        </div>
    );
}
export default Wheel;