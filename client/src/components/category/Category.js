import "./category.css";
import img1 from "../../assets/postimg.jpeg";
import { Link } from "react-router-dom";

export default function Category({ category, handleRemoveCat }) {
  return (
    <div className="post">
      <p className="postDesc">{category}</p>
      <button onClick={handleRemoveCat}>remove</button>
    </div>
  );
}
