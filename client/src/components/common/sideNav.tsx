import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";

function SideNav() {
  const Links = [
    {
      href: "/home",
      label: "Home",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="m219.31 108.68l-80-80a16 16 0 0 0-22.62 0l-80 80A15.87 15.87 0 0 0 32 120v96a8 8 0 0 0 8 8h64a8 8 0 0 0 8-8v-56h32v56a8 8 0 0 0 8 8h64a8 8 0 0 0 8-8v-96a15.87 15.87 0 0 0-4.69-11.32M208 208h-48v-56a8 8 0 0 0-8-8h-48a8 8 0 0 0-8 8v56H48v-88l80-80l80 80Z"
          />
        </svg>
      ),
    },
    {
      href: "/completed",
      label: "Completed Task",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 16 16"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          >
            <path d="M14.25 8.75c-.5 2.5-2.385 4.854-5.03 5.38A6.25 6.25 0 0 1 3.373 3.798C5.187 1.8 8.25 1.25 10.75 2.25" />
            <path d="m5.75 7.75l2.5 2.5l6-6.5" />
          </g>
        </svg>
      ),
    },
    {
      href: "/important",
      label: "Important Task",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            color="currentColor"
          >
            <path d="M4.5 10c0-3.771 0-5.657 1.172-6.828S8.729 2 12.5 2H14c3.771 0 5.657 0 6.828 1.172S22 6.229 22 10v4c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-1.5c-3.771 0-5.657 0-6.828-1.172S4.5 17.771 4.5 14z" />
            <path d="M13.25 14.5h.009m0-2.208V9.5M18.25 12a5 5 0 1 1-10 0a5 5 0 0 1 10 0M4.5 6H2m2.5 6H2m2.5 6H2" />
          </g>
        </svg>
      ),
    },
    {
      href: "/upcoming",
      label: "Upcomming Task",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M18.385 21h-2.827q-.214 0-.357-.143t-.143-.357t.143-.357t.357-.143h2.826q.231 0 .424-.192t.192-.424v-8.768H5V14q0 .214-.143.357T4.5 14.5t-.357-.143T4 14V6.616q0-.691.463-1.153T5.616 5h1.769V3.308q0-.233.153-.386t.385-.153t.386.153t.153.386V5h7.154V3.27q0-.214.143-.358t.357-.143t.356.143t.144.357V5h1.769q.69 0 1.153.463T20 6.616v12.769q0 .69-.462 1.153T18.384 21m-8.017-1.5H2q-.213 0-.357-.143T1.5 19t.143-.357T2 18.5h8.367l-2.72-2.765q-.141-.14-.144-.332q-.003-.191.143-.337q.14-.141.345-.141q.203 0 .344.14l3.388 3.37q.243.242.243.565t-.243.566l-3.389 3.388q-.14.14-.34.133t-.348-.153q-.14-.14-.14-.334t.14-.334zM5 9.615h14v-3q0-.23-.192-.423T18.384 6H5.616q-.231 0-.424.192T5 6.616zm0 0V6z"
          />
        </svg>
      ),
    },
    {
      href: "/todays",
      label: "Todays Task",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 56 56"
        >
          <path
            fill="currentColor"
            d="M11.992 49.97h32.016c4.899 0 7.36-2.438 7.36-7.266V14.086c0-4.828-2.461-7.265-7.36-7.265H11.992c-4.875 0-7.36 2.414-7.36 7.265v28.618c0 4.851 2.485 7.265 7.36 7.265m-.328-3.774c-2.086 0-3.258-1.102-3.258-3.281V20.813c0-2.156 1.172-3.281 3.258-3.281h32.649c2.085 0 3.28 1.125 3.28 3.281v22.102c0 2.18-1.195 3.28-3.28 3.28zm11.742-20.25h1.383c.82 0 1.102-.235 1.102-1.055v-1.383c0-.82-.281-1.078-1.102-1.078h-1.383c-.82 0-1.078.258-1.078 1.078v1.383c0 .82.258 1.055 1.078 1.055m7.805 0h1.36c.843 0 1.101-.235 1.101-1.055v-1.383c0-.82-.258-1.078-1.102-1.078h-1.359c-.82 0-1.101.258-1.101 1.078v1.383c0 .82.28 1.055 1.101 1.055m7.781 0h1.383c.82 0 1.102-.235 1.102-1.055v-1.383c0-.82-.282-1.078-1.102-1.078h-1.383c-.82 0-1.101.258-1.101 1.078v1.383c0 .82.281 1.055 1.101 1.055M15.625 33.61h1.383c.82 0 1.102-.234 1.102-1.055v-1.383c0-.82-.282-1.054-1.102-1.054h-1.383c-.82 0-1.101.234-1.101 1.054v1.383c0 .82.28 1.055 1.101 1.055m7.781 0h1.383c.82 0 1.102-.234 1.102-1.055v-1.383c0-.82-.281-1.054-1.102-1.054h-1.383c-.82 0-1.078.234-1.078 1.054v1.383c0 .82.258 1.055 1.078 1.055m8.485 1.896a3.642 3.642 0 1 0 0-7.284a3.642 3.642 0 0 0 0 7.284m7.101-1.896h1.383c.82 0 1.102-.234 1.102-1.055v-1.383c0-.82-.282-1.054-1.102-1.054h-1.383c-.82 0-1.101.234-1.101 1.054v1.383c0 .82.281 1.055 1.101 1.055m-23.367 7.687h1.383c.82 0 1.102-.257 1.102-1.078v-1.383c0-.82-.282-1.054-1.102-1.054h-1.383c-.82 0-1.101.234-1.101 1.054v1.383c0 .82.28 1.078 1.101 1.078m7.781 0h1.383c.82 0 1.102-.257 1.102-1.078v-1.383c0-.82-.281-1.054-1.102-1.054h-1.383c-.82 0-1.078.234-1.078 1.054v1.383c0 .82.258 1.078 1.078 1.078m7.805 0h1.36c.843 0 1.101-.257 1.101-1.078v-1.383c0-.82-.258-1.054-1.102-1.054h-1.359c-.82 0-1.101.234-1.101 1.054v1.383c0 .82.28 1.078 1.101 1.078"
          />
        </svg>
      ),
    },
  ];
  return (
        <Sidebar>
          <SidebarBody>
            {Links.map((link, index) => (
              <SidebarLink key={index} link={link} />
            ))}
          </SidebarBody>
        </Sidebar>
  );
}

export default SideNav;
