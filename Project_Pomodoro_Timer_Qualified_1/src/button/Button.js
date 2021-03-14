import React from "react";

function Button(props) {
  const { isIncrease, isFocus, times, setTimes, oioi } = props;
  const { focus, breakTime } = times;
  const interval = isFocus ? focus.interval * 60 : breakTime.interval * 60;

  const dataTest = isFocus // This will determine what test class needs to passed into the buttons
    ? isIncrease
      ? "increase-focus"
      : "decrease-focus"
    : isIncrease
    ? "increase-break"
    : "decrease-break";

  function clamp(n, min, max) {
    // Clamps values at the max and min given
    return n > max * 60 ? max * 60 : n < min * 60 ? min * 60 : n;
  }

  const clickHandler = () => {
    // sets the time state to a new state based on the interval
    isFocus
      ? isIncrease
        ? setTimes({
            ...times,
            focus: {
              ...focus,
              current: clamp(focus.current + interval, focus.min, focus.max),
              default: clamp(focus.default + interval, focus.min, focus.max),
            },
          })
        : setTimes({
            ...times,
            focus: {
              ...focus,
              current: clamp(focus.current - interval, focus.min, focus.max),
              default: clamp(focus.default - interval, focus.min, focus.max),
            },
          })
      : isIncrease
      ? setTimes({
          ...times,
          breakTime: {
            ...breakTime,
            current: clamp(
              breakTime.current + interval,
              breakTime.min,
              breakTime.max
            ),
            default: clamp(
              breakTime.default + interval,
              breakTime.min,
              breakTime.max
            ),
          },
        })
      : setTimes({
          ...times,
          breakTime: {
            ...breakTime,
            current: clamp(
              breakTime.current - interval,
              breakTime.min,
              breakTime.max
            ),
            default: clamp(
              breakTime.default - interval,
              breakTime.min,
              breakTime.max
            ),
          },
        });
  };

  return (
    //returns the button
    <button
      type="button"
      className="btn btn-secondary"
      data-testid={dataTest}
      onClick={clickHandler}
    >
      <span className={oioi} />
    </button>
  );
}

export default Button;
