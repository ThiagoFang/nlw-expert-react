import { X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner"

import * as Dialog from "@radix-ui/react-dialog";

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [content, setContent] = useState("");

  function handleStartEditor() {
    setShouldShowOnboarding(false);
  }

  function handleContentChanged(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);

    if (!event.target.value.length) setShouldShowOnboarding(true);
  }

  function handleSaveNote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!content.length) return toast.error("Insira o conteúdo da nota")

    onNoteCreated(content)
    setContent('');
    setShouldShowOnboarding(true);

    toast.success("Nota criada com sucesso!")
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
    if (!isSpeechRecognitionAPIAvailable)
      return toast.error("O seu navegador nao suporta esta funcionalidade");

    setIsRecording(true);
    setShouldShowOnboarding(false);

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "")

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.log(event);
    }

    speechRecognition.start();
  }

  function handleStopRecording() {
    setIsRecording(false);

    if (speechRecognition != null) {
      speechRecognition.stop();
    }
  }



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
        <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:-translate-x-1/2 md:h-[60vh] md:-translate-y-1/2 md:left-1/2 md:top-1/2 max-w-[640px] w-full bg-slate-700 md:rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <form className="flex flex-col flex-1" onSubmit={handleSaveNote}>
            <div className="flex flex-col flex-1 gap-3 p-5">
              <span className="text-sm font-medium text-slate-3-300">Adicionar Nota</span>
              {shouldShowOnboarding &&
                <p className="text-sm leading-6 text-slate-400">
                  Comece <button type="button" onClick={handleStartRecording} className="text-lime-400 hover:underline">gravando uma nota</button> em áudio ou se preferir <button type="button" onClick={handleStartEditor} className="text-lime-400 hover:underline">utilize apenas texto</button>.
                </p>
              }
              {!shouldShowOnboarding &&
                <textarea
                  autoFocus
                  className="flex-1 text-sm leading-6 bg-transparent outline-none resize-none text-slate-400"
                  value={content}
                  onChange={handleContentChanged}
                />
              }
            </div>

            {isRecording &&
              <button type="button" onClick={handleStopRecording} className="flex items-center justify-center w-full gap-2 py-4 text-sm text-center outline-none group bg-slate-900 hover:text-slate-100 text-slate-300" >
                <div className="bg-red-500 rounded-full animate-pulse size-3" />
                Gravando! (clique p/ interromper)
              </button>
            }
            {!isRecording &&
              <button type="submit" className="w-full py-4 text-sm text-center outline-none group bg-lime-400 hover:bg-lime-500 text-lime-950" >
                Salvar nota
              </button>

            }

          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
