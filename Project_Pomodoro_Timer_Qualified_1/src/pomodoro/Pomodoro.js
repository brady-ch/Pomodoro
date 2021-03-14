import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import Button from "../button/Button";
import { secondsToDuration } from "../utils/duration";
import TimerController from "../button/TimerController";
import Display from "../display/Display";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [times, setTimes] = useState({
    // is the main state that is used to generate most of the code
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
  });

  // This is what happens when the timer is running.

  useInterval(
    () => {
      if (times.focus.current < 1) {
        // When current time is 0 it will change the state to break, reset the time, and play a sound
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
        setTimes({
          ...times,
          focus: { ...times.focus, current: times.focus.default },
          isFocusMode: false,
        });
      } else if (times.breakTime.current < 1) {
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
        setTimes({
          ...times,
          breakTime: { ...times.breakTime, current: times.breakTime.default },
          isFocusMode: true,
        });
      } else if (times.isFocusMode) {
        // Subtracts from the current  times
        setTimes({
          ...times,
          focus: { ...times.focus, current: times.focus.current - 1 },
        });
      } else if (!times.isFocusMode) {
        setTimes({
          ...times,
          breakTime: {
            ...times.breakTime,
            current: times.breakTime.current - 1,
          },
        });
      }
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    if (!times.hasStarted && !isTimerRunning) {
      setTimes({ ...times, hasStarted: true });
    }
    setIsTimerRunning((prevState) => !prevState);
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              Focus Duration: {secondsToDuration(times.focus.current)}{" "}
              {/*Displays current focus duration*/}
            </span>
            <div className="input-group-append">
              {/*Creates the plus or minus buttons by calling the Button.js component*/}
              <Button
                isFocus={true}
                isIncrease={false}
                oioi={"oi oi-minus"}
                times={times}
                setTimes={setTimes}
              />
              {/*Creates the plus or minus buttons by calling the Button.js component*/}
              <Button
                isFocus={true}
                isIncrease={true}
                oioi={"oi oi-plus"}
                times={times}
                setTimes={setTimes}
              />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {secondsToDuration(times.breakTime.current)}
              </span>
              <div className="input-group-append">
                {/*Creates the plus or minus buttons by calling the Button.js component*/}
                <Button
                  isFocus={false}
                  isIncrease={false}
                  oioi={"oi oi-minus"}
                  times={times}
                  setTimes={setTimes}
                />
                {/*Creates the plus or minus buttons by calling the Button.js component*/}
                <Button
                  isFocus={false}
                  isIncrease={true}
                  oioi={"oi oi-plus"}
                  times={times}
                  setTimes={setTimes}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Creates the controller (pause Stop and play) for the display*/}
      <TimerController
        times={times}
        isTimerRunning={isTimerRunning}
        playPause={playPause}
        hasStarted={times.hasStarted}
        setTimes={setTimes}
      />
      <Display times={times} />{" "}
      {/*Calls the display component and  generates it based off of the times State hook*/}
    </div>
  );
}

export default Pomodoro;
