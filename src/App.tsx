import React, { useState } from "react";
import { NewNoteCard } from "./components/NewNoteCard";
import { NoteCard } from "./components/NoteCard";
import { Note } from "./types/Note";

import logo from "./assets/logo-nlw-expert.svg";


export function App() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return [];
  });

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray);
    localStorage.setItem('notes', JSON.stringify(notesArray));
  }

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter((note) => note.id != id);

    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray));
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  const filteredNotes = search != "" ? notes.filter(note => note.content.toLocaleLowerCase().includes(search)) : notes

  return (
    <section className="max-w-6xl px-5 mx-auto my-12 space-y-6 lg:px-0">
      <img src={logo} alt="nlw expert logo" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full text-3xl font-semibold tracking-tight bg-transparent outline-none placeholder:tet-slate-500"
          value={search}
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note, index) => (
          <NoteCard note={note} key={index} onNoteDeleted={onNoteDeleted} />
        ))}
      </div>
    </section>
  )
}
