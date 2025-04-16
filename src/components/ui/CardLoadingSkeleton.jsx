const CardLoadingSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <tr key={index}>
          <td>
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          </td>
          <td>
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          </td>
          <td>
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          </td>
          <td>
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          </td>
          <td>
            <div className="h-4 bg-gray-300 rounded animate-pulse "></div>
          </td>
          <td>
          <div className="h-4 bg-gray-300 rounded animate-pulse "></div>
          </td>
          <td>
          <div className="h-4 bg-gray-300 rounded animate-pulse "></div>
          </td>
          <td>
          <div className="h-4 bg-gray-300 rounded animate-pulse "></div>
          </td>
          <td>
          <div className="h-4 bg-gray-300 rounded animate-pulse "></div>
          </td>
          <td>
          <div className="h-4 bg-gray-300 rounded animate-pulse "></div>
          </td>
          <td>
          <div className="h-4 bg-gray-300 rounded animate-pulse "></div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default CardLoadingSkeleton;
