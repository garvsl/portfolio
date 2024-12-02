"use server";
import Home from "@/components/Home";
/* eslint-disable react/prop-types */

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
        Priority: "u=0, i",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0.1 Safari/605.1.15",
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

export default async function Page() {
  return <Home packages={await getPackages()} blogs={await getBlogs()} />;
}
