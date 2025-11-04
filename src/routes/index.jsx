import { Route, Routes } from "react-router";
import MainLayout from "../features/layout/view/MainLayout";
import HomePage from "../features/home/view/HomePage";
import AboutPage from "../features/about/view/AboutPage";
import MateriPage from "../features/materi/views/MateriPage";
import AngkatanPage from "../features/angkatan/view/AngkatanPage";
// import ArtikelPage from "../features/artikel/view/ArtikelPage";
// import ArticleDetailPage from "../features/artikel/components/ArticleDetailPage";
import TutorialPage from "../features/tutorial/view/TutorialPage";
import TutorialDetailPage from "../features/tutorial/view/TutorialDetailPage";
import AgendaPage from "../features/agenda/view/AgendaPage";
import DosenPage from "../features/dosen/view/DosenPage";
import KlinikPage from "../features/klinik/view/KlinikPage";
import SertifikatPage from "../features/sertifikat/view/SertifikatPage";
import PendaftaranPage from "../features/pendaftaran/view/PendaftaranPage";
import NotFound from "../features/display/view/NotFound";

export default function AppRoutes() {
  return (
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tentang" element={<AboutPage />} />
          <Route path="/angkatan" element={<AngkatanPage />} />
          <Route path="/materi" element={<MateriPage />} />
          {/* <Route path="/artikel" element={<ArtikelPage />} /> */}
          {/* detail page artikel  */}
          {/* <Route path="/artikel/:id" element={<ArticleDetailPage />} /> */}
          <Route path="/tutorial" element={<TutorialPage />} />
          {/* detail page tutorial */}
          <Route path="/tutorial/:id" element={<TutorialDetailPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/dosen" element={<DosenPage />} />
          <Route path="/klinik" element={<KlinikPage />} />
          <Route path="/sertifikat" element={<SertifikatPage />} />
          <Route path="/pendaftaran" element={<PendaftaranPage />} />
        </Route>

        {/* Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

