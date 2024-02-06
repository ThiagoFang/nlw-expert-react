import logo from "./assets/logo-nlw-expert.svg";
import { NewNoteCard } from "./components/NewNoteCard";
import { NoteCard } from "./components/NoteCard";

export function App() {
  return (
    <section className="max-w-6xl mx-auto my-12 space-y-6">
      <img src={logo} alt="nlw expert logo" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full text-3xl font-semibold tracking-tight bg-transparent outline-none placeholder:tet-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard />

        <NoteCard note={{
          date: new Date(),
          content: "Hello World!"
        }} />
        <NoteCard note={{
          date: new Date(),
          content: "Hello World!"
        }} />
        <NoteCard note={{
          date: new Date(),
          content: "Hello World!"
        }} />
        <NoteCard note={{
          date: new Date(),
          content: "Hello World!"
        }} />
      </div>
    </section>
  )
}
