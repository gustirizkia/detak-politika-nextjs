import React, { useEffect, useState } from "react";

export default function ScrollTop() {
  const [showTag, setShowTag] = useState(false);
  const handleScroll = () => {
    // console.log("window.scrollY", Math.ceil(window.scrollY));
    if (Math.ceil(window.scrollY) > 300) {
      setShowTag(true);
    } else {
      setShowTag(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });
  return (
    <>
      {!showTag || (
        <div
          className="scroll-top fixed z-50 right-4 bottom-4 text-pink-500"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-8 h-8"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </>
  );
}
