import { tv } from "tailwind-variants";
import { z } from "zod";

import { tagSchema } from "../../../schemas/tagSchema";
import FormMovie from "./FormMovie";
import FormSeries from "./FormSeries";

const card = tv({
  slots: {
    containerMain:
      "fixed top-0 left-0 min-w-full min-h-full bg-slate-950 bg-opacity-90 z-[98]",
    containerModal:
      "absolute bottom-0 left-0 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col p-4 md:px-6 lg:px-8 2xl:p-8 w-full md:w-[90%] lg:w-2/3 xl:w-3/5 2xl:w-2/5 h-3/4 xl:h-[90%] 2xl:h-[80%] overflow-auto bg-slate-900 rounded-t-3xl md:rounded-lg z-[99]",
    containerForm: "w-full",
    title: "text-lg font-bold text-center text-gray-200 mb-4",
  },
});

const {
  containerMain,
  containerModal,
  containerForm,
  title,
} = card();

export type TagType = z.infer<typeof tagSchema>;

interface Props {
  setShowModal: (visible: boolean) => void;
  type: "movie" | "tvShow" | "soapOpera" | "anime" | "tag";
  tags: TagType[];
}

function ModalCreate({ setShowModal, type, tags }: Props) {
    const handleTitle = () => {
    if (type === "movie") return "Create movie";
    if (type === "tvShow") return "Create TV show";
    if (type === "soapOpera") return "Create soap opera";
    if (type === "anime") return "Create anime";
    if (type === "tag") return "Create tag";
    } 

  return (
    <section className={containerMain()} onClick={() => setShowModal(false)}>
      <div className={containerModal()} onClick={(e) => e.stopPropagation()}>
        <h1 className={title()}>
          {handleTitle()}
        </h1>
        <div className={containerForm()}>
            {type === "movie" && <FormMovie setShowModal={setShowModal} tags={tags} />}
            {type === "tvShow" && <FormSeries type="tvShow" setShowModal={setShowModal} tags={tags} />}
            {type === "soapOpera" && <FormSeries type="soapOpera" setShowModal={setShowModal} tags={tags} />}
            {type === "anime" && <FormSeries type="anime" setShowModal={setShowModal} tags={tags} />}
            {/* {type === "tag" && <FormTag setShowModal={setShowModal} />} */}
        </div>
      </div>
    </section>
  );
}

export default ModalCreate;
