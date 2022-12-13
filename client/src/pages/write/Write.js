import "./write.css";
//import img from "../../assets/s.jpeg";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  let catRef = useRef();

  useEffect(() => {
    catRef.current?.reset();
    console.log(cats);
  }, [cats]);

  const addCats = (e) => {
    e.preventDefault();
    if (cat !== "") {
      setCats((cats) => [...cats, { name: cat }]);
      setCat("");
    }
  };

  const handleRemoveCat = (name) => {
    console.log("HandleRemoveCat");
    // TODO this functions
    const newCats = cats.filter((item) => item.name !== name);
    setCats(newCats);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: cats,
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
      <form ref={catRef} onSubmit={addCats} className="catForm">
        <div className="catFormGroup">
          <input
            id="catInput"
            type="text"
            placeholder="add category"
            className="catInput"
            onChange={(e) => setCat(e.target.value)}
          />
          <button className="categorySubmit" type="submit">
            Add category
          </button>
        </div>
        <div className="catListGroup">
          <ul className="categoriesList">
            {cats.map((a) => {
              return (
                <div>
                  <li className="catList" key={a.key}>
                    <p className="categoriesListItem">{a.name}</p>
                    <button
                      className="categoryRemove"
                      onClick={() => handleRemoveCat(a.name)}
                    >
                      Remove
                    </button>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
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
    </div>
  );
}
