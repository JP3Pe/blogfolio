export default function TopBar() {
  return (
    <nav className="top-menu">
      <ul>
        <li>
          {/* 햄버거 아이콘 */}
          <div className="top-menu__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </li>
        <li>
          <span className="top-menu__title">Blogfolio</span>
        </li>
        <li>
          <span className="top-menu__right-blank-area"></span>
        </li>
      </ul>
      <style jsx>
        {`
          nav {
            --top-menu-height: 5vh;
            height: var(--top-menu-height);
            padding: 2vh 2vw;
          }

          nav > ul {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .top-menu__icon > svg:first-child {
            height: var(--top-menu-height);
          }

          .top-menu__title {
            font-weight: bold;
            font-size: 2em;
          }
        `}
      </style>
    </nav>
  );
}
