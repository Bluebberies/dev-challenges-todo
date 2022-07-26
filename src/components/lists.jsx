import React from "react";
import States from "./states";
import TextInput from "./textInput";

const Lists = (props) => {
  const {
    allTasks,
    currentState,
    handleCheck,
    activeTasks,
    completedTasks,
    handleStateClick,
    handleChange,
    input,
    addTask,
    keyDown,
    deleteAll,
    handleDelete,
  } = props;

  if (currentState === "all") {
    return (
      <>
        <States currentState={currentState} handleClick={handleStateClick} />
        <TextInput
          handleChange={handleChange}
          input={input}
          addTask={addTask}
          handleKeyDown={keyDown}
        />
        {allTasks.length === 0 ? (
          <p>You have no task!</p>
        ) : (
          <ul>
            {allTasks.map((item) => (
              <li key={item.id}>
                <div className="taskItem">
                  <input
                    name="checkBox"
                    value={item}
                    type="checkbox"
                    onChange={(e) => handleCheck(e, item)}
                    checked={allTasks[allTasks.indexOf(item)].checked}
                    id="checkBox"
                  />
                  <label
                    htmlFor="checkBox"
                    className={item.checked ? "checked" : ""}
                  >
                    {item.task}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  } else if (currentState === "active") {
    return (
      <>
        <States currentState={currentState} handleClick={handleStateClick} />
        <TextInput
          handleChange={handleChange}
          input={input}
          addTask={addTask}
          handleKeyDown={keyDown}
        />
        {activeTasks.length === 0 ? (
          <p>You have no active task!</p>
        ) : (
          <ul>
            {allTasks.map(
              (item) =>
                !item.checked && (
                  <li key={item.id}>
                    <div className="taskItem">
                      <input
                        name="checkBox"
                        value={item}
                        type="checkbox"
                        onChange={(e) => handleCheck(e, item)}
                        checked={allTasks[allTasks.indexOf(item)].checked}
                        id="checkBox"
                      />
                      <label
                        htmlFor="checkBox"
                        className={item.checked ? "checked" : ""}
                      >
                        {item.task}
                      </label>
                    </div>
                  </li>
                )
            )}
          </ul>
        )}
      </>
    );
  } else if (currentState === "completed") {
    return (
      <>
        <States currentState={currentState} handleClick={handleStateClick} />
        {completedTasks.length === 0 ? (
          <p>No Completed Task!</p>
        ) : (
          <ul>
            {completedTasks.map((item) => (
              <li key={item.id}>
                <div className="taskItem">
                  <input
                    name="checkBox"
                    value={item}
                    type="checkbox"
                    onChange={(e) => handleCheck(e, item)}
                    checked={completedTasks[completedTasks.indexOf(item)].checked}
                    id="checkBox"
                  />
                  <label
                    htmlFor="checkBox"
                    className={item.checked ? "checked" : ""}
                  >
                    {item.task}
                  </label>
                </div>
                <i
                  onClick={() => handleDelete(item)}
                  className="fa-solid fa-trash"
                ></i>
              </li>
            ))}
            <button className="delete" onClick={deleteAll}>
              <i className="fa-solid fa-trash"></i>
              <span>delete all</span>
            </button>
          </ul>
        )}
      </>
    );
  }
};

export default Lists;
