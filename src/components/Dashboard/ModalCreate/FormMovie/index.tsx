import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { tv } from "tailwind-variants";
import { Cake, Calendar, File, PlusCircle, StickyNote, Timer, User } from "lucide-react";

import { TagType } from "..";
import { createMovieSchema } from "../../../../schemas/movieSchema";
import { movieService } from "../../../../services/movieService";

const card = tv({
  slots: {
    containerInput: "flex flex-row items-center w-full h-12 px-4 mb-4 bg-gray-800 text-white rounded-sm",
    containerInputCheckBox: "flex flex-col items-start w-full mb-4 p-2 bg-gray-800 rounded-sm text-white focus:outline-none",
    icon: "w-6 h-6 text-white",
    input: "w-full h-full bg-transparent text-white ml-2 focus:outline-none",
    button: "relative flex justify-center items-center w-full h-12 px-4 bg-transparent hover:bg-blue-500 border-2 border-blue-500 rounded-sm text-white hover:text-slate-900 transition-all duration-200",
    buttonText: "text-lg font-oswald font-medium uppercase",
    buttonIcon: "w-6 h-6 absolute right-4",
  },
});

const { containerInput, containerInputCheckBox, icon, input, button, buttonText, buttonIcon } = card();

type MovieType = z.infer<typeof createMovieSchema>;

interface Props {
  setShowModal: (visible: boolean) => void;
  tags: TagType[];
}

function FormMovie({ setShowModal, tags }: Props) {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const {
    register,
    handleSubmit,
  } = useForm<MovieType>({
    resolver: zodResolver(createMovieSchema),
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<MovieType> = async (data: MovieType) => {
    try {
      const {
        title,
        description,
        director,
        durationInMinutes,
        durantionInHours,
        ageRestriction,
        releaseYear,
        tags,
      } = data;

      let durationTotal = durationInMinutes;
      if (durantionInHours)
        durationTotal = durationInMinutes + durantionInHours * 60;

      const params = {
        title,
        description,
        director,
        durationInMinutes: durationTotal,
        ageRestriction,
        releaseYear,
        tags,
        image,
      };
      const { status } = await movieService.create(params);

      if (status === 201) {
        alert("Movie created with success");
        setShowModal(false);
        window.location.reload();
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className={containerInput()}>
        <StickyNote className={icon()} />
        <input
          type="text"
          placeholder="Title..."
          autoComplete="off"
          className={input()}
          {...register("title")}
        />
        {/* {errors.title && <p>{errors.title.message}</p>} */}
      </label>

      <label className={containerInput()}>
        <StickyNote className={icon()} />
        <input
          type="text"
          placeholder="Description..."
          autoComplete="off"
          className={input()}
          {...register("description")}
        />
        {/* {errors.description && <p>{errors.description.message}</p>} */}
      </label>

      <label className={containerInput()}>
        <User className={icon()} />
        <input
          type="text"
          placeholder="Director..."
          autoComplete="off"
          className={input()}
          {...register("director")}
        />
        {/* {errors.owner && <span>{errors.owner.message}</span>} */}
      </label>

      <label className={containerInput()}>
        <Timer className={icon()} />
        <input
          type="text"
          placeholder="Hours"
          autoComplete="off"
          className={input()}
          {...register("durantionInHours")}
        />
        <input
          className={input()}
          type="text"
          placeholder="Minutes"
          autoComplete="off"
          {...register("durationInMinutes")}
        />
        {/* {errors.durationHours && <span>{errors.durationHours.message}</span>} */}
        {/* {errors.durationMinutes && <span>{errors.durationMinutes.message}</span>} */}
      </label>

      <label className={containerInput()}>
        <Cake className={icon()} />
        <select className={input()} {...register("ageRestriction")}>
          <option value="AGE_ALL">L</option>
          <option value="AGE_10">10</option>
          <option value="AGE_12">12</option>
          <option value="AGE_14">14</option>
          <option value="AGE_16">16</option>
          <option value="AGE_18">18</option>
        </select>
        {/* {errors.ageRestriction && <p>{errors.ageRestriction.message}</p>} */}
      </label>

      <div className={containerInputCheckBox()}>
        {tags.map((tag, index) => (
          <label key={index}>
            <input type="checkbox" value={tag.id} {...register("tags")} />
            <label>{tag.name}</label>
          </label>
        ))}
        {/* {errors.tags && <p>{errors.tags.message}</p>} */}
      </div>

      <label className={containerInput()}>
        <Calendar className={icon()} />
        <input
          type="number"
          placeholder="Ano de lançamento..."
          autoComplete="off"
          {...register("releaseYear")}
        />
        {/* {errors.releaseYear && <p>{errors.releaseYear.message}</p>} */}
      </label>

      <label className={containerInput()}>
        <File className={icon()} />
        <input type="file" onChange={handleImageChange} className={input()} />
      </label>

      <button type="submit" className={button()}>
        <p className={buttonText()}>Create</p>
        <PlusCircle className={buttonIcon()}/>
      </button>
    </form>
  );
}

export default FormMovie;
