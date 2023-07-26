import { useState, useEffect } from "react";
import Helmet from "../components/Helmet";
import HeaderPage from "../components/HeaderPage";
import ToDoList from "../components/TodoList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as todoService from "../services/todoService";
function Completed() {
  const [toDoList, setToDoList] = useState([]);
  const [reRenderPage, setReRenderPage] = useState(false);
  const user = useSelector((state) => state.auth.login.currentUser);
  const id = user?.account?._id;
  const accessToken = user?.accessToken;
  const navigate = useNavigate();
  const idUser = localStorage.getItem("idUser");
  useEffect(() => {
    (async () => {
      const res = await todoService.getAllTodo(
        idUser ?? id,
        navigate,
        accessToken
      );
      setToDoList(res.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRenderPage]);
  const newTodolistHaveCompleted = toDoList.filter(
    (task) => task.completed === true
  );
  return (
    <Helmet title="Đã hoàn thành">
      <HeaderPage title="Đã hoàn thành" />
      <ToDoList
        toDoList={newTodolistHaveCompleted}
        setToDoList={setToDoList}
        reRenderPage={reRenderPage}
        setReRenderPage={setReRenderPage}
      />
    </Helmet>
  );
}

export default Completed;
