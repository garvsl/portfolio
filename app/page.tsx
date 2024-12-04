/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import Home from "@/components/Home/page";

async function getPackages() {
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
    const result = await response.text();
    const context = result.slice(
      result.search("window.__context__") + "window.__context__".length + 2
    );
    const obj = context.slice(0, context.search("</script>"));
    const objJson = JSON.parse(obj);
    let packages = objJson.context.packages.objects;
    packages = packages.map((e: any) => {
      return {
        id: e.id,
        title: e.name,
        link: `https://www.npmjs.com/package/${e.name}`,
      };
    });
    return packages;
  } catch (e) {
    console.log("packages erorr", e);
    return [];
  }
}

async function getBlogs() {
  try {
    const response = await fetch("https://blog.garvsl.com/", {
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
    const result = await response.text();
    const split = result.split(`"mediumUrl":"`);
    split.shift();
    const blogs = split.map((e) => {
      const link = JSON.parse(`"${e.slice(0, e.indexOf(`"`))}"`);
      return {
        id: link.slice(link.lastIndexOf("-") + 1),
        link: link,
        title: link.slice(link.lastIndexOf("/") + 1, link.lastIndexOf("-")),
      };
    });

    return blogs;
  } catch (e) {
    console.log("packages erorr", e);
    return [];
  }
}

async function getHackathons() {
  try {
    const response = await fetch("https://devpost.com/garvsl", {
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

async function getProjects() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-Auth-Email", `${process.env.CLOUDFLARE_EMAIL}`);
  myHeaders.append("Authorization", `Bearer ${process.env.CLOUDFLARE_API}`);

  const requestOptions: any = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE}/dns_records`,
      requestOptions
    );
    const result = await response.json();
    const projects = result.result
      .filter((e: any) => {
        return e.type == "CNAME";
      })
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
      packages={await getPackages()}
      projects={await getProjects()}
      blogs={await getBlogs()}
      hackathons={await getHackathons()}
    />
  );
}
