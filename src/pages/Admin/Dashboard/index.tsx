import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import { tagService } from "../../../services/tagService";
import { seriesService } from "../../../services/seriesService";
import { movieService } from "../../../services/movieService";
import DashboardTable from "../../../components/Dashboard/DashboardTable";

const card = tv({
  slots: {
    containerMain:
      "flex justify-center items-center min-w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-950",
    containerBox:
      "flex flex-col justify-center items-center w-11/12 h-5/6 p-2 bg-gray-800 bg-opacity-90 rounded-md shadow-lg",
    title: "text-xl font-bold text-gray-200 mt-2 mb-4",
    separator: "w-full bg-gray-900 my-4",
  },
});

const { containerMain, containerBox, title, separator } = card();

const Separator = () => {
  return <hr className={separator()} />;
};

function AdminDashboard() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [soapOperas, setSoapOperas] = useState([]);
  const [animes, setAnimes] = useState([]);
  const [tags, setTags] = useState([]);

  const [showModalMovies, setShowModalMovies] = useState(false);
  const [showModalTvShows, setShowModalTvShows] = useState(false);
  const [showModalSoapOperas, setShowModalSoapOperas] = useState(false);
  const [showModalAnimes, setShowModalAnimes] = useState(false);
  const [showModalTags, setShowModalTags] = useState(false);

  const { isAuthenticated, isAdmin } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigation("/admin/login");
    }

    loadData();
  }, []);

  const loadData = async () => {
    const moviesResponse = await movieService.getAll();
    const seriesResponse = await seriesService.getAll();
    const tagsResponse = await tagService.getAll();

    if (moviesResponse.status === 200) setMovies(moviesResponse.data.movies);
    if (seriesResponse.status === 200) {
      setTvShows(seriesResponse.data.tvShow);
      setSoapOperas(seriesResponse.data.soapOpera);
      setAnimes(seriesResponse.data.anime);

      if (tagsResponse.status === 200) setTags(tagsResponse.data.tags);
    }
  };

  return (
    <section className={containerMain()}>
      <div className={containerBox()}>
        <h1 className={title()}>Dashboard</h1>

        <DashboardTable
          title={"Programas de TV"}
          type={"TVShow"}
          data={tvShows}
          setShowModalCreate={setShowModalTvShows}
          showModalCreate={showModalTvShows}
          tags={tags}
        />

        <Separator />

        <DashboardTable
          title={"Novelas"}
          type={"SoapOpera"}
          data={soapOperas}
          setShowModalCreate={setShowModalSoapOperas}
          showModalCreate={showModalSoapOperas}
          tags={tags}
        />

        <Separator />

        <DashboardTable
          title={"Animes"}
          type={"Anime"}
          data={animes}
          setShowModalCreate={setShowModalAnimes}
          showModalCreate={showModalAnimes}
          tags={tags}
        />

        <Separator />

        <DashboardTable
          title={"Filmes"}
          type={"Movie"}
          data={movies}
          setShowModalCreate={setShowModalMovies}
          showModalCreate={showModalMovies}
          tags={tags}
        />

        <Separator />

        <DashboardTable
          title={"Tags"}
          type={"Tag"}
          data={tags}
          setShowModalCreate={setShowModalTags}
          showModalCreate={showModalTags}
        />
      </div>
    </section>
  );
}

export default AdminDashboard;
