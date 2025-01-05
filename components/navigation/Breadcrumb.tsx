import Link from "next/link";

interface SecondLink {
  href: string;
  label: string;
}

const Breadcrumb = ({ secondLink }: { secondLink: SecondLink }) => {
  return (
    <div className="md:hidden flex text-sm items-center opacity-30 py-2 md:mb-2 overflow-x-auto whitespace-nowrap">
      {/* Fixed Home Link */}
      <Link href="/" className="text-gray-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </Link>

      {/* Divider */}
      <span className="mx-5 text-gray-900">/</span>

      {/* Dynamic Second Link */}
      <Link href={secondLink.href} className="text-gray-900 hover:underline">
        {secondLink.label}
      </Link>
    </div>
  );
};

export default Breadcrumb;
