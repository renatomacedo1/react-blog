import "./write.css";
import img from "../../assets/s.jpeg";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const addCats = (e) => {
    e.preventDefault();
    setCats((cats) => [...cats, cat]);
    logger();
  };

  function logger() {
    setCat("");
    console.log(cats);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        // TODO mostrar mensagem de erro ao user
        console.log("There was an error uploading the file");
        window.alert("There was an error while uploading the file");
      }
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {
      // TODO mostrar mensagem de erro ao user
      console.log("There was an error uploading the post");
      window.alert("There was an error while uploading the post");
    }
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form onSubmit={addCats}>
        <input
          id="catInput"
          type="text"
          placeholder={cat || "category"}
          className="writeInput"
          onChange={(e) => setCat(e.target.value)}
        />
        <button type="submit">add category</button>
      </form>

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            id=""
            cols="30"
            rows="10"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>

        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
      {cats.map((cat, index) => {
        <li key={index}>
          {cat}
          {index}
        </li>;
      })}
    </div>
  );
}
