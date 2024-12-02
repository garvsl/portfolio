"use client";
import { useState } from "react";
import { BsArrow90DegDown, BsArrow90DegUp } from "react-icons/bs";
import { RiEmotionSadLine } from "react-icons/ri";

export const ProjectDisplay = ({ items }: { items: any }) => {
  const [show, setShow] = useState(3);

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
        items.slice(0, show).map((e: any) => (
          <a target="_blank" key={e.id} href={e.link}>
            <li className="border rounded p-1 text-xs hover:bg-white hover:text-black truncate">
              {e.title}
            </li>
          </a>
        ))}
      {show < items.length ? (
        <li
          onClick={() => setShow((e) => e + 3)}
          className="border rounded p-1 text-xs cursor-pointer hover:bg-white hover:text-black truncate"
        >
          <BsArrow90DegDown />
        </li>
      ) : (
        show > 3 && (
          <li
            onClick={() => setShow(3)}
            className="border rounded p-1 text-xs cursor-pointer hover:bg-white hover:text-black truncate"
          >
            <BsArrow90DegUp />
          </li>
        )
      )}
    </>
  );
};
