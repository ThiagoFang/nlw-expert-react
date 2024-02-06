interface NodeCardProps {
  note: {
    date: Date,
    content: string
  }
}

export function NoteCard({ note }: NodeCardProps) {
  const { content, date } = note

  return (
    <button className="relative flex flex-col gap-3 p-5 overflow-hidden text-left rounded-md outline-none focus-visible:ring-2 focus-visible:ring-lime-400 hover:ring-2 ring-slate-600 bg-slate-800">
      <span className="text-sm font-medium text-slate-3-300">{date.toISOString()}</span>
      <p className="text-sm leading-6 text-slate-400">
        {content}
      </p>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none bg-gradient-to-t from-black/60 to-black/0 h-1/2" />
    </button>
  )
}
