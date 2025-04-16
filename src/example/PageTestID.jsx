import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams, Link } from "react-router-dom";

const fetchPostsID = async ({ queryKey }) => {
  const [_key, { dataId }] = queryKey;
  const data = await axios.get(`https://fakestoreapi.com/products/${dataId}`);
  return data.data;
};

const PageTestID = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", { dataId: id }],
    queryFn: fetchPostsID,
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data {error.message}</p>;

  return (
    <div className=" p-4">
      <div className="mb-4">
        <Link to={-1} className="btn btn-sm btn-outline"> กลับ</Link>
      </div>
      <div>ข้อมูลของ รหัส {id}</div>
      <div>หัวข้อ {data.title}</div>
      <div>รายละเอียด {data.description}</div>
      <div>ราคา {data.price}</div>
      <div>เรท {data.rating.rate}</div>
      <div>การนับ {data.rating.count}</div>
      <div>หมวดหมู่ {data.category}</div>
    </div>
  );
};

export default PageTestID;
