import Head from "next/head"
import Layout from "../components/layouts/Layout"
import SectionHeader from "../components/elements/headers/SectionHeader"
import HeroCard, {IHeroCard} from "../components/modules/cards/HeroCard"
import Announcement, { IAnnouncement } from "../components/modules/announcements/Announcement"
import ContactCard, { IContactCard } from "../components/modules/cards/ContactCard"
import MiniCard, { IMiniCard } from "../components/modules/cards/MiniCard"
import ImageCard, { IImageCard } from "../components/modules/cards/ImageCard"
import {
    announcementConcatenator,
    filterAndSortAnnouncements,
    generateAnnouncementKey,
} from "../shared/utils/announcement.util"
import React, { useState, useEffect } from 'react'
import {convertAnnouncements, getAllAnnouncements, getAnnouncements} from "../shared/services/announcement.service";
import {filterById, filterByType, setHttpHeaders} from "../shared/utils/api.util";
import {useWindowSize} from '../shared/utils/general.util'
import {
    convertBannerCards,
    convertFaceCards, convertHeroCard, convertImageCards,
    convertMiniCards,
    dataCardsRequest,
} from "../shared/services/data-card.service";
import BannerCard, {IBannerCard} from "../components/modules/cards/BannerCard";
import { useAddToHomescreenPrompt } from "../components/modules/add-to-homescreen/AddToHomescreen";
import {config} from "../config";
import PrimaryButton from "../components/elements/buttons/PrimaryButton"

export const getServerSideProps = async ({ req, res }) => {
  setHttpHeaders(res)
  const [announcements, dataCards] = await Promise.all([fetch(getAllAnnouncements()), fetch(dataCardsRequest())])
  const myDataCards = (await dataCards.json()).sort((a, b) => a.order - b.order)
  return {
    props: {
      announcements: await announcements.json(),
      dataCards: myDataCards,
    },
  }
}

