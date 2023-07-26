import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import {
  faStar,
  faCircleInfo,
  faBell,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Action() {
  // const user = useSelector((state) => state.auth.currentUser);
  const user = localStorage.getItem("name");
  const infor = useSelector((state) => state.auth.login.currentUser);

  return (
    <div className="flex flex-row items-center gap-x-10">
      <div className="max-sm:hidden">
        <Button small>
          <FontAwesomeIcon className="text-yellow-400 mr-2 " icon={faStar} />
          <span className="text-white ">Nâng cấp</span>
        </Button>
      </div>
      <div className="max-sm:hidden">
        <Tippy content="Trợ giúp & Thông tin">
          <div className="text-white text-xl ">
            <FontAwesomeIcon icon={faCircleInfo} />
          </div>
        </Tippy>
      </div>
      <div className="max-sm:hidden">
        <Tippy content="Thông báo">
          <div className="text-white text-xl ">
            <FontAwesomeIcon icon={faBell} />
          </div>
        </Tippy>
      </div>
      {user ?? infor ? (
        <div className="">
          <img
            className="w-9 h-9 rounded-full cursor-pointer"
            src={
              user
                ? localStorage.getItem("profilePic")
                : "https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg"
            }
            alt={localStorage.getItem("name")}
          />
        </div>
      ) : (
        <Link to={"/auth"} className="text-white text-xl ">
          <FontAwesomeIcon icon={faUser} />
        </Link>
      )}
    </div>
  );
}

export default Action;
