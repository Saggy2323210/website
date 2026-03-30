import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { SOCIAL_LINKS } from '../constants/socialLinks';

const quickLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Departments', to: '/departments' },
  { label: 'Placements', to: '/placements' },
  { label: 'Research', to: '/research' },
  { label: 'Contact Us', to: '/contact' },
];

const importantLinks = [
  { label: 'SGBAU', href: 'https://sgbau.ac.in' },
  { label: 'AICTE', href: 'https://aicte-india.org' },
  { label: 'MHRD', href: 'https://www.education.gov.in' },
  { label: 'DTE Maharashtra', href: 'https://dte.maharashtra.gov.in' },
  { label: 'Events', to: '/events' },
  { label: 'Photo Gallery', to: '/gallery' },
];

const sectionClass =
  'rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_18px_40px_rgba(7,18,37,0.18)] backdrop-blur-sm';

const headingClass = 'mb-4 text-base font-bold text-ssgmce-orange md:text-lg';

const linkClass =
  'group inline-flex items-center text-gray-200 transition-all duration-200 hover:text-white';

const Footer = () => {
  return (
    <footer className="mt-auto bg-[radial-gradient(circle_at_top,#294f86_0%,#1d3a61_45%,#152d4a_100%)] text-white">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-12 xl:gap-6">
          <div className={`${sectionClass} sm:col-span-2 xl:col-span-5`}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="mb-0 text-base font-bold text-ssgmce-orange md:text-lg">
                About SSGMCE
              </h3>
              <span className="hidden rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60 sm:inline-flex">
                Since 1983
              </span>
            </div>

            <p className="max-w-xl text-sm leading-7 text-gray-200/90">
              Shri Sant Gajanan Maharaj College of Engineering is a premier engineering institution
              in Maharashtra, affiliated to Sant Gadge Baba Amravati University and approved by AICTE.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    title={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-ssgmce-orange hover:bg-ssgmce-orange"
                  >
                    <Icon className="text-sm" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className={`${sectionClass} xl:col-span-2`}>
            <h3 className={headingClass}>Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>
                    <span className="mr-2 text-[10px] text-ssgmce-orange transition-transform duration-200 group-hover:translate-x-0.5">
                      ●
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${sectionClass} xl:col-span-2`}>
            <h3 className={headingClass}>Important Links</h3>
            <ul className="space-y-2.5 text-sm">
              {importantLinks.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      <span className="mr-2 text-[10px] text-ssgmce-orange transition-transform duration-200 group-hover:translate-x-0.5">
                        ●
                      </span>
                      <span>{item.label}</span>
                    </a>
                  ) : (
                    <Link to={item.to} className={linkClass}>
                      <span className="mr-2 text-[10px] text-ssgmce-orange transition-transform duration-200 group-hover:translate-x-0.5">
                        ●
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className={`${sectionClass} xl:col-span-3`}>
            <h3 className={headingClass}>Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 rounded-xl border border-white/8 bg-black/10 px-3 py-3">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-sm text-ssgmce-orange" />
                <span className="leading-6 text-gray-200">
                  Shegaon - 444203, Dist. Buldhana, Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-3 rounded-xl border border-white/8 bg-black/10 px-3 py-3">
                <FaPhone className="flex-shrink-0 text-sm text-ssgmce-orange" />
                <a href="tel:+917265252101" className="text-gray-200 transition-colors hover:text-white">
                  +91-7265-252101
                </a>
              </li>
              <li className="flex items-center gap-3 rounded-xl border border-white/8 bg-black/10 px-3 py-3">
                <FaEnvelope className="flex-shrink-0 text-sm text-ssgmce-orange" />
                <a
                  href="mailto:principal@ssgmce.ac.in"
                  className="break-all text-gray-200 transition-colors hover:text-white"
                >
                  principal@ssgmce.ac.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-ssgmce-dark-blue/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col items-center justify-between gap-2 text-center text-xs text-gray-300 md:flex-row md:text-left">
            <p>&copy; {new Date().getFullYear()} SSGMCE Shegaon. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
