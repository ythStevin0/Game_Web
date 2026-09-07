export default function ActionButton({ children, className = '', ...props }) {
  return (
    <button
      className={`border border-amber-300 px-5 py-3 font-medium text-amber-100 transition hover:bg-amber-300 hover:text-[#10131a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}
