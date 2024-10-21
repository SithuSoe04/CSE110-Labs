import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import userEvent from "@testing-library/user-event";

describe("Create StickyNote", () => {
 test("renders create note form", () => {
   render(<StickyNotes />);

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
   render(<StickyNotes />);

// Please make sure your sticky note has a title and content input field with the following placeholders.
   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteContentTextarea =
     screen.getByPlaceholderText("Note Content");
   const createNoteButton = screen.getByText("Create Note");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, {
     target: { value: "Note content" },
   });
   fireEvent.click(createNoteButton);

   const newNoteTitle = screen.getByText("New Note");
   const newNoteContent = screen.getByText("Note content");

   expect(newNoteTitle).toBeInTheDocument();
   expect(newNoteContent).toBeInTheDocument();
 });

 test("created notes displayed on page", () => {
  render(<StickyNotes />);
  const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
  const createNoteContentTextarea =
    screen.getByPlaceholderText("Note Content");
  const createNoteButton = screen.getByText("Create Note");

  fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
  fireEvent.change(createNoteContentTextarea, {
    target: { value: "Note content" },
  });
  fireEvent.click(createNoteButton);

  fireEvent.change(createNoteTitleInput, { target: { value: "New Note 2" } });
  fireEvent.change(createNoteContentTextarea, {
    target: { value: "Note content 2" },
  });
  fireEvent.click(createNoteButton);

  const numberOfNotes = screen.getAllByRole('heading', {level: 2})

  expect(numberOfNotes.length).toBe(8);
});
});

describe("Delete SitckysiNote", () => {
  test("deletes a note", () => {
    render(<StickyNotes />);
    const deleteNoteButton = screen.getAllByText("x");
    const numberOfNotes = screen.getAllByRole('heading', {level: 2})
    const randomNoteNumber = Math.floor(Math.random() * numberOfNotes.length)
    const deleteButton = deleteNoteButton[randomNoteNumber];
    const stickyNote = screen.getByText(`test note ${randomNoteNumber + 1} title`)
    fireEvent.click(deleteButton);
    expect(stickyNote).not.toBeInTheDocument();
   });

   test("deletes all notes", () => {
    render(<StickyNotes />); 
    const deleteNoteButton = screen.getAllByText("x");
    const stickyNote1 = screen.getByText(`test note 1 title`);
    const deleteButton1 = deleteNoteButton[0];
    const stickyNote2 = screen.getByText(`test note 2 title`);
    const deleteButton2 = deleteNoteButton[1];
    const stickyNote3 = screen.getByText(`test note 3 title`);
    const deleteButton3 = deleteNoteButton[2];
    const stickyNote4 = screen.getByText(`test note 4 title`);
    const deleteButton4 = deleteNoteButton[3];
    const stickyNote5 = screen.getByText(`test note 5 title`);
    const deleteButton5 = deleteNoteButton[4];
    const stickyNote6 = screen.getByText(`test note 6 title`);
    const deleteButton6 = deleteNoteButton[5];
    fireEvent.click(deleteButton1);
    fireEvent.click(deleteButton2);
    fireEvent.click(deleteButton3);
    fireEvent.click(deleteButton4);
    fireEvent.click(deleteButton5);
    fireEvent.click(deleteButton6);
    expect(stickyNote1).not.toBeInTheDocument();
    expect(stickyNote2).not.toBeInTheDocument();
    expect(stickyNote3).not.toBeInTheDocument();
    expect(stickyNote4).not.toBeInTheDocument();
    expect(stickyNote5).not.toBeInTheDocument();
    expect(stickyNote6).not.toBeInTheDocument();
   })
})


test("updates a note", async () => {
    render(<StickyNotes />);
    const numberOfNotes = screen.getAllByRole('heading', {level: 2})
    const randomNoteNumber = Math.floor(Math.random() * numberOfNotes.length)
    const stickyNote = screen.getByText(`test note ${randomNoteNumber + 1} title`);
    await userEvent.click(stickyNote);
    await userEvent.keyboard(" abc");
    expect(stickyNote.textContent).toBe(`test note ${randomNoteNumber + 1} title abc`);
    stickyNote.innerHTML = "Updating from innerHTML";
    expect(stickyNote.textContent).toBe(`Updating from innerHTML`);
  })

  