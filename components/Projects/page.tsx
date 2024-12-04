/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { RiEmotionSadLine } from "react-icons/ri";

export const ProjectDisplay = ({ items }: { items: any }) => {
  const [show, setShow] = useState(0);

  if (items.length == 0) {
    return (
      <li className="border rounded p-1 text-xs cursor-not-allowed hover:bg-white hover:text-black truncate">
        <RiEmotionSadLine />
      </li>
    );
  }

  return (
    <>
      {items &&
        items.slice(show, show + 3).map((e: any) => (
          <a target="_blank" key={e.id} href={e.link}>
            <li className="border rounded p-1 text-xs hover:bg-white hover:text-black truncate">
              {e.title}
            </li>
          </a>
        ))}
      {(show + 3 < items.length || show > 3) && (
        <li className="border rounded p-1 flex gap-2 w-min text-xs truncate">
          <button
            disabled={show == 0}
            className={`${
              show != 0 && " hover:bg-white hover:text-black rounded"
            }`}
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
              "hover:bg-white hover:text-black rounded"
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
