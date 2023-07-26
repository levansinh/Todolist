import { useEffect } from "react";
import PropTypes from 'prop-types';
function Helmet({title,children}) {
    document.title = 'ToDoApp - ' + title
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return ( 
<div className="">
    {children}
</div>
     );
}
Helmet.propTypes = {
    title:PropTypes.string.isRequired,
    children:PropTypes.any
}
export default Helmet;