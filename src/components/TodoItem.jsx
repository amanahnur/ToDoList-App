import { motion } from "framer-motion";
import React, { useRef } from "react";
import { GoCheck } from "react-icons/go";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { TbTrashXFilled } from "react-icons/tb";
import { MdEdit } from "react-icons/md";

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, completeTodo } = props;

  const inputRef = useRef(true);

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const update = (id, value, e) => {
    if (e.which === 13) {
      //here 13 is key code for enter key
      updateTodo({ id, item: value });
      inputRef.current.disabled = true;
    }
  };
  return (
    <>
      {item.completed === false ? (
        <motion.li
          initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
          animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
          whileHover={{
            scale: 0.9,
            transition: { type: "spring", duration: 0.1 },
          }}
          exit={{
            x: "-60vw",
            scale: [1, 0],
            transition: { duration: 0.5 },
            backgroundColor: "rgba(255,0,0,1)",
          }}
          key={item.id}
          className="card"
        >
          <motion.button
            className="checkBtn"
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => completeTodo(item.id)}
          >
            <GoCheck className="iconCheckHide" />
          </motion.button>
          <input
            type="text"
            ref={inputRef}
            disabled={inputRef}
            defaultValue={item.item}
            onKeyPress={(e) => update(item.id, inputRef.current.value, e)}
          />
          <div className="btnContainer">
            <motion.button
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.9 }}
              style={{ color: "#788896" }}
              onClick={() => changeFocus()}
            >
              {" "}
              <MdEdit />{" "}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.9 }}
              style={{ color: "#788896" }}
              onClick={() => removeTodo(item.id)}
            >
              {" "}
              <TbTrashXFilled />
            </motion.button>{" "}
          </div>
        </motion.li>
      ) : (
        <motion.li
          initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
          animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
          whileHover={{
            scale: 0.9,
            transition: { type: "spring", duration: 0.1 },
          }}
          exit={{
            x: "-60vw",
            scale: [1, 0],
            transition: { duration: 0.5 },
            backgroundColor: "rgba(255,0,0,1)",
          }}
          key={item.id}
          className="card strikeThrough"
        >
          <motion.button
            className="checkBtn"
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => completeTodo(item.id)}
          >
            <GoCheck />
          </motion.button>
          <input
            type="text"
            ref={inputRef}
            disabled={inputRef}
            defaultValue={item.item}
            className="strikeThroughEffect"
            readOnly
            onKeyPress={(e) => update(item.id, inputRef.current.value, e)}
          />
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: "#788896" }}
            onClick={() => removeTodo(item.id)}
          >
            {" "}
            <TbTrashXFilled />
          </motion.button>{" "}
        </motion.li>
      )}
    </>
  );
};

export default TodoItem;
