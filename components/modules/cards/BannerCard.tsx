import Linkify from "linkify-react"
import { IButton } from "../../../shared/types"
import PrimaryButton from "../../elements/buttons/PrimaryButton"
import Icon from "../../elements/icons/Icon"

export type IBannerCard = {
  title: string
  subtitle: string
  paragraph?: string
  button?: IButton
  hidden?: boolean
}

const options = {
  attributes: null,
  className: "text-blue-700 hover:text-blue-500",
  defaultProtocol: "http",
  events: null,
  format: (value, type) => value,
  formatHref: (href, type) => href,
  ignoreTags: [],
  nl2br: false,
  rel: null,
  tagName: "a",
  target: "_blank",
  truncate: 0,
  validate: true,
}

const BannerCard = ({ ...card }: any) => {
  return (
    <div className="bg-white shadow-xl rounded-lg border-2">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">{card.title}</h3>
            <div className="text-sm text-primary">{card.subtitle}</div>
            <Linkify tagName="p" options={options} className="bg-white mt-2 text-sm text-gray-500 rounded-xl">{card.paragraph && <p>{card.paragraph}</p>}</Linkify>
          </div>
          {card.button.text && card.button.link.label?.text !== 'image-view' && (
            <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
            <PrimaryButton size="sm" type="dark" color="primary" link={card.button.link}>
              {card.button.text}
            </PrimaryButton>
          </div>
          )}
        </div>
        {card.button.link.label?.text === 'image-view' && (
          <img className="mt-5 w-full object-cover" src={card.button.link.url} />
        )}
      </div>
    </div>
  )
}

export default BannerCard

