import { useState, useEffect } from "react";
import Helmet from "../components/Helmet";
import HeaderPage from "../components/HeaderPage";
import ToDoList from "../components/TodoList";
import { useSelector } from "react-redux";
import TodoInput from "../components/TodoInput";
import { useNavigate } from "react-router-dom";
import * as todoService from "../services/todoService";
function Today() {
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
  const newList = toDoList.filter((task) => task.completed === false);
  const getCurrentDate = () => {
    const date = new Date();

    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      timeZone: "UTC",
      timeZoneName: "short",
    };

    const formatter = new Intl.DateTimeFormat("vi-VN", options);
    const formattedDate = formatter.format(date).slice(8);

    return formattedDate;
  };
  // function formatDateTime(inputDatetime) {
  //   // Chuyển chuỗi đầu vào thành đối tượng Date
  //   const dt = new Date(inputDatetime.replace('Z', '+00:00'));

  //   // Định dạng ngày tháng
  //   const dayOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  //   const formattedDate = `${dayOfWeek[dt.getDay()]}, ${dt.getDate()} tháng ${dt.getMonth() + 1}`;

  //   return formattedDate;
  // }
  return (
    <Helmet title="Ngày hôm nay">
      <HeaderPage title="Ngày hôm nay" subTitle={getCurrentDate()} />
      <TodoInput
        reRenderPage={reRenderPage}
        setReRenderPage={setReRenderPage}
      />
      <ToDoList
        toDoList={newList}
        setToDoList={setToDoList}
        reRenderPage={reRenderPage}
        setReRenderPage={setReRenderPage}
      />
    </Helmet>
  );
}
export default Today;
