import { ChevronRightIcon, SearchIcon } from "./Icons";

/** Matches Figma Deck “First time ever” (`903:5370`): height 68px, breadcrumb x=32, search field 256×40, primary actions right-aligned. */
const HEADER_H = "h-[68px]";
const HEADER_PAD_X = "px-8";

export default function Header({ breadcrumb = ["Home"], rightSlot }) {
  return (
    <header
      className={`fixed left-[220px] right-0 top-0 z-30 flex ${HEADER_H} shrink-0 items-center justify-between gap-4 border-b border-[#E5E5E5] bg-white ${HEADER_PAD_X}`}
    >
      <nav
        aria-label="Breadcrumb"
        className="flex min-w-0 flex-1 items-center gap-2 text-typ-body text-[#525252]"
      >
        {breadcrumb.map((crumb, i) => (
          <span key={`${crumb}-${i}`} className="flex min-w-0 items-center gap-2">
            <span
              className={
                i === breadcrumb.length - 1
                  ? "truncate font-semibold text-[#161616]"
                  : "truncate font-normal text-[#525252]"
              }
            >
              {crumb}
            </span>
            {i < breadcrumb.length - 1 && (
              <ChevronRightIcon size={14} className="shrink-0 text-[#A8A8A8]" />
            )}
          </span>
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-2.5">
        {rightSlot}
        <div className="flex h-10 w-[256px] shrink-0 items-center gap-3 rounded-md border border-[#E0E0E0] bg-white px-3">
          <input
            type="text"
            placeholder="Search"
            className="min-w-0 flex-1 bg-transparent text-typ-body text-[#161616] placeholder:text-[#A8A8A8] focus:outline-none"
          />
          <SearchIcon size={16} className="shrink-0 text-[#A8A8A8]" />
        </div>
        <button
          type="button"
          className="flex h-10 min-w-[97px] shrink-0 items-center justify-center rounded-md bg-[#F4F4F4] px-4 text-typ-body font-medium text-[#161616] hover:bg-[#E8E8E8]"
        >
          Feedback
        </button>
      </div>
    </header>
  );
}
