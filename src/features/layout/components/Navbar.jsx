import { useState } from "react";
import { Poppins } from "../../../components/ui/Text";
import { Button } from "../../../components/ui/Button";
import { Eachable } from "../../../lib/Eachable";
import { NavDropdown } from "./NavDropdown";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import himtiLogo from "../../../core/assets/images/himti-logo.png";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Tentang", to: "/tentang" },
  { name: "Anggota", to: "/angkatan" },
  // { name: "Artikel", to: "/artikel" },
];

const kegiatanSubMenu = [
  { name: "Materi", to: "/materi" },
  { name: "Tutorial", to: "/tutorial" },
  { name: "Agenda", to: "/agenda" },
];

const layananSubMenu = [
  { name: "Dosen", to: "/dosen" },
  { name: "Klinik", to: "/klinik" },
  { name: "Sertifikat", to: "/sertifikat" },
];

// eslint-disable-next-line react/prop-types
const MobileAccordion = ({ title, items, onLinkClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100"
      >
        <span>{title}</span>
        <ChevronDown
          size={20}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="pl-6 pt-2 flex flex-col items-start space-y-1">
          <Eachable
            datas={items}
            render={({ name, to }) => (
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `block py-1 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? "text-yellow-500"
                      : "text-gray-500 hover:text-gray-800"
                  }`
                }
                onClick={onLinkClick}
              >
                {name}
              </NavLink>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinkBaseClass = "transition";
  const navLinkActiveClass = "text-yellow-300 font-semibold";
  const navLinkInactiveClass = "hover:text-yellow-300";

  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      <div className="relative mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg px-6 w-full md:w-fit">
        <div className="flex items-center justify-between w-full md:px-6 py-3">
          {/* Grup kiri: Logo */}
          <div className="flex items-center gap-2 mr-8">
            <img src={himtiLogo} alt="HIMTI" className="h-10" />
            <Poppins className="font-bold text-gray-600 md:hidden">
              HIMTI UMT
            </Poppins>
          </div>

          {/* Grup kanan: Navigasi + Tombol */}
          <div className="hidden md:flex items-center gap-7">
            <nav className="flex items-center gap-5 text-gray-600">
              <Eachable
                datas={navLinks}
                render={({ name, to }) => (
                  <NavLink
                    key={name}
                    to={to}
                    className={({ isActive }) =>
                      `${navLinkBaseClass} ${
                        isActive
                          ? navLinkActiveClass
                          : navLinkInactiveClass
                      }`
                    }
                  >
                    <Poppins>{name}</Poppins>
                  </NavLink>
                )}
              />
              <NavDropdown title="Kegiatan" items={kegiatanSubMenu} />
              <NavDropdown title="Layanan" items={layananSubMenu} />
            </nav>

            <NavLink to="/pendaftaran">
              <Button
                variant="warning"
                size="lg"
                rounded="full"
                className="ml-2"
                to="/pendaftaran"
              >
                Pendaftaran
              </Button>
            </NavLink>
          </div>

          {/* Tombol Menu Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-white/20 focus:outline-none"
              aria-label="Buka menu utama"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Panel Dropdown Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-xl rounded-2xl mt-2 mx-auto max-w-lg">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <Eachable
              datas={navLinks}
              render={({ name, to }) => (
                <NavLink
                  key={name}
                  to={to}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? "bg-gray-100 text-yellow-500"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                  onClick={closeMobileMenu}
                >
                  {name}
                </NavLink>
              )}
            />

            {/* Accordion untuk sub-menu */}
            <MobileAccordion
              title="Kegiatan"
              items={kegiatanSubMenu}
              onLinkClick={closeMobileMenu}
            />
            <MobileAccordion
              title="Layanan"
              items={layananSubMenu}
              onLinkClick={closeMobileMenu}
            />

            <div className="border-t border-gray-200 pt-4 mt-4">
              <NavLink to="/pendaftaran">
                <Button
                  variant="warning"
                  size="lg"
                  rounded="full"
                  className="ml-2"
                  to="/pendaftaran"
                >
                  Pendaftaran
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
