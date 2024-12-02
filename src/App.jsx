import { useEffect, useState } from "react";
import { BiArrowToRight, BiMinusBack } from "react-icons/bi";
import { BsArrow90DegDown, BsArrow90DegUp } from "react-icons/bs";
import { CgMore, CgMoreVertical } from "react-icons/cg";
import { DiLess } from "react-icons/di";
import { FcEmptyBattery, FcEmptyTrash } from "react-icons/fc";
import { GrMore } from "react-icons/gr";
import { MdMoreHoriz, MdMoreTime } from "react-icons/md";
import { PiPlus } from "react-icons/pi";
import { RiEmotionHappyLine, RiEmotionSadLine } from "react-icons/ri";
import { SiDevpost, SiGithub, SiLinkedin } from "react-icons/si";

/* eslint-disable react/prop-types */
const Container = ({ text, children }) => {
  return (
    <div>
      <h2>{text}</h2>
      {children}
    </div>
  );
};

const IconDisplay = ({ items }) => {
  return (
    <>
      {items &&
        items.map((e) => (
          <a target="_blank" key={e.id} rel="noreferrer" href={e.link}>
            <li>
              <e.icon className="h-3 w-3 hover:fill-neutral-950" />
            </li>
          </a>
        ))}
    </>
  );
};

const ProjectDisplay = ({ items }) => {
  const [show, setShow] = useState(3);

  if (items.length == 0) {
    return (
      <li className="border rounded p-1 text-xs cursor-not-allowed hover:bg-neutral-950 truncate">
        <RiEmotionSadLine />
      </li>
    );
  }

  return (
    <>
      {items &&
        items.slice(0, show).map((e) => (
          <a target="_blank" key={e.id} href={e.link}>
            <li className="border rounded p-1 text-xs hover:bg-neutral-950 truncate">
              {e.title}
            </li>
          </a>
        ))}
      {show < items.length ? (
        <li
          onClick={() => setShow((e) => e + 3)}
          className="border rounded p-1 text-xs cursor-pointer hover:bg-neutral-950 truncate"
        >
          <BsArrow90DegDown />
        </li>
      ) : (
        show > 3 && (
          <li
            onClick={() => setShow(3)}
            className="border rounded p-1 text-xs cursor-pointer hover:bg-neutral-950 truncate"
          >
            <BsArrow90DegUp />
          </li>
        )
      )}
    </>
  );
};

function App() {
  const [packages, setPackages] = useState([]);

  const socials = [
    {
      id: 1,
      icon: SiLinkedin,
      link: "https://www.linkedin.com/in/garvsl/",
    },
    { id: 2, icon: SiGithub, link: "https://github.com/garvsl" },
    { id: 3, icon: SiDevpost, link: "https://devpost.com/garvsl" },
  ];

  const projects = [
    {
      id: 1,
      title: "Crowdwrap",
      icon: SiLinkedin,
      link: "https://crowdwrap.garvsl.com",
    },
    {
      id: 2,
      title: "HealthHoppers",
      icon: SiGithub,
      link: "https://healthhoppers.garvsl.com",
    },
    {
      id: 3,
      title: "Relyvin",
      icon: SiDevpost,
      link: "https://relyvin.garvsl.com",
    },
    {
      id: 4,
      title: "Doodoo",
      icon: SiDevpost,
      link: "https://relyvin.garvsl.com",
    },
    {
      id: 5,
      title: "foodoo",
      icon: SiDevpost,
      link: "https://relyvin.garvsl.com",
    },
    {
      id: 6,
      title: "roodoo",
      icon: SiDevpost,
      link: "https://relyvin.garvsl.com",
    },
    {
      id: 7,
      title: "loodoo",
      icon: SiDevpost,
      link: "https://relyvin.garvsl.com",
    },
  ];

  useEffect(() => {
    const getPackages = async () => {
      try {
        const response = await fetch("https://www.npmjs.com/~garvsl", {
          cache: "default",
          credentials: "include",
          headers: {
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "User-Agent":
              "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
          },
          method: "GET",
          mode: "cors",
          redirect: "follow",
          referrerPolicy: "strict-origin-when-cross-origin",
        });
        // const result = response.json();
        console.log(response);
      } catch (e) {
        console.log("packages erorr", e);
      }
    };
    getPackages();
  }, []);

  return (
    <div className="p-2 flex flex-col gap-2">
      <Container text={"Garvsl"}>
        <ul className="flex flex-row gap-1 pl-0.5  w-min">
          <IconDisplay items={socials} />
        </ul>
      </Container>
      <Container text={"Live Projects"}>
        <ul className="flex flex-col gap-1   max-w-44">
          <ProjectDisplay items={projects} />
        </ul>
      </Container>
      <Container text={"Packages"}>
        <ul className="flex flex-col gap-1   max-w-44">
          <ProjectDisplay items={packages} />
        </ul>
      </Container>
      <Container text={"Blogs"}>
        <ul className="flex flex-col gap-1   max-w-44">
          <ProjectDisplay items={[]} />
        </ul>
      </Container>
    </div>
  );
}

export default App;
