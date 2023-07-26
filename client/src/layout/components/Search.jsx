import HeadlessTippy from "@tippyjs/react/headless";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import ToDoList from "../../components/TodoList";
import * as todoService from "../../services/todoService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hook/useDebounced";
function Search() {
  const [showResult, setShowResult] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [reRenderPage, setReRenderPage] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  const idUser = user?.account?._id;
  const accessToken = user?.accessToken;
  const debouncedValue = useDebounce(searchValue, 500);
  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }
    (async () => {
      const res = await todoService.getAllTodo(idUser, navigate, accessToken);
      setSearchResult(() => {
        return res.data.filter((task) =>
          task.task_name.includes(debouncedValue)
        );
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);
  console.log(debouncedValue);
  const handleOnChangeInput = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };

  const renderResult = () => {
    return (
      <div className="w-300px bg-gray-300">
        <ToDoList
          toDoList={searchResult}
          setToDoList={setSearchResult}
          reRenderPage={reRenderPage}
          setReRenderPage={setReRenderPage}
        />
      </div>
    );
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleClear = () => {
    setSearchResult([]);
    setSearchValue("");
    inputRef.current.focus();
  };

  return (
    <HeadlessTippy
      visible={showResult && searchResult.length > 0}
      offset={[0, -2]}
      interactive
      placement="bottom-start"
      render={renderResult}
      onClickOutside={handleHideResult}
    >
      <div className="relative flex gap-x-3 items-center w-[400px] ">
        <span className="absolute top-0 lef-0 bottom-0 flex items-center justify-center px-[8px] cursor-pointer text-[#2564cf] hover:bg-[rgba(0,0,0,0.05)] transition-colors">
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input
          type="text"
          value={searchValue}
          ref={inputRef}
          spellCheck={false}
          placeholder="Tìm kiếm ..."
          className="text-black w-[350px] pl-[20px] outline-0"
          onChange={handleOnChangeInput}
          onFocus={() => setShowResult(true)}
        />
        {searchValue && (
          <span
            className="absolute top-0 bottom-0 right-0 flex items-center justify-center px-[8px] cursor-pointer text-[#2564cf] hover:bg-[rgba(0,0,0,0.05)] transition-colors"
            onClick={handleClear}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </span>
        )}
      </div>
    </HeadlessTippy>
  );
}

export default Search;
