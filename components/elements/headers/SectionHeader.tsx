export type ISectionHeader = {
  title: string
  subtitle?: string
  className?: string
}

const SectionHeader = ({ title, subtitle = "", className = "" }: ISectionHeader) => {
  return (
    <div className={`${className} max-w-7xl mx-auto text-center`}>
      <div className="space-y-8 sm:space-y-12">
        <div className="space-y-2 sm:space-y-4">
          <h2 className="text-xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">{title}</h2>
          {subtitle && <p className="text-lg text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}
export default SectionHeader
