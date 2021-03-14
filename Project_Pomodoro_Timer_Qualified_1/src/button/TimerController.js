import React from "react";
import classNames from "../utils/class-names";

function TimerController(props) {
  const { hasStarted, setTimes, isTimerRunning, playPause } = props;

  const toReset = {
    // This is the variable to reset it to the default value when the times need to reset
    focus: { max: 60, min: 5, default: 25 * 60, interval: 5, current: 25 * 60 },
    breakTime: {
      max: 15,
      min: 1,
      default: 5 * 60,
      interval: 1,
      current: 5 * 60,
    },
    hasStarted: false,
    isFocusMode: true,
  };

  const stopHandler = () => {
    if (isTimerRunning) {
      playPause();
    }
    setTimes({ ...toReset });
  };

  return (
    //returns the play, pause and stop buttons
    <div className="row">
      <div className="col">
        <div
          className="btn-group btn-group-lg mb-2"
          role="group"
          aria-label="Timer controls"
        >
          <button
            type="button"
            className="btn btn-primary"
            data-testid="play-pause"
            title="Start or pause timer"
            onClick={playPause}
          >
            <span
              className={classNames({
                oi: true,
                "oi-media-play": !isTimerRunning,
                "oi-media-pause": isTimerRunning,
              })}
            />
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            title="Stop the session"
            onClick={stopHandler}
            disabled={hasStarted ? false : true}
          >
            <span className="oi oi-media-stop" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimerController;
