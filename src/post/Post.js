import "./post.css";
import img1 from "../assets/postimg.jpeg";

export default function Post() {
  return (
    <div className="post">
      <img className="postImg" src={img1} alt="" />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">Music</span>
          <span className="postCat">Life</span>
        </div>
        <span className="postTitle">Lorem ipsum dolor sit amet</span>
        <hr />

        <span className="postDate">1 hour ago</span>
      </div>
      <p className="postDesc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ut
        consequatur cumque corrupti aliquid magni porro saepe totam hic quod,
        enim officia, aperiam sed iusto neque nisi odio non architecto! Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Aliquam ut
        consequatur cumque corrupti aliquid magni porro saepe totam hic quod,
        enim officia, aperiam sed iusto neque nisi odio non architecto! Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Aliquam ut
        consequatur cumque corrupti aliquid magni porro saepe totam hic quod,
        enim officia, aperiam sed iusto neque nisi odio non architecto! Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Aliquam ut
        consequatur cumque corrupti aliquid magni porro saepe totam hic quod,
        enim officia, aperiam sed iusto neque nisi odio non architecto!
      </p>
    </div>
  );
}
