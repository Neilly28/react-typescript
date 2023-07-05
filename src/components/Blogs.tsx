import { useState } from "react";

interface Blog {
  title: string;
  body: string;
  author: string;
  id: number;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      title: "my new website",
      body: "  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi sit illo nulla, recusandae expedita, dolor excepturi pariatur minus quae iste corrupti natus delectus error tempora minima consectetur veritatis quam omnis?",
      author: "mario",
      id: 1,
    },
    {
      title: "welcome party",
      body: "  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi sit illo nulla, recusandae expedita, dolor excepturi pariatur minus quae iste corrupti natus delectus error tempora minima consectetur veritatis quam omnis?",
      author: "yoshi",
      id: 2,
    },
    {
      title: "my web dev tips",
      body: "  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi sit illo nulla, recusandae expedita, dolor excepturi pariatur minus quae iste corrupti natus delectus error tempora minima consectetur veritatis quam omnis?",
      author: "mario",
      id: 3,
    },
  ]);

  //   handledelete
  const handleDelete = (id: number) => {
    const filteredBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(filteredBlogs);
  };

  return (
    <div>
      {blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <h1>{blog.title}</h1>
            <p>{blog.body}</p>
            <span>{blog.id}</span>
            <button onClick={() => handleDelete(blog.id)}>delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
