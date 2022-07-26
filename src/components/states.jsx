import React from "react";

const States = ({ currentState, handleClick }) => {
  return (
    <>
      <div className="states">
        <div onClick={() => handleClick("all")} className="state-type">
          <p>All</p>
          <span className={currentState === "all" ? "active" : ""}></span>
        </div>
        <div onClick={() => handleClick("active")} className="state-type">
          <p>Active</p>
          <span className={currentState === "active" ? "active" : ""}></span>
        </div>
        <div onClick={() => handleClick("completed")} className="state-type">
          <p>Completed</p>
          <span className={currentState === "completed" ? "active" : ""}></span>
        </div>
      </div>
      <div className="horizontalLine"></div>
    </>
  );
};

export default States;
