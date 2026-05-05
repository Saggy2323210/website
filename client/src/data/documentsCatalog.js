export const DOCUMENT_SECTION_ALIASES = {
  aicte: "aicte",
  audit: "audit",
  documents: "all",
  disclosure: "mandatory",
  financial: "financial",
  iso: "iso",
  mandatory: "mandatory",
  naac: "naac",
  nba: "nba",
  newsletter: "newsletter",
  nirf: "nirf",
  policies: "policies",
  "student-forms": "student-forms",
  tattwadarshi: "tattwadarshi",
};

export const DOCUMENT_CATEGORIES = [
  {
    id: "institution",
    label: "Institution",
    description: "Core institutional approvals, policies, and compliance records.",
    sections: [
      {
        id: "policies",
        label: "Policies and Procedure",
        route: "/documents/policies",
        summary: "Institutional policies, procedures, and governance guidelines.",
      },
      {
        id: "mandatory",
        label: "Mandatory Disclosure",
        route: "/documents/disclosure",
        summary: "Mandatory disclosures published for regulatory compliance.",
      },
      {
        id: "aicte",
        label: "AICTE Approval",
        route: "/documents/aicte",
        summary: "AICTE approval letters and extension records.",
      },
      {
        id: "financial",
        label: "Financial Statements",
        route: "/documents/financial",
        summary: "Audited financial statements and related reports.",
      },
      {
        id: "student-forms",
        label: "Student Forms",
        route: "/documents/student-forms",
        summary: "Downloadable forms and applications for students.",
      },
    ],
  },
  {
    id: "quality",
    label: "Quality Assurance",
    description: "Accreditation, audit, and certification documents.",
    sections: [
      {
        id: "naac",
        label: "NAAC",
        route: "/documents/naac",
        summary: "NAAC certificates and peer team reports.",
      },
      {
        id: "nba",
        label: "NBA",
        route: "/documents/nba",
        summary: "Program accreditation records and validity details.",
      },
      {
        id: "iso",
        label: "ISO",
        route: "/documents/iso",
        summary: "ISO certification, manuals, and committee documents.",
      },
      {
        id: "audit",
        label: "Sustainable Audit",
        route: "/documents/audit",
        summary: "Energy, environmental, and green audit reports.",
      },
    ],
  },
  {
    id: "academics",
    label: "Academics",
    description: "Ranking and institutional academic reference documents.",
    sections: [
      {
        id: "nirf",
        label: "NIRF",
        route: "/documents/nirf",
        summary: "Year-wise NIRF submissions and ranking data.",
      },
      {
        id: "newsletter",
        label: "News Letters",
        route: "/documents/newsletter",
        summary: "Annual newsletters and institutional updates.",
      },
      {
        id: "tattwadarshi",
        label: "e-Tattwadarshi",
        route: "/documents/tattwadarshi",
        summary: "Archive of the institute's technical magazine issues.",
      },
    ],
  },
];

export const DOCUMENT_SECTIONS = DOCUMENT_CATEGORIES.flatMap((category) =>
  category.sections.map((section) => ({
    ...section,
    categoryId: category.id,
    categoryLabel: category.label,
  })),
);

export const getDocumentSection = (sectionKey = "") => {
  const normalizedKey = DOCUMENT_SECTION_ALIASES[sectionKey] || sectionKey;
  if (normalizedKey === "all") {
    return null;
  }
  return DOCUMENT_SECTIONS.find((section) => section.id === normalizedKey) || null;
};
