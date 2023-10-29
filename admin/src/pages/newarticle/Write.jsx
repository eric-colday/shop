import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";
import { AuthContext } from "../../context/AuthContext";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


export default function Write() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      // desc,
      desc: value,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/articles", newPost);
      window.location.replace("/article/" + res.data._id);
    } catch (err) {}
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <AddPhotoAlternateIcon className="writeIcon"/>
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
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
        {/* <ReactQuill
          className="writeInput writeText"
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        /> */}
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
