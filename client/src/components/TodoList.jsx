import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { ContextMenu, ContextMenuTrigger } from "react-contextmenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
import * as todoService from "../services/todoService";
import { toast } from "react-toastify";
import Modal from "react-modal";
import Button from "./Button/Button";

function ToDoList({ toDoList, setToDoList, reRenderPage, setReRenderPage }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [idTask, setIdTask] = useState("");
  const [formData, setFormData] = useState({
    task_name: "",
    description: "",
  });
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const navigate = useNavigate();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const handleUpdateCheckBox = async (tasks) => {
    await todoService.updateTodo(
      tasks._id,
      { completed: !tasks.completed },
      navigate,
      accessToken
    );
    setReRenderPage(!reRenderPage);
  };
  const handleChangeImportant = async (tasks) => {
    await todoService.updateTodo(
      tasks._id,
      { important: !tasks.important },
      navigate,
      accessToken
    );
    setReRenderPage(!reRenderPage);
  };

  const handleDelete = async (taskId) => {
    const res = await todoService.deleteCategory(taskId, navigate, accessToken);
    if (res) {
      toast.success("Delete successfully");
    } else {
      toast.error("Delete failed");
    }
    const newTodo = toDoList.filter((task) => task._id !== taskId);
    setToDoList(newTodo);
  };

  function openModal(task) {
    setIsOpen(true);
    if (task) {
      const { task_name, description, _id } = task;
      setFormData({ task_name, description });
      setIdTask(_id);
    } else {
      setFormData({ category_name: "" });
    }
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleOnChangeInput = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmid = async (e) => {
    e.preventDefault();
    if (formData.task_name === "" || formData.description === "")
      return toast.error("chua nhap đủa thông tin");
    const res = await todoService.updateTodo(
      idTask,
      formData,
      navigate,
      accessToken
    );
    if (res) {
      toast.success("Update successfully");
    }
    setReRenderPage(!reRenderPage);
    setFormData({
      task_name: "",
      description: "",
    });
    closeModal();
  };

  return (
    <div className="px-[55px] w-full mt-[15px]">
      {toDoList?.length === 0 && "Không tồn tại tác vụ nào "}
      {toDoList?.map((item) => (
        <div className="border-b-[1px]" key={item._id}>
          <ContextMenuTrigger id={item._id}>
            <div className="flex justify-between items-center ">
              <div className="flex flex-row items-start gap-x-4">
                <label htmlFor="item">
                  <input
                    type="checkbox"
                    checked={item.completed === true}
                    onChange={() => handleUpdateCheckBox(item)}
                  />
                </label>
                <div className="flex flex-col gap-y-2 px-[8px] ">
                  <span className="text-sm"> {item.task_name}</span>
                  <span className="text-xs text-zinc-500 mb-[3px]">
                    {" "}
                    {item.description}
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-x-5 text-md ">
                <div
                  className={`text-xl ${
                    item.important ? "text-yellow-500" : "text-zinc-300"
                  } cursor-pointer`}
                  onClick={() => handleChangeImportant(item)}
                >
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <div
                  className="text-xl cursor-pointer text-blue-500"
                  onClick={() => openModal(item)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </div>
              </div>
            </div>
          </ContextMenuTrigger>
          <ContextMenu id={item._id}>
            <div className="py-[6px] rounded-[4px] bg-white shadow-[rgba(0,0,0,0.133)_0px_3.2px_7.2px_0px]">
              <ul>
                <li
                  className="flex items-center px-[12px] h-[36px] text-[#a80000] hover:bg-[#f5f5f5] cursor-pointer"
                  onClick={() => handleDelete(item._id)}
                >
                  <span className="mx-[4px]"></span>
                  <span className="mx-[4px] px-[4px] text-[14px]">
                    {" "}
                    <FontAwesomeIcon icon={faTrash} /> Xóa tác vụ
                  </span>
                </li>
              </ul>
            </div>
          </ContextMenu>
        </div>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <div className="rounded-md w-[500px] border-gray-300 border-solid border-[1px]">
          <form className="flex flex-col pt-[10px] px-[10px] border-gray-300 border-solid border-b-[1px]">
            <input
              type="text"
              placeholder="Task name"
              value={formData.task_name}
              onChange={handleOnChangeInput}
              name="task_name"
              className="outline-none text-[#202020] "
            />
            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={handleOnChangeInput}
              name="description"
              className="outline-none text-[#202020] "
            />
          </form>
          <div className="mt-[10px] p-2 flex justify-between items-center">
            <div className=""></div>
            <div className="">
              <Button primary onClick={handleSubmid}>
                Update task
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
ToDoList.propTypes = {
  toDoList: PropTypes.array,
  reRenderPage: PropTypes.bool,
  setReRenderPage: PropTypes.func,
  setToDoList: PropTypes.func,
};

export default ToDoList;
