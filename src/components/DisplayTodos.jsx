import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  addTodos,
  completeTodos,
  removeTodos,
  updateTodos,
} from "../redux/reducer";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
    completeTodo: (id) => dispatch(completeTodos(id)),
  };
};

const DisplayTodos = (props) => {
  const [sort, setSort] = useState("all");

  useEffect(() => {
    if (sort === "all") {
      const all_btn = document.querySelector("#allBtn")
      const active_btn = document.querySelector("#activeBtn")
      const completed_btn = document.querySelector("#completedBtn")
      all_btn.style.backgroundColor = "#1aae9f";
      active_btn.style.backgroundColor = "#788896";
      completed_btn.style.backgroundColor = "#788896";
    } else if (sort === "active") {
      const all_btn = document.querySelector("#allBtn")
      const active_btn = document.querySelector("#activeBtn")
      const completed_btn = document.querySelector("#completedBtn")
      all_btn.style.backgroundColor = "#788896";
      active_btn.style.backgroundColor = "#1aae9f";
      completed_btn.style.backgroundColor = "#788896";
    } else if (sort === "completed") {
      const all_btn = document.querySelector("#allBtn")
      const active_btn = document.querySelector("#activeBtn")
      const completed_btn = document.querySelector("#completedBtn")
      all_btn.style.backgroundColor = "#788896";
      active_btn.style.backgroundColor = "#788896";
      completed_btn.style.backgroundColor = "#1aae9f";
    }
  }, [sort])

  

  return (
    <div className="displaytodos">
      <div className="buttons">
        <motion.button id="allBtn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("all")}
        >
          All
        </motion.button>
        <motion.button id="activeBtn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("active")}
        >
          Active
        </motion.button>
        <motion.button id="completedBtn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("completed")}
        >
          Completed
        </motion.button>
      </div>
      <ul>
        <AnimatePresence>
          {props.todos.length > 0 && sort === "active"
            ? props.todos.map((item) => {
                return (
                  item.completed === false && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />
                  )
                );
              })
            : null}
          {/* for completed items */}
          {props.todos.length > 0 && sort === "completed"
            ? props.todos.map((item) => {
                return (
                  item.completed === true && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />
                  )
                );
              })
            : null}
          {/* for all items */}
          {props.todos.length > 0 && sort === "all"
            ? props.todos.map((item) => {
                return (
                  <TodoItem
                    key={item.id}
                    item={item}
                    removeTodo={props.removeTodo}
                    updateTodo={props.updateTodo}
                    completeTodo={props.completeTodo}
                  />
                );
              })
            : null}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);