import "./singlePost.css";
import img from "../../assets/s.jpeg";

export default function SinglePost() {
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img className="singlePostImg" src={img} alt="" />
        <h1 className="singlePostTitle">
          Lorem ipsum dolor sit amet
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author: <b>Renato</b>
          </span>
          <span className="singlePostDate">1 hour ago</span>
        </div>
        <p className="singlePostDesc">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
          adipisci cupiditate, quibusdam, temporibus architecto porro in earum
          qui tempora provident eos, sequi vitae! Molestias, sed quaerat a eaque
          illo voluptates. Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Eligendi adipisci cupiditate, quibusdam, temporibus architecto
          porro in earum qui tempora provident eos, sequi vitae! Molestias, sed
          quaerat a eaque illo voluptates. Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Eligendi adipisci cupiditate,
          quibusdam, temporibus architecto porro in earum qui tempora provident
          eos, sequi vitae! Molestias, sed quaerat a eaque illo voluptates.
        </p>
      </div>
    </div>
  );
}
