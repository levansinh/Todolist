import { useState } from "react";
import Button from "./Button";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import * as todoService from "../services/todoService";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
function TodoInput({ reRenderPage, setReRenderPage }) {
  const [formData, setFormData] = useState({
    task_name: "",
    description: "",
  });
  const [isActive, setIsActive] = useState(false);

  const user = useSelector((state) => state.auth.login.currentUser);
  const id = user?.account._id;
  const accessToken = user?.accessToken;
  const navigate = useNavigate();
  const idUser = localStorage.getItem('idUser')
  const handleSubmid = async (e) => {
    e.preventDefault();
    if (formData.task_name === "" || formData.description === "")
      return toast.error("chua nhap đủa thông tin");
    const res = await todoService.createTodo(
      { ...formData, id_user: id ?? idUser},
      navigate,
      accessToken
    );
    if (res) {
      toast.success("Add successfully");
    }
    setReRenderPage(!reRenderPage);
    setFormData({
      task_name: "",
      description: "",
    });
  };
  const handleOnChangeInput = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="px-[55px]">
      {isActive ? (
        <div className="rounded-md border-gray-300 border-solid border-[1px]">
          <form className="flex flex-col pt-[10px] px-[10px] border-gray-300 border-solid border-b-[1px]">
            <input
              type="text"
              placeholder="Tên tác vụ"
              value={formData.task_name}
              onChange={handleOnChangeInput}
              name="task_name"
              className="outline-none text-[#202020] "
            />
            <input
              type="text"
              placeholder="Mô tả"
              value={formData.description}
              onChange={handleOnChangeInput}
              name="description"
              className="outline-none text-[#202020] "
            />
          </form>
          <div className="mt-[10px] p-2 flex justify-between items-center">
            <div className=""></div>
            <div className="">
              <Button onClick={() => setIsActive(false)}>Cancel</Button>
              <Button primary onClick={handleSubmid}>
              Tạo tác vụ
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="" onClick={() => setIsActive(true)}>
          <Button primary>Tạo tác vụ</Button>
        </div>
      )}
    </div>
  );
}

TodoInput.propTypes = {
  setReRenderPage: PropTypes.func,
  reRenderPage: PropTypes.bool,
};

export default TodoInput;
