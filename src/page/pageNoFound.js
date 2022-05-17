import {Link} from "react-router-dom";
function PageNotFound(){
    return (
        <div className={document.getElementById('react-switch-new').checked===false?"text":"textDark"}>
            <h1>404-Page not Found</h1>
            <h2>Такой страницы не существует<Link to={"/"}>главную страницу</Link></h2>
        </div>
    )
}
export default PageNotFound;