/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { SiLinkedin, SiGithub, SiDevpost } from "react-icons/si";
// import { SiLinkedin, SiGithub, SiDevpost } from "react-icons/si";
import { ProjectDisplay } from "../Projects/page";

const Container = ({
  text,
  children,
  size = "text-[clamp(1.1rem,2.3vw,1.2rem)] font-medium",
}: {
  text: string;
  children: any;
  size?: any;
}) => {
  return (
    <div>
      <h2 className={size}>{text}</h2>
      {children}
    </div>
  );
};

const IconDisplay = ({ items }: { items: any }) => {
  return (
    <>
      {items &&
        items.map((e: any) => (
          <a target="_blank" key={e.id} rel="noreferrer" href={e.link}>
            <li>
              <e.icon className=" hover:fill-slate-500  hover:text-black" />
            </li>
          </a>
        ))}
    </>
  );
};

export default function Home({ packages, projects, blogs, hackathons }: any) {
  const socials = [
    {
      id: 1,
      icon: SiLinkedin,
      link: "https://www.linkedin.com/in/garvsl/",
    },
    { id: 2, icon: SiGithub, link: "https://github.com/garvsl" },
    { id: 3, icon: SiDevpost, link: "https://devpost.com/garvsl" },
  ];

  return (
    <div className="p-2">
      <div className="p-2 px-4 flex flex-col    gap-4">
        <div className="text-[clamp(2rem,2.3vw,2.3rem)]  flex items-center gap-4">
          <h2
            // style={{
            //   fontSize: "30px",
            // }}
            className="font-medium text-4xl"
          >
            GARVSL
          </h2>
          <ul className="flex flex-row gap-2  w-min">
            <IconDisplay items={socials} />
          </ul>
        </div>
        <Container text={"LIVE PROJECTS"}>
          <ul className="flex flex-col ">
            <ProjectDisplay items={projects} />
          </ul>
        </Container>
        <Container text={"PACKAGES"}>
          <ul className="flex flex-col ">
            <ProjectDisplay items={packages} />
          </ul>
        </Container>
        <Container text={"BLOGS"}>
          <ul className="flex flex-col ">
            <ProjectDisplay items={blogs} />
          </ul>
        </Container>
        <Container text={"HACKATHONS"}>
          <ul className="flex flex-col    ">
            <ProjectDisplay items={hackathons} />
          </ul>
        </Container>
        {/* <Container text={"Experience"}>
        <ul className="flex flex-col gap-1   max-w-44">
          <ProjectDisplay items={[]} />
        </ul>
      </Container>
      <Container text={"Education"}>
        <ul className="flex flex-col gap-1   max-w-44">
          <ProjectDisplay items={[]} />
        </ul>
      </Container> */}
      </div>
    </div>
  );
}
