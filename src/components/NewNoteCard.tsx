import { X } from "lucide-react";

import * as Dialog from "@radix-ui/react-dialog";

export function NewNoteCard() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="relative flex flex-col gap-4 p-5 overflow-hidden text-left rounded-md outline-none focus-visible:ring-2 focus-visible:ring-lime-400 hover:ring-2 ring-slate-600 bg-slate-700">
        <span className="text-sm font-medium text-slate-200">Adicionar Nota</span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto automaticamente.
        </p>

      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed overflow-hidden -translate-x-1/2 h-[60vh] -translate-y-1/2 left-1/2 top-1/2 max-w-[640px] w-full bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <div className="flex flex-col flex-1 gap-3 p-5">
            <span className="text-sm font-medium text-slate-3-300">Adicionar Nota</span>
            <p className="text-sm leading-6 text-slate-400">
              Comece <button type="button" className="text-lime-400 hover:underline">gravando uma nota</button> em áudio ou se preferir <button type="button" className="text-lime-400 hover:underline">utilize apenas texto</button>.
            </p>
          </div>

          <button type="button" className="w-full py-4 text-sm text-center outline-none group bg-lime-400 hover:bg-lime-500 text-lime-950" >
            Salvar nota
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
