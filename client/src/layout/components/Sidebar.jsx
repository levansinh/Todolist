import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faCalendarWeek,
  faCalculator,
  faCircleLeft,
  faStar,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleSignOut } from "../../firebaseConfig/firebaseConfigs";
import { logOut } from "../../store/api/apiRequest";
import { toast } from "react-toastify";
function Sidebar() {
  const { pathname } = useLocation();
  const sideBarRef = useRef();

  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const id = user?.accessToken;

  const idUser = localStorage.getItem("idUser");

  const sideBar = [
    {
      display: "Dự án",
      path: "/project",
      icon: faInbox,
      color: "blue",
    },
    {
      display: "Ngày của tôi",
      path: "/",
      icon: faCalendarWeek,
      color: "red",
    },
    {
      display: "Quan trọng",
      path: "/important",
      icon: faStar,
      color: "slate",
    },
    {
      display: "Đã hoàn thành",
      path: "/completed",
      icon: faCalculator,
      color: "",
    },
  ];
  const activeNavbar = sideBar.findIndex((e) => e.path === pathname);

  useEffect(() => window.scroll(0, 0), [pathname]);

  const navigate = useNavigate();
  const handleLogout = async () => {
    if (user) {
      // Normal logout
      const data = await logOut(dispatch, id, navigate);
      if (data?.status === 200) {
        toast.success("Đăng xuất thành công");
      } else {
        toast.error("Có lỗi xảy ra!");
      }
    } else {
      handleSignOut(); // Logout google
      navigate("/auth");
      toast.success("Đăng xuất thành công");
    }
  };

  return (
    <>
      <aside
        className={` ${
          open ? "w-[305px]" : "w-20 "
        } bg-[#fafafa] relative  h-screen p-5 pt-8  duration-300 max-sm:hidden `}
        ref={sideBarRef}
      >
        <div
          className={`absolute cursor-pointer -right-2 top-9 text-xl text-red-500 rounded-full  ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        >
          <FontAwesomeIcon icon={faCircleLeft} />
        </div>
        <ul className="px-[10px] mt-5 max-sm:flex">
          {sideBar.map((item, index) => (
            <li
              key={index}
              className={`${
                index === activeNavbar
                  ? `bg-[#eeeeee] p-[5px] rounded-sm group`
                  : "p-[5px] "
              } `}
            >
              <Link to={item.path} className={`flex items-center gap-x-3  `}>
                <span className="w-1.5 h-8 rounder-r-full left-0 scale-y-0 bg-indigo-600 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0"></span>
                <FontAwesomeIcon
                  className={`text-xl text-${item.color}-500`}
                  icon={item.icon}
                />
                {open ? <span>{item.display}</span> : ""}
              </Link>
            </li>
          ))}
          {id ?? idUser ? (
            <li
              onClick={handleLogout}
              className={` p-[5px] rounded-sm group cursor-pointer hover:bg-[#eeeeee]`}
            >
              <div className={`flex items-center gap-x-3  `}>
                <span className="w-1.5 h-8 rounder-r-full left-0 scale-y-0 bg-indigo-600 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0"></span>
                <FontAwesomeIcon
                  className={`text-xl `}
                  icon={faRightToBracket}
                />
                Đăng xuất
              </div>
            </li>
          ) : (
            ""
          )}
        </ul>
      </aside>
      <aside className="fixed bg-zinc-300 py-2 px-1 bottom-0 right-0 left-0 sm:hidden border-t border-solid border-[#f5f5f5]">
        <ul className="flex justify-between items-center">
          {sideBar.map((item, index) => {
            return (
              <li
                key={index}
                className={`${
                  index === activeNavbar
                    ? `bg-[#eeeeee] min-w-[50px] p-[5px] rounded-sm group items-center`
                    : "p-[5px]  min-w-[50px] "
                } `}
              >
                <Link to={item.path} className={`gap-x-3 mx-auto`}>
                  <FontAwesomeIcon
                    className={`text-xl max-sm:text-4xl text-${item.color}-500`}
                    icon={item.icon}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
