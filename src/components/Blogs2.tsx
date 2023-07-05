import { useState } from "react";

interface Blog {
  title: string;
  body: string;
  author: string;
  id: number;
}

const Blogs2 = () => {
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

  //   title state
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [author, setAuthor] = useState<string>("anonymous");

  //   handlesubmit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBlogs([...blogs, { title, body, author, id: blogs.length + 1 }]);
  };

  //   handleDelete
  const handleDelete = (id: number) => {
    const filteredBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(filteredBlogs);
  };

  return (
    <div>
      <h1>my blog</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">title</label>
        <input
          value={title}
          type="text"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="">body</label>
        <textarea
          value={body}
          required
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <select onChange={(e) => setAuthor(e.target.value)}>
          <option value="anonymous">choose author</option>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        <button>Submit Blog</button>
      </form>
      {blogs.map((blog) => {
        const { title, body, author, id } = blog;
        return (
          <div key={id}>
            <p>{id}</p>
            <h2>{title}</h2>
            <p>{body}</p>
            <span>by: {author}</span>
            <button onClick={() => handleDelete(id)}>delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Blogs2;
