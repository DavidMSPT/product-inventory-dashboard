export default function LabeledInput({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block text-sm">
      <div className="mb-1 font-medium">{label}</div>
      {children}
      {error ? <div className="mt-1 text-xs text-rose-600 dark:text-rose-300">{error}</div> : null}
    </label>
  )
}
