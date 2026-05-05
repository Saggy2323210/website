import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";
import MobileSidebarToggle from "./MobileSidebarToggle";
import {
  DOCUMENT_SECTIONS,
} from "../data/documentsCatalog";

const adminLinks = [
  { pageId: "documents-policies", label: "Policies and Procedure" },
  { pageId: "documents-mandatory", label: "Mandatory Disclosure" },
  { pageId: "documents-naac", label: "NAAC" },
  { pageId: "documents-nba", label: "NBA" },
  { pageId: "documents-iso", label: "ISO" },
  { pageId: "documents-nirf", label: "NIRF" },
  { pageId: "documents-audit", label: "Sustainable Audit" },
  { pageId: "documents-aicte", label: "AICTE Approval" },
  { pageId: "documents-financial", label: "Financial Statements" },
  { pageId: "documents-newsletter", label: "News Letters" },
  { pageId: "documents-tattwadarshi", label: "e-Tattwadarshi" },
];

const DocumentsSidebar = () => {
  const location = useLocation();
  const { pageId: activeAdminPageId } = useParams();
  const isAdminEditor =
    location.pathname.startsWith("/admin/pages/editor/") ||
    location.pathname.startsWith("/admin/visual/");

  const getAdminBasePath = () =>
    location.pathname.startsWith("/admin/visual/")
      ? "/admin/visual"
      : "/admin/pages/editor";

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const navContent = (
    <ul className="space-y-1">
      {!isAdminEditor && (
        <>
          <li>
            <Link
              to="/documents"
              className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                location.pathname === "/documents"
                  ? "bg-ssgmce-blue/10 font-semibold text-ssgmce-blue"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Documents Home
            </Link>
          </li>

          <li className="pt-2">
            <div className="px-4 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
              Document Catalog
            </div>
            <ul className="space-y-1">
              {DOCUMENT_SECTIONS.map((section) => {
                const isActive = location.pathname === section.route;

                return (
                  <li key={section.route}>
                    <Link
                      to={section.route}
                      className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-ssgmce-blue/10 font-semibold text-ssgmce-blue"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {section.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        </>
      )}

      {isAdminEditor &&
        adminLinks.map((link) => {
          const targetPath = `${getAdminBasePath()}/${link.pageId}`;
          const isActive = activeAdminPageId === link.pageId;

          return (
            <li key={link.pageId}>
              <Link
                to={targetPath}
                className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-ssgmce-blue/10 font-semibold text-ssgmce-blue"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
    </ul>
  );

  return (
    <>
      <MobileSidebarToggle title="Documents" icon={FaFileAlt}>
        {navContent}
      </MobileSidebarToggle>

      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24 lg:block">
        <div className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue p-4">
          <h3 className="flex items-center text-lg font-bold text-white">
            <FaFileAlt className="mr-2" /> Documents
          </h3>
        </div>

        <div className="p-3">{navContent}</div>

        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          <p className="mb-1 text-xs font-semibold text-gray-500">Need Help?</p>
          <p className="text-xs text-ssgmce-blue">+91-7265-252274</p>
          <p className="text-xs text-ssgmce-blue">documents@ssgmce.ac.in</p>
        </div>
      </div>
    </>
  );
};

export default DocumentsSidebar;
