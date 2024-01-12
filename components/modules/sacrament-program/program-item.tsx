import { parseHymnNumber } from "../../../shared/services/hymn.service"
import Hymn from './hymn'

export type IProgramItem = {
  title: string
  name?: string
  color: string
  order?: number
}

const ProgramItem = ({...item}: IProgramItem) => {
  let hymnNumber: number | null
  let hymnType: string
  if (item.title.includes('Hymn')) {
    hymnNumber = parseHymnNumber(item.name)
    item.name.startsWith("CS") ? hymnType = 'children' : hymnType = 'regular';
  }
  return (
    <div className="dots-in-between w-full">
      <span className="font-bold bg-white pr-3">{item.title}</span>
      <span className="text-right bg-white float-right pl-3">{hymnNumber ? <Hymn type={hymnType} number={hymnNumber} name={item.name} /> : item.name}</span>
    </div>
  )
}

export default ProgramItem