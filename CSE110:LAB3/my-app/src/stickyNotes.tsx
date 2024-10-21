import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { useState } from "react";
import "./App.css";
export const StickyNotes = () => {
    const [likedItems, setLikedItems] = useState([""]);

  const [notes, setNotes] = useState(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    favorite: false,
  };
  const [createNote, setCreateNote] = useState(initialNote);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

  function deleteNote(id: number) {
    const updatedItems = notes.filter((itemData) => itemData.id !== id);
    console.log(updatedItems);
    setNotes(updatedItems);
  }

  function statusChange(e: React.ChangeEvent<HTMLInputElement>) {
    const boxID = parseInt(e.target.value);
    const updatedItems = notes.map((itemData) => {
      if (itemData.id == boxID) {
        return {
          id: boxID,
          title: itemData.title,
          content: itemData.content,
          label: itemData.label,
          favorite: !itemData.favorite,
        };
      }
      return itemData;
    });
    setNotes(updatedItems);
    const favoriteItems = updatedItems
      .filter((item) => item.favorite)
      .map((item) => {
        return item.title;
      });
    setLikedItems(favoriteItems);
  }
  const [currentTheme, setCurrentTheme] = useState("light");
 
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
  };
  return (
    <div className={currentTheme}>
    <button style={{marginLeft: '20px', marginTop: '20px'}}onClick={toggleTheme}> Toggle Theme </button>
    <div className="app-container">
      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <input
            placeholder="Note Title"
            onChange={(event) =>
              setCreateNote({ ...createNote, title: event.target.value })
            }
            required
          ></input>
        </div>

        <div>
          <textarea
            placeholder="Note Content"
            onChange={(event) =>
              setCreateNote({ ...createNote, content: event.target.value })
            }
            required
          ></textarea>
        </div>

        <div>
          <select
            onChange={(event) =>
              setCreateNote({
                ...createNote,
                label: event.target.value as Label,
              })
            }
            required
          >
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>

        <div>
          <button type="submit">Create Note</button>
        </div>
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <button
                onClick={() => {
                  deleteNote(note.id);
                }}
              >
                x
              </button>
            </div>
            <input
              type="checkbox"
              className="boxHidden"
              value={note.id}
              id={note.id.toString()}
              onChange={statusChange}
              checked={note.favorite}
            ></input>
            <label htmlFor={note.id.toString()}>
              {String.fromCharCode(9829)}
            </label>
            <h2 contentEditable="true">{note.title}</h2>
            <p contentEditable="true">{note.content}</p>
            <p contentEditable="true">{note.label}</p>
          </div>
        ))}
      </div>
      <h3>List of Favorites</h3>
      <br></br>
      <ul>
        {likedItems.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
    </div>
  );
}