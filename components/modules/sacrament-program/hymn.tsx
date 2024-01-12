import { useEffect, useState } from "react"

import { getHymnByNumber, getChildHymnByNumber } from "../../../shared/services/hymn.service"

type Props = {
  type: string
  number: number
  name: string
}

const Hymn: React.FC<Props> = ({ type, number, name }) => {
  const [href, setHref] = useState<string | null>(null)

  useEffect(() => {
    async function loadHymn() {
      let href = "";
      if (type == "children") {
        href = await getChildHymnByNumber(number)
        setHref(href)
      } else if (type == "regular") {
        href = await getHymnByNumber(number)
        setHref(href)
      }
    }
    loadHymn()
  }, [number])

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
      {name}
    </a>
  )
}

export default Hymn