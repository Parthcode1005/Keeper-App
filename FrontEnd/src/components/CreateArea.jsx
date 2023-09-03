import React, { useState } from "react";
import axios from "axios";

function CreateArea(props) {
  const [note, setnote] = useState({
    title: "",
    content: "",
  });

  const submitNote = async function (e) {
    e.preventDefault();

    // props.onAdd(note);
    try {
      // const data = {
      //   title: note.title,
      //   desc: note.content,
      // };
      const res = await axios.post("http://localhost:8000/api/addNew", note);
      // props.onAdd(note);
      props.getNotes();
    } catch (err) {
      console.log(err);
    }
    setnote({
      title: "",
      content: "",
    });
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setnote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  return (
    <div>
      <form>
        <input
          name="title"
          value={note.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          name="content"
          value={note.content}
          placeholder="Take a note..."
          onChange={handleChange}
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
