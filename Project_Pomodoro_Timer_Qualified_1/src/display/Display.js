import React from "react";
import { secondsToDuration } from "../utils/duration/index";

function Display(props) {
  const { times } = props;

  function toPercent(part, whole) {
    return 100 - Math.floor((part / whole) * 100);
  }
  let currentTime = null;
  let defaultTime = null;
  if (times.isFocusMode) {
    currentTime = times.focus.current;
    defaultTime = times.focus.default;
  } else {
    currentTime = times.breakTime.current;
    defaultTime = times.breakTime.default;
  }
  let percent = toPercent(currentTime, defaultTime);

  if (times.hasStarted) {
    // returns the display if the timer has started
    return (
      <div>
        <div className="row mb-2">
          <div className="col">
            <h2 data-testid="session-title">
              {times.isFocusMode
                ? `Focusing for ${secondsToDuration(
                    times.focus.default
                  )} minutes`
                : `On Break for ${secondsToDuration(
                    times.breakTime.default
                  )} minutes`}
            </h2>
            <p className="lead" data-testid="session-sub-title">
              {times.isFocusMode
                ? `${secondsToDuration(times.focus.current)} remaining` // Displays the current times
                : `${secondsToDuration(times.breakTime.current)} remaining`}
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={percent}
                style={{ width: `${percent}%` }} // Displays the progress bar
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default Display;