function Home({announcements, dataCards}) {
  const [eldersAnnouncements, setEldersAnnouncements] = useState<IAnnouncement[]|undefined>(convertAnnouncements(announcements.filter((item) => item.type === "elders")))
  const [reliefSocietyAnnouncements, setReliefSocietyAnnouncements] = useState<IAnnouncement[]|undefined>(convertAnnouncements(announcements.filter((item) => item.type === "relief-society")))
  const [youngWomenAnnouncements, setYoungWomenAnnouncements] = useState<IAnnouncement[]|undefined>(convertAnnouncements(announcements.filter((item) => item.type === "young-women")))
  const [primaryAnnouncements, setPrimaryAnnouncements] = useState<IAnnouncement[]|undefined>(convertAnnouncements(announcements.filter((item) => item.type === "primary")))
  const [generalAnnouncements, setGeneralAnnouncements] = useState<IAnnouncement[]|undefined>(convertAnnouncements(announcements.filter((item) => item.type === "general")))
  const [youngMenAnnouncements, setYoungMenAnnouncements] = useState<IAnnouncement[]|undefined>(convertAnnouncements(announcements.filter((item) => item.type === "young-men")))
  const dataBannerCards: IBannerCard[] = convertBannerCards(filterByType(dataCards, "banner-card"))
  const dataFaceCards: IContactCard[] = convertFaceCards(filterByType(dataCards, "face-card"))
  const dataMiniCards: IMiniCard[] = convertMiniCards(filterByType(dataCards, "mini-card"))
  const dataImageCards: IImageCard[] = convertImageCards(filterByType(dataCards, "image-card"))
  const dataMissionaryCards: IImageCard[] = convertImageCards(filterByType(dataCards, "missionary-card"))
  const dataSundayMeeting: IHeroCard = convertHeroCard(filterById(dataCards, config.pages.index.heroCardId), "dark")
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  const size = useWindowSize();

  dataMissionaryCards.forEach(card => card.scale = true);

  const isPWAInstalled = async () => {
    if ("getInstalledRelatedApps" in window.navigator) {
      const relatedApps = await navigator.getInstalledRelatedApps();
      let installed = false;
      relatedApps.forEach((app) => {
        //if your PWA exists in the array it is installed
        console.log(app.platform, app.url);
        if (
          app.url === "https://yw-camp.sycamoresstake.com/manifest.json" || app.url === "http://192.168.1.65:3000/manifest.json"
        ) {
          installed = true;
        }
      });
      setIsAppInstalled(installed);
    }
  };

  useEffect(() => {
    isPWAInstalled();
  }, [])

  return (
    <Layout>
      <Head>
        <title>Sycamores Stake Young Women Camp</title>
      </Head>
      <div className="pt-16">
        <HeroCard {...dataSundayMeeting} />
      </div>
      {/* <div className="flex justify-center items-center mt-4">
        {!isAppInstalled ? (
            <button onClick={promptToInstall} className="bg-primary-500 hover:bg-primary-700 text-white py-2 px-4 rounded-lg">Add to Home Screen</button>
          ) : (
            <div className="text-gray-700">Thanks for installing our app</div>
          )}
      </div> */}
      <div className="relative mb-3">
          <SectionHeader title="Announcements" subtitle="Stay up to date on upcoming YW camp events" className="pt-10"/>
      </div>
      {dataBannerCards.length > 0 && (
        <div className="lg:grid gap-x-4 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:items-start">
          {dataBannerCards.map((card: IBannerCard) => (
            <div key={card.title} className="w-full mb-4">
              <BannerCard {...card} />
            </div>
          ))}
        </div>
      )}
      {generalAnnouncements.length < 1 && youngMenAnnouncements.length < 1  && reliefSocietyAnnouncements.length < 1  &&
       eldersAnnouncements.length < 1  && youngWomenAnnouncements.length < 1  && primaryAnnouncements.length < 1  &&
        <p className="text-lg text-gray-500 mt-7 text-center">No Announcements</p>
      }
      {generalAnnouncements.length > 0 &&
        <>
          <div className="mt-7">
            <div className="relative max-w-xl mx-auto lg:max-w-7xl">
              <div className="grid gap-4 lg:grid-cols-2">
                {filterAndSortAnnouncements(generalAnnouncements).map((announcement: IAnnouncement) => (
                  <div key={generateAnnouncementKey(announcement)} className="p-4 bg-white rounded-lg shadow-xl lg:p-8">
                    <Announcement {...announcement} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      }
      {reliefSocietyAnnouncements.length > 0 &&
        <>
          <p className="text-lg text-gray-500 mt-7 text-center">Relief Society</p>
          <div className="mt-7">
            <div className="relative max-w-xl mx-auto lg:max-w-7xl">
              <div className="grid gap-4 lg:grid-cols-2">
                {filterAndSortAnnouncements(reliefSocietyAnnouncements).map((announcement: IAnnouncement) => (
                  <div key={generateAnnouncementKey(announcement)} className="p-4 bg-white rounded-lg shadow-xl lg:p-8">
                    <Announcement {...announcement} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      }
      {eldersAnnouncements.length > 0 &&
        <>
          <p className="text-lg text-gray-500 mt-7 text-center">Elders</p>
          <div className="mt-7">
            <div className="relative max-w-xl mx-auto lg:max-w-7xl">
              <div className="grid gap-4 lg:grid-cols-2">
                {filterAndSortAnnouncements(eldersAnnouncements).map((announcement: IAnnouncement) => (
                  <div key={generateAnnouncementKey(announcement)} className="p-4 bg-white rounded-lg shadow-xl lg:p-8">
                    <Announcement {...announcement} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      }
      {youngWomenAnnouncements.length > 0 &&
        <>
          <p className="text-lg text-gray-500 mt-7 text-center">Young Women</p>
          <div className="mt-7">
            <div className="relative max-w-xl mx-auto lg:max-w-7xl">
              <div className="grid gap-4 lg:grid-cols-2">
                {filterAndSortAnnouncements(youngWomenAnnouncements).map((announcement: IAnnouncement) => (
                  <div key={generateAnnouncementKey(announcement)} className="p-4 bg-white rounded-lg shadow-xl lg:p-8">
                    <Announcement {...announcement} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      }
      {youngMenAnnouncements.length > 0 &&
        <>
          <p className="text-lg text-gray-500 mt-7 text-center">Young Men</p>
          <div className="mt-7">
            <div className="relative max-w-xl mx-auto lg:max-w-7xl">
              <div className="grid gap-4 lg:grid-cols-2">
                {filterAndSortAnnouncements(youngMenAnnouncements).map((announcement: IAnnouncement) => (
                  <div key={generateAnnouncementKey(announcement)} className="p-4 bg-white rounded-lg shadow-xl lg:p-8">
                    <Announcement {...announcement} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      }
      {primaryAnnouncements.length > 0 &&
        <>
          <p className="text-lg text-gray-500 mt-7 text-center">Primary</p>
          <div className="mt-7">
            <div className="relative max-w-xl mx-auto lg:max-w-7xl">
              <div className="grid gap-4 lg:grid-cols-2">
                {filterAndSortAnnouncements(primaryAnnouncements).map((announcement: IAnnouncement) => (
                  <div key={generateAnnouncementKey(announcement)} className="p-4 bg-white rounded-lg shadow-xl lg:p-8">
                    <Announcement {...announcement} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      }
      {dataFaceCards.filter((card) => !card.hidden).length > 0 && (
        <>
          <SectionHeader title="Meet with a member of the bishopric" subtitle="Select a time and quickly schedule your appointment." className="pt-10 sm:pt-14 lg:pt-20"/>
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
            {dataFaceCards
              .filter((card) => !card.hidden)
              .map((card: IContactCard) => (
                <div key={card.title} className="py-3 w-full">
                  <ContactCard {...Object.assign(card, { className: "col-span-1" })} />
                </div>
              ))}
          </div>
        </>
      )}
      {dataMiniCards.filter((card) => !card.hidden).length > 0 && (
        <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {dataMiniCards
            .filter((card) => !card.hidden)
            .map((card: IMiniCard) => (
              <div key={card.title} className="py-3 w-full">
                <MiniCard {...card} />
              </div>
            ))}
        </div>
      )}
      {dataMissionaryCards.filter((card) => !card.hidden).length > 0 && (
        <>
          <SectionHeader title="Missionaries Serving" subtitle="Take some time to write our missionaries." className="pt-10 sm:pt-14 lg:pt-20"/>
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 pt-5">
            {dataMissionaryCards
              .filter((card) => !card.hidden)
              .map((card: IImageCard) => (
                <div key={card.title} className="py-3 w-full">
                  <ImageCard {...card} />
                </div>
              ))}
          </div>
        </>
      )}
      {dataImageCards.filter((card) => !card.hidden).length > 0 && (
        <>
          <SectionHeader title="Helpful Information" subtitle="Below are some good things to be aware of prior to attending camp." className="pt-10 sm:pt-14 lg:pt-14"/>
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 pt-5">
            {dataImageCards
              .filter((card) => !card.hidden)
              .map((card: IImageCard) => (
                <div key={card.title} className="py-3 w-full">
                  <ImageCard {...card} />
                </div>
              ))}
          </div>
        </>
      )}
    </Layout>
  )
}

export default Home


