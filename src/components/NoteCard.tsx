import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { X } from "lucide-react"

import * as Dialog from "@radix-ui/react-dialog"
import { Note } from "../types/Note"

interface NodeCardProps {
  note: Note;
  onNoteDeleted: (id: string) => void;
}

export function NoteCard({ note, onNoteDeleted }: NodeCardProps) {
  const date = formatDistanceToNow(note.date, {
    locale: ptBR,
    addSuffix: true
  })


  return (
    <Dialog.Root>
      <Dialog.Trigger className="relative flex flex-col gap-3 p-5 overflow-hidden text-left rounded-md outline-none focus-visible:ring-2 focus-visible:ring-lime-400 hover:ring-2 ring-slate-600 bg-slate-800">
        <span className="text-sm font-medium text-slate-3-300">{date}</span>
        <p className="text-sm leading-6 text-slate-400">
          {note.content}
        </p>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none bg-gradient-to-t from-black/60 to-black/0 h-1/2" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed inset-0 md:inset-auto overflow-hidden md:-translate-x-1/2 md:h-[60vh] md:-translate-y-1/2 md:left-1/2 md:top-1/2 md:max-w-[640px] w-full bg-slate-700 md:rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <div className="flex flex-col flex-1 gap-3 p-5">
            <span className="text-sm font-medium text-slate-3-300">{date}</span>
            <p className="text-sm leading-6 text-slate-400">
              {note.content}
            </p>
          </div>

          <button type="button" onClick={() => onNoteDeleted(note.id)} className="w-full py-4 text-sm text-center outline-none group bg-slate-800 text-slate-300" >
            Deseja <span className="text-red-400 group-hover:underline">apagar essa nota?</span>
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
