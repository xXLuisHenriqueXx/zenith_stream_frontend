import React, { useState } from "react";
import { tv } from "tailwind-variants";
import { CalendarPlus, PlusCircle, Trash } from "lucide-react";

import ModalCreate from "../ModalCreate";
import ModalCreateEpisode from "./ModalCreateEpisode";
import ModalCreateDaily from "./ModalCreateDaily";
import { z } from "zod";
import { movieSchema } from "../../../schemas/movieSchema";
import { seriesSchema } from "../../../schemas/seriesSchema";
import { tagSchema } from "../../../schemas/tagSchema";
import { movieService } from "../../../services/movieService";
import { seriesService } from "../../../services/seriesService";
import { tagService } from "../../../services/tagService";

const card = tv({
  slots: {
    containerMain: "w-full flex flex-row justify-between items-center",
    containerData: "w-full py-2 bg-gray-900 rounded-sm",
    titleText: "text-md font-medium text-gray-200",
    button:
      "relative flex flex-row justify-between items-center p-1 mb-2 bg-blue-700 rounded-sm hover:bg-blue-500",
    buttonText: "text-sm text-white font-bold",
    icon: "ml-1",
    itemSpan: "flex flex-row justify-between items-center p-2",
    itemText: "relative max-w-xs text-white text-sm overflow-hidden truncate",
  },
});

const { containerMain, containerData, titleText, button, buttonText, icon, itemSpan, itemText } = card();

type MovieType = z.infer<typeof movieSchema>;
type SeriesType = z.infer<typeof seriesSchema>;
type TagType = z.infer<typeof tagSchema>;
type DataTypes = MovieType | SeriesType | TagType;

interface Props {
    title: string;
    type: string;
    data: DataTypes[];
    showModalCreate: boolean;
    setShowModalCreate: (visbile: boolean) => void;
    tags?: TagType[];
}

function DashboardTable({ title, type, data, showModalCreate, setShowModalCreate, tags }: Props) {
  const [showModalEpisodes, setShowModalEpisodes] = useState(false);
  const [showModalDaily, setShowModalDaily] = useState(false);
  const [itemSeriesID, setItemSeriesID] = useState();
  const [itemDailyID, setItemDailyID] = useState();
  const [contentType, setContentType] = useState("");

  const deleteItem = async (id: string) => {
    if (type === "Movie") {
      const { status } = await movieService.delete(id);

      if (status === 200) {
        alert("Filme deletado com sucesso");
        window.location.reload();
      }
    }
    
    if (type === "TVShow" || type === "SoapOpera" || type === "Anime") {
      const { status } = await seriesService.delete(id);

      if (status === 200) {
        alert("Série deletada com sucesso");
        window.location.reload();
      }
    }
    
    if (type === "Tag") {
      const { status } = await tagService.delete(id);

      if (status === 200) {
        alert("Tag deletada com sucesso");
        window.location.reload();
      }
    }
  };

  return (
    <>
      {showModalCreate && (
        <ModalCreate
          showModal={showModalCreate}
          setShowModal={setShowModalCreate}
          type={type}
          tags={tags}
        />
      )}

      {showModalEpisodes && (
        <ModalCreateEpisode
          setShowModal={setShowModalEpisodes}
          itemSeriesID={itemSeriesID}
        />
      )}

      {showModalDaily && (
        <ModalCreateDaily
          setShowModal={setShowModalDaily}
          type={contentType}
          itemID={itemDailyID}
        />
      )}

      <div className={containerMain()}>
        <h1 className={titleText()}>{title}</h1>

        <button className={button()} onClick={() => setShowModalCreate(true)}>
          <span className={buttonText()}>ADICIONAR</span>

          <PlusCircle className={icon()} size={16} color="#fff" />
        </button>
      </div>
      <div className={containerData()}>
        <div className="w-full">
          {!data ||
            (data.length === 0 && (
              <span className={itemSpan()}>
                <h2 className={itemText()}>
                  Nenhum dado para ser mostrado aqui...
                </h2>
              </span>
            ))}

          {data.map((item, index) => (
            <div>
              <span key={index} className={itemSpan()}>
                <h2 className={itemText()}>
                  {item.name ? item.title : item.name}
                </h2>

                <div className="flex flex-row items-center gap-2" >
                  {type === "Movie" && (
                    <CalendarPlus
                      className="cursor-pointer"
                      size={20}
                      color="#fff"
                      onClick={() => {
                        setItemDailyID(item.id);
                        setContentType("Movie");
                        setShowModalDaily(true);
                      }}
                    />
                  )}
                  {type !== "Movie" && type !== "Tag" && (
                    <PlusCircle
                      className="cursor-pointer"
                      size={20}
                      color="#fff"
                      onClick={() => {
                        setItemSeriesID(item.id);
                        setShowModalEpisodes(true);
                      }}
                    />
                  )}
                  ?
                  <Trash
                    className="cursor-pointer"
                    size={20}
                    color="#fff"
                    onClick={() => deleteItem(item.id)}
                  />
                </div>
              </span>

              {type !== "Tag" &&
                item.episodes &&
                item.episodes.map((episode, index) => (
                  <span
                    key={index}
                    className="*:
                                    flex flex-row justify-between items-center p-2 pl-8
                                "
                  >
                    <h2 className={itemText()}>{episode.title}</h2>

                    <div
                      className="
                                        flex flex-row items-center gap-2
                                    "
                    >
                      <CalendarPlus
                        className="cursor-pointer"
                        size={20}
                        color="#fff"
                        onClick={() => {
                          setItemDailyID(episode.id);
                          setContentType("Series");
                          setShowModalDaily(true);
                        }}
                      />
                    </div>
                  </span>
                ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DashboardTable;
