export type IProgramDivider = {
  text?: string
  className?: string
  fontClass?: string
  borderClass?: string
}

const ProgramDivider = ({ text, className = "", fontClass = "", borderClass = "border-gray-700" }: IProgramDivider) => {
  return (
    <div className={`${className} relative`}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className={`w-full border-t ${borderClass}`}></div>
      </div>
      {text && (
        <div className="relative flex justify-center">
          <span className={`${fontClass} px-2 bg-white`}>{text}</span>
        </div>
      )}
    </div>
  )
}
export default ProgramDivider