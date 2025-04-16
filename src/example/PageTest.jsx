import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchPosts = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data;
};

const PageTest = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div>
        
      <div className=" p-4">
        {data.map((post, index) => (
          <p key={post.id}>
            <Link to={`/api/${post.id}`} className=" hover:underline">
              ข้อที่ {index + 1} {post.title} รหัส : {post.id}
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
};

export default PageTest;
