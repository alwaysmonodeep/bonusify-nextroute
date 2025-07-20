import WhyBonusify from "@/components/Whybonusify";
import Image from "next/image";
import React from "react";

const blogs = [
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    link: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    title: "Exploring the Mountains",
    content: "Join me on an adventure.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=600&q=80",
    link: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    title: "City Lights Adventure",
    content: "Join me on an adventure.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    link: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    title: "A Day at the Beach",
    content: "Join me on an adventure.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    link: "https://www.youtube.com/watch?v=3fumBcKC6RE",
    title: "Forest Camping Vlog",
    content: "Join me on an adventure.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
    link: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    title: "Road Trip Diaries",
    content: "Join me on an adventure.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80",
    link: "https://www.youtube.com/watch?v=VYOjWnS4cMY",
    title: "Food Tasting Around Town",
    content: "Join me on an adventure.",
  },
]; //rought data for blogs
export default function Blog() {
  return (
    <div className="xl:mx-15 md:mx-5 mx-2 my-4 md:my-8">
      {/*Hero Blog*/}
       <div>
        <Image
          src={
            "https://asset20.ckassets.com/resources/image/slider_images/ck-storepage-v2/segment/desktop-slider5-1748490751.png"
          }
          width={700}
          height={180}
          className=" h-60 xl:h-90"
        />
      {/* </a> */}</div>

      <h2 className="text-3xl ml-4 py-5">Blogs</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 xl:gap-8">
        {blogs.map((blog, idx) => (
          <a
            href={blog.link}
            target="_blank"
            rel="noopener noreferrer"
            key={idx}
            className="bg-white rounded-2xl shadow-lg p-1 flex flex-col hover:shadow-2xl transition"
          >
            <Image
              src={blog.image}
              alt={blog.title}
              width={500}
              height={180}
              className="rounded-xl h-40 md:h-50 xl:h-70 object-cover"
            />
            <h4 className="font-bold my-2 mx-3 text-lg">{blog.title}</h4>
            <div className="mx-3 mb-2 flex justify-between">
              <p>{blog.content}</p>
              <span>&rarr;</span>
            </div>
          </a>
        ))}
      </div>
      <div className="my-8 ">
        <WhyBonusify/>
      </div>
    </div>
  );
}
