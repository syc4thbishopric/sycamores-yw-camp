import Head from "next/head"
import Layout from "../components/layouts/Layout"
import PageHeader from "../components/elements/headers/PageHeader"
import Schedule, { ISchedule, IScheduleTime } from "../components/modules/schedules/Schedule"
import { dataSpecialSchedules } from "../data/dataSchedules"
import { getScheduleDate, getNextSunday, isSameOrAfterToday } from "../shared/utils/date.util"
import { filterByType, setHttpHeaders } from "../shared/utils/api.util"
import PrimaryButton from "../components/elements/buttons/PrimaryButton"
import Icon from "../components/elements/icons/Icon"
import { convertSchedules, schedulesRequest } from "../shared/services/schedule.service"
import { config } from "../config"
import { convertImageCards, dataCardsRequest } from "../shared/services/data-card.service"
import ImageCard, { IImageCard } from "../components/modules/cards/ImageCard"
import SectionHeader from "../components/elements/headers/SectionHeader"

export const getServerSideProps = async ({ req, res }) => {
  setHttpHeaders(res)
  const dataCards = await fetch(dataCardsRequest())
  const schedules = await fetch(schedulesRequest)
  return {
    props: {
        schedules: await schedules.json(),
        roll: (await dataCards.json()).sort((a, b) => a.order - b.order)
    },
  }
}

function Sunday({ schedules, roll }) {
  const dataRollCards: IImageCard[] = convertImageCards(filterByType(roll, "roll-card"))
  const dataSundayScheduleTimes: IScheduleTime[] = convertSchedules(schedules.filter(schedule => schedule.events))
  const sundaySchedule: ISchedule = {
    date: getScheduleDate(getNextSunday()),
    times: dataSundayScheduleTimes
  }
  const schedule = dataSpecialSchedules
    .filter((e) => isSameOrAfterToday(e.date.date))
    .concat(sundaySchedule)
    .sort((a: ISchedule, b: ISchedule) => a.date.date.getTime() - b.date.date.getTime())[0]
  return (
    <>
      <Head>
        <title>{config.wardName} - Sunday Meetings</title>
      </Head>
      <PageHeader title="Sunday Meetings" subtitle="Below is a list of scheduled events this upcoming Sunday" />
      <Layout>
        <PrimaryButton type="link" className="absolute top-2 md:top-5" link={{ url: "/" }}>
          <Icon name="chevron-left" className="h-5 w-5" />
          <span className="mr-2 text-sm uppercase font-semibold">Back</span>
        </PrimaryButton>
        <Schedule {...schedule} />
        {dataRollCards.filter((card) => !card.hidden).length > 0 && (
          <>
            <SectionHeader title="Take Class Attendance" subtitle="Find your organization and select the appropriate class in the dropdown" />
            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 pt-5">
              {dataRollCards
                .filter((card) => !card.hidden)
                .map((card: IImageCard) => (
                  <div key={card.title} className="py-3 w-full">
                    <ImageCard {...card} />
                  </div>
                ))}
            </div>
          </>
        )}
        <PrimaryButton type="link" className="mt-20" link={{ url: "/" }}>
          <Icon name="chevron-left" className="h-5 w-5" />
          <span className="mr-2 text-sm uppercase font-semibold">Back</span>
        </PrimaryButton>
      </Layout>
    </>
  )
}

export default Sunday