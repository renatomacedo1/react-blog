import "./singlePost.css";
//import img from "../../assets/s.jpeg";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:4000/images/"; // PF -> public folder
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [existingCats, setExistingCats] = useState([]);
  const [cats, setCats] = useState([]);
  const [cats2, setCats2] = useState([]);

  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setCats(res.data.categories);
      setCats2(res.data.categories);
    };
    getPost();
    const getExistingCats = async () => {
      const res = await axios.get("/categories/");
      setExistingCats(res.data);
    };
    getExistingCats();
  }, [path]);

  let catRef = useRef();

  useEffect(() => {
    catRef.current?.reset();
    console.log("Cats no início:");
    console.log(cats);
    //console.log(existingCats);
    //console.log(existingCats);
  }, [cats]);

  const addCats = (e) => {
    e.preventDefault();
    if (cat !== "") {
      cat.toLowerCase();
      setCats((cats) => [...cats, { name: cat }]);
      console.log("cats no addCats:");
      console.log(cats);
      setCat("");
    }
  };

  const handleRemoveCat = (name) => {
    console.log("HandleRemoveCat");
    // TODO this functions
    const newCats = cats.filter((item) => item.name !== name);
    setCats(newCats);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    function test(array1, array2) {
      for (var i = array1.length - 1; i >= 0; i--) {
        for (var j = 0; j < array2.length; j++) {
          if (array1[i].name === array2[j].name) {
            array1.splice(i, 1);
          }
        }
      }
      console.log(array1);
      return array1;
    }

    setCats2(test(cats2, existingCats));

    console.log("cats2 - handleUpdate:");
    console.log(cats2);

    try {
      console.log("entrou no patch. Cats:");
      console.log(cats);
      console.log("entrou no patch. Cats2:");
      console.log(cats2);
      await axios
        .patch(`/posts/${post._id}`, {
          username: user.username,
          title,
          desc,
          categories: cats,
        })
        .then(
          cats2.forEach(async (cat2) => {
            var data = JSON.stringify(cat2);

            var config = {
              method: "post",
              url: "/categories/",
              headers: {
                "Content-Type": "application/json",
              },
              data: data,
            };

            await axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
                setUpdateMode(false);
              })
              .catch(function (error) {
                console.log(error);
              });
          })
        );
    } catch (error) {
      console.log(error);
    }

    try {
    } catch (error) {
      console.log("Ocorreu um erro ao postar a categoria");
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}
        {updateMode ? (
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
                    <div key={a.name}>
                      <li className="catList" key={a.name}>
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
        ) : post.categories ? (
          <div className="postCats">
            {post.categories.map((c, index) => {
              return (
                <span className="postCat" key={index}>
                  {c.name}
                </span>
              );
            })}
          </div>
        ) : (
          <div></div>
        )}

        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={(e) => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            value={desc}
            className="singlePostDescInput"
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
