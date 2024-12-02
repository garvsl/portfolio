/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { SiLinkedin, SiGithub, SiDevpost } from "react-icons/si";
import { ProjectDisplay } from "./ProjectDisplay";

const Container = ({ text, children }: { text: string; children: any }) => {
  return (
    <div>
      <h2>{text}</h2>
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
              <e.icon className="h-3 w-3 hover:fill-white hover:text-black" />
            </li>
          </a>
        ))}
    </>
  );
};

export default function Home({ packages, blogs }: any) {
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
  ];

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
          <ProjectDisplay items={blogs} />
        </ul>
      </Container>
      <Container text={"Hackathons"}>
        <ul className="flex flex-col gap-1   max-w-44">
          <ProjectDisplay items={[]} />
        </ul>
      </Container>
      <Container text={"Experience"}>
        <ul className="flex flex-col gap-1   max-w-44">
          <ProjectDisplay items={[]} />
        </ul>
      </Container>
      <Container text={"Education"}>
        <ul className="flex flex-col gap-1   max-w-44">
          <ProjectDisplay items={[]} />
        </ul>
      </Container>
    </div>
  );
}
