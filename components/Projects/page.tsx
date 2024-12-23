/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { RiEmotionSadLine } from "react-icons/ri";

export const ProjectDisplay = ({ items }: { items: any }) => {
  const [show, setShow] = useState(0);

  const listClass =
    " font-normal text-[rgba(0,0,0,0.75)]  p-1   text-[clamp(15px,2.5vw,1.5rem)] truncate";
  const hoverClass = "hover:bg-white hover:text-black truncate";

  if (items.length == 0) {
    return (
      <li
        className={`${listClass} ${hoverClass} border-none flex items-center gap-2 cursor-not-allowed `}
      >
        <RiEmotionSadLine /> Null
      </li>
    );
  }

  return (
    <>
      {items &&
        items.slice(show, show + 3).map((e: any) => (
          <a target="_blank" key={e.id} href={e.link}>
            <li className={`${listClass} ${hoverClass}`}>{e.title}</li>
            <hr className="bg-[rgba(0,0,0,0.85)] text-[rgba(0,0,0,0.85)] border-0 h-[1px] " />
          </a>
        ))}
      {show + 3 < items.length ||
        (show >= 3 &&
          [...Array(3 - items.slice(show, show + 3).length).keys()].map(
            (e, i) => (
              <a key={e + i} target="_blank">
                <li className={`${listClass}`}>{"‎  "}</li>
              </a>
            )
          ))}

      {(show + 3 < items.length || show >= 3) && (
        <li className={`${listClass} border-none  flex gap-2 w-min`}>
          <button
            disabled={show == 0}
            className={`${show != 0 && `${hoverClass} rounded`}`}
            onClick={() => setShow((e) => e - 3)}
          >
            <BsArrowLeftShort />
          </button>

          <p className="">
            {Math.floor(show / 3) + 1}/{Math.floor(items.length / 3) + 1}
          </p>
          <button
            disabled={show + 3 == items.length || show + 3 > items.length}
            className={`${
              show + 3 != items.length &&
              show + 3 < items.length &&
              `${hoverClass} rounded`
            }`}
            onClick={() => setShow((e) => e + 3)}
          >
            <BsArrowRightShort />
          </button>
        </li>
      )}
    </>
  );
};
