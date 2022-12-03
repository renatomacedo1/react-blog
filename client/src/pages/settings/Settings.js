import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import profilePic from "../../assets/eu_nova.png";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
  const { user, dispatch } = useContext(Context);

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const PF = "http://localhost:4000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        // TODO mostrar mensagem de erro ao user
        console.log("There was an error uploading the file");
        window.alert("There was an error while uploading the file");
      }
    }
    try {
      const res = await axios.patch("/users/" + user._id, updatedUser);
      window.alert("User updated with success.");
      console.log(res);
      setFailure(false);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });

      //window.location.replace("/post/" + res.data._id);
    } catch (error) {
      // TODO mostrar mensagem de erro ao user
      setSuccess(false);
      setFailure(true);
      dispatch({ type: "UPDATE_FAILURE" });

      console.log("There was an error uploading the post");
      window.alert("There was an error while uploading the post");
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePicture}
              alt="your profile picture"
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textalign: "center", marginTop: "20px" }}
            >
              Profile has been updated
            </span>
          )}
          {failure && (
            <span
              style={{ color: "red", textalign: "center", marginTop: "20px" }}
            >
              There was an error
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
