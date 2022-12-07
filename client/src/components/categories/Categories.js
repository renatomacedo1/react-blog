import Category from "../category/Category";
import "./categories.css";

export default function Categories({ categories }) {
  return (
    <div className="posts">
      {categories.map((c, index) => (
        <Category category={c} key={index} />
      ))}
    </div>
  );
}
