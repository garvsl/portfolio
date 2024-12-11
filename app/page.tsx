/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import Home from "@/components/Home/page";

const headers: any = {
  cache: "default",
  credentials: "omit",
  headers: {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
    "Cache-Control": "public, max-age=300",
  },
  method: "GET",
  mode: "cors",
  redirect: "follow",
  referrerPolicy: "no-referrer-when-downgrade",
};

async function getPackages(user: string) {
  try {
    const response = await fetch(`https://www.npmjs.com/~${user}`, headers);
    const result = await response.text();
    const context = result.slice(
      result.search("window.__context__") + "window.__context__".length + 2
    );
    const obj = context.slice(0, context.search("</script>"));
    const objJson = JSON.parse(obj);
    let packages = objJson.context.packages.objects;
    packages = packages
      .map((e: any) => {
        return {
          id: e.id,
          title: e.name,
          link: `https://www.npmjs.com/package/${e.name}`,
        };
      })
      .reverse();
    return packages;
  } catch (e) {
    console.log("packages erorr", e);
    return [];
  }
}

async function getBlogs(site: string) {
  try {
    const response = await fetch(`${site}`, headers);
    const result = await response.text();
    const split = result.split(`"mediumUrl":"`);
    split.shift();
    const blogs = split.map((e) => {
      const link = JSON.parse(`"${e.slice(0, e.indexOf(`"`))}"`);
      return {
        id: link.slice(link.lastIndexOf("-") + 1),
        link: link,
        title: link
          .slice(link.lastIndexOf("/") + 1, link.lastIndexOf("-"))
          .split("-")
          .join(" "),
      };
    });

    return blogs;
  } catch (e) {
    console.log("packages erorr", e);
    return [];
  }
}

async function getHackathons(user: string) {
  try {
    const response = await fetch(`https://devpost.com/${user}`, headers);

    const result = await response.text();
    const split = result.split(`data-software-id`);
    split.shift();
    const hackathons = split.map((e) => {
      const hack = e.slice(0, e.indexOf("<!-- cache end -->"));
      const title = hack
        .slice(hack.indexOf("<h5>") + 4, hack.indexOf("</h5>"))
        .trim();
      const winner = hack.includes("Winner");
      return {
        id: e.slice(2, e.indexOf(`">`)),
        link: e.slice(
          e.indexOf("href") + 6,
          e.indexOf(`">`, e.indexOf("href") + 5)
        ),
        title: winner ? title + " - Winner" : title,
      };
    });
    return hackathons;
  } catch (e) {
    console.log("packages erorr", e);
    return [];
  }
}

async function getProjects(
  email: string | undefined,
  api: string | undefined,
  zone: string | undefined
) {
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
  return (
    <Home
      packages={await getPackages("garvsl")}
      projects={await getProjects(
        process.env.CLOUDFLARE_EMAIL,
        process.env.CLOUDFLARE_API,
        process.env.CLOUDFLARE_ZONE
      )}
      blogs={await getBlogs("https://blog.garvsl.com")}
      hackathons={await getHackathons("garvsl")}
    />
  );
}
