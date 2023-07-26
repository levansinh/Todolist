import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PropTypes from "prop-types";
function DefaultLayout({ children }) {
  return (
    <div className="">
      <div className="mb-[44px]">
        <Header />
      </div>
      <div className="flex flex-row max-sm:flex-col-reverse ">
        <Sidebar />
        <div className="flex-1  h-screen">{children}</div>
      </div>
    </div>
  );
}
DefaultLayout.propTypes={
  children:PropTypes.any
}
export default DefaultLayout;
