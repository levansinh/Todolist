import PropTypes from 'prop-types';
function HeaderPage({ title, subTitle = null }) {
  return (
    <div className="pt-[36px] px-[55px] flex flex-row justify-between items-center">
      <div className="flex justify-start items-center gap-x-2">
        <h1 className="text-xl font-bold ">{title}</h1>
        <span className="text-sm text-zinc-500 mt-2">{subTitle}</span>
      </div>
      <div className="flex flex-row items-center gap-x-2 cursor-pointer">
      
      </div>
    </div>
  );
}
HeaderPage.propTypes = {
  title:PropTypes.string.isRequired,
  subTitle:PropTypes.string
}
export default HeaderPage;
