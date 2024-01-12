import Layout from "../components/layouts/Layout"
import SectionHeader from "../components/elements/headers/SectionHeader"
import Announcement, { IAnnouncement } from "../components/modules/announcements/Announcement"
import {
    filterAndSortAnnouncements,
    generateAnnouncementKey,
} from "../shared/utils/announcement.util"
import React, { useState } from 'react'
import {convertAnnouncements, getAllAnnouncements, getAnnouncements} from "../shared/services/announcement.service";

import PageHeader from "../components/elements/headers/PageHeader"
import {setHttpHeaders} from "../shared/utils/api.util";
import {
    dataCardsRequest
} from "../shared/services/data-card.service";
import PrimaryButton from "../components/elements/buttons/PrimaryButton"
import Icon from "../components/elements/icons/Icon"

export const getServerSideProps = async ({ req, res }) => {
  setHttpHeaders(res)
  const [announcements, dataCards] = await Promise.all([fetch(getAllAnnouncements()), fetch(dataCardsRequest())])
  return {
    props: {
      announcements: await announcements.json()
    },
  }
}

function MajorEvents({announcements}) {
  const [majorEvents, setMajorEvents] = useState<IAnnouncement[]|undefined>(convertAnnouncements(announcements.filter((item) => item.type === "major-events")))

  return (
    <>
      <PageHeader title="Key Dates To Remember" subtitle="Below are some dates to be aware of for upcoming events this year" />
      <Layout>
        <PrimaryButton type="link" className="mt-5" link={{ url: "/" }}>
          <Icon name="chevron-left" className="h-5 w-5" />
          <span className="mr-2 text-sm uppercase font-semibold">Back to Home</span>
        </PrimaryButton>
        {majorEvents.length > 0 &&
          <>
            <p className="text-lg text-gray-500 mt-5 text-center">Events</p>
            <div className="mt-5">
              <div className="relative max-w-xl mx-auto lg:max-w-7xl">
                <div className="grid gap-4 lg:grid-cols-2">
                  {filterAndSortAnnouncements(majorEvents).map((announcement: IAnnouncement) => (
                    <div key={generateAnnouncementKey(announcement)} className="p-4 bg-white rounded-lg shadow-xl lg:p-8">
                      <Announcement {...announcement} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        }
        {majorEvents.length < 1 &&
          <p className="text-lg text-gray-500 mt-5 text-center">No Major Events</p>
        }
        <PrimaryButton type="link" className="mt-5" link={{ url: "/" }}>
          <Icon name="chevron-left" className="h-5 w-5" />
          <span className="mr-2 text-sm uppercase font-semibold">Back to Home</span>
        </PrimaryButton>  
      </Layout>
    </>
  )
}

export default MajorEvents


