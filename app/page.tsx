/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import Home from "@/components/Home/page";
import { getHackathons } from "get-hackathons";
import { getMedium } from "get-medium";
import { getPackages } from "get-npm-packages";

async function getProjects(email: string, api: string, zone: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-Auth-Email", `${email}`);
  myHeaders.append("Authorization", `Bearer ${api}`);

  const requestOptions: any = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
      requestOptions
    );
    const result = await response.json();
    const projects = result?.result
      .filter((e: any) => {
        return e.type == "CNAME" && e.name != "www." + e.zone_name;
      })
      .reverse()
      .map((e: any) => {
        const title = e.name.slice(0, e.name.indexOf("."));
        return {
          id: e.id,
          link: "https://" + e.name,
          title: title.charAt(0).toUpperCase() + title.slice(1),
        };
      });
    return projects;
  } catch (error) {
    console.error(error);
  }
}

export default async function Page() {
  const hackathons = (await getHackathons("garvsl")).hackathons.map((e) => {
    return {
      ...e,
      title: e.winner ? e.title + " - Winner" : e.title,
    };
  });

  const blogs = (await getMedium("garvsl")).map((e) => {
    return {
      id: e.id,
      title: e.title,
      link: e.mediumUrl,
    };
  });

  return (
    <Home
      packages={(await getPackages("garvsl")).packages}
      projects={await getProjects(
        process.env.CLOUDFLARE_EMAIL!,
        process.env.CLOUDFLARE_API!,
        process.env.CLOUDFLARE_ZONE!
      )}
      blogs={blogs}
      hackathons={hackathons}
    />
  );
}
