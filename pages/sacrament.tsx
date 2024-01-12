import PrimaryButton from "../components/elements/buttons/PrimaryButton"
import Divider from "../components/elements/dividers/Divider"
import PageHeader from "../components/elements/headers/PageHeader"
import SectionHeader from "../components/elements/headers/SectionHeader"
import Icon from "../components/elements/icons/Icon"
import Layout from "../components/layouts/Layout"
import SacramentProgram from "../components/modules/sacrament-program/sacrament-program"
import { sacramentProgramRequest } from "../shared/services/sacrament-program.service"
import { setHttpHeaders } from "../shared/utils/api.util"
import { getNextSunday, getScheduleDate } from "../shared/utils/date.util"
import { useWindowSize } from "../shared/utils/general.util"

export const getServerSideProps = async ({req, res}) => {
  setHttpHeaders(res)
  const [responseProgram] = await Promise.all([fetch(sacramentProgramRequest())])
  return {
    props: {
      responseProgram: (await responseProgram.json())
    }
  }
}

function Sacrament({responseProgram, program}) {
  // const dataSacramentCards: IImageCard[] = convertImageCard(filterByType(dataCards, "sacrament-card"))
  const sundayDate = getScheduleDate(getNextSunday());
  const programDate = getScheduleDate(responseProgram.date) ? getScheduleDate(responseProgram.date) : getScheduleDate('2099-01-01');
  const size = useWindowSize();

  return (
    <>
      <PageHeader title="Sacrament Meeting Program" />
      <Layout>
        <PrimaryButton type="link" className="top-2 md:top-5" link={{ url: "/sunday" }}>
          <Icon name="chevron-left" className="h-5 w-5" />
          <span className="mr-2 text-sm uppercase font-semibold">Back to Sunday Schedule</span>
        </PrimaryButton>
        <SectionHeader title={sundayDate.dateFormatted} />
        {sundayDate.dateFormatted == programDate.dateFormatted ?
        <div className="w-full">
            <SacramentProgram
              date={programDate.dateFormatted} 
              presiding={responseProgram.presiding}
              conducting={responseProgram.conducting}
              openingHymn={responseProgram.openHymn}
              chorister={responseProgram.chorister}
              organist={responseProgram.organist}
              closingHymn={responseProgram.closingHymn}
              sacramentHymn={responseProgram.sacramentHymn}
              openingPrayer={responseProgram.invocation}
              closingPrayer={responseProgram.benediction}
              programContents={responseProgram.programContent}
            />
          </div> : <SectionHeader title={`Program is forthcoming. Please check later`} />}
        <PrimaryButton type="link" className="mt-20" link={{ url: "/sunday" }}>
          <Icon name="chevron-left" className="h-5 w-5" />
          <span className="mr-2 text-sm uppercase font-semibold">Back to Sunday Schedule</span>
        </PrimaryButton>
      </Layout>
    </>
  )
}

export default Sacrament