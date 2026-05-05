import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFileAlt, FaExternalLinkAlt } from "react-icons/fa";
import GenericPage from "../../components/GenericPage";
import DocumentsSidebar from "../../components/DocumentsSidebar";
import { DOCUMENT_CATEGORIES } from "../../data/documentsCatalog";

const DocumentsHub = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Documents | SSGMCE";
  }, []);

  return (
    <GenericPage
      title="Documents"
      showInnerTitle={false}
      backgroundImage="https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1600&q=80"
      sidebar={<DocumentsSidebar />}
    >
      <div className="space-y-8">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-white to-blue-50 p-6 shadow-sm">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-ssgmce-blue">
            Document Center
          </p>
          <h2 className="text-3xl font-bold text-ssgmce-blue">Official documents and downloads</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-700">
            Browse approvals, audits, accreditation records, policies, and academic reference documents from a single entry point.
          </p>
        </div>

        <div className="space-y-8">
          {DOCUMENT_CATEGORIES.map((category) => (
            <section key={category.id} className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{category.label}</h3>
                <p className="mt-1 text-sm text-gray-600">{category.description}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {category.sections.map((section) => (
                  <article
                    key={section.id}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ssgmce-orange">
                          {category.label}
                        </p>
                        <h4 className="mt-1 text-lg font-bold text-gray-900">
                          {section.label}
                        </h4>
                      </div>
                      <FaFileAlt className="mt-1 text-xl text-ssgmce-blue" />
                    </div>

                    <p className="text-sm leading-6 text-gray-600">{section.summary}</p>

                    <div className="mt-5">
                      <Link
                        to={section.route}
                        className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-ssgmce-dark-blue"
                      >
                        Open Section <FaExternalLinkAlt className="text-xs" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </GenericPage>
  );
};

export default DocumentsHub;
