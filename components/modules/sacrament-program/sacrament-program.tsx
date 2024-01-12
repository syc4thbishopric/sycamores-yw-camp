import ProgramItem, { IProgramItem } from "./program-item"
import ProgramDivider, { IProgramDivider } from "./program-divider"

export type IProgram = {
  date: string
  presiding: IProgramItem
  conducting: IProgramItem
  chorister: IProgramItem
  organist: IProgramItem
  openingHymn: IProgramItem
  closingHymn: IProgramItem
  sacramentHymn: IProgramItem
  openingPrayer: IProgramItem
  closingPrayer: IProgramItem
  programContents: IProgramItem[]
}

const SacramentProgram = ({...program}: IProgram) => {
  const dividerFont = "text-sm text-gray-500 font-light uppercase italic"
  return (
    <>
      <div className="w-full md:w-4/5 mx-auto bg-white px-5 py-8 md:px-16 md:py-20 mt-8 md:mt-12 lg:mt-14 rounded-lg text-sm sm:text-base">
        <div className="flex flex-col gap-4">
          <ProgramItem {...program.presiding} />
          <ProgramItem {...program.conducting} />
          <ProgramItem {...program.chorister} />
          <ProgramItem {...program.organist} />
          <ProgramItem {...program.openingHymn} />
          <ProgramItem {...program.openingPrayer} />
        </div>

        <ProgramDivider text="Ward Business" className="mt-8" fontClass={dividerFont} borderClass="border-gray-400" />

        <div className="flex flex-col gap-4 pt-8">
          <ProgramItem {...program.sacramentHymn} />
        </div>

        <ProgramDivider text="Administration of the Sacrament" className="mt-8 mb-4" fontClass={dividerFont} borderClass="border-gray-400" />

        {program.programContents
          .sort((a, b) => a.order - b.order)
          .map((item) => (
            <div key={item.order} className="flex flex-col gap-4 pt-4">
              <ProgramItem key={item.title.concat(item.name)} {...item}/>
            </div>
          ))}

        <div className="flex flex-col gap-4 pt-4">
          <ProgramItem {...program.closingHymn} />
          <ProgramItem {...program.closingPrayer} />
        </div>
        </div>
    </>
  )
}

export default SacramentProgram