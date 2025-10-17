import { useEffect } from "react"
function useEscToClose(onClose: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])
}
export default function ModalShell({
  children,
  onClose,
}: {
  children: React.ReactNode
  onClose: () => void
}) {
  useEscToClose(onClose)
  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 opacity-0 animate-[fadeIn_150ms_ease-out_forwards]" />
      <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg scale-95 opacity-0 animate-[popIn_180ms_ease-out_forwards]"
        >
          {children}
        </div>
      </div>
      <style>{`@keyframes fadeIn { to { opacity: 1 } } @keyframes popIn { to { opacity: 1; transform: scale(1) } }`}</style>
    </div>
  )
}
