import React, { useEffect, useState } from "react";
import axios from "axios";

const ListPost = () => {
    const [posts, setPosts] = useState([]);
    const [sortOption, setSortOption] = useState("published_at");
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
  
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `https://suitmedia-backend.suitdev.com/api/ideas`,
          {
            params: {
              "page[number]": currentPage,
              "page[size]": perPage,
              append: ["small_image", "medium_image"],
              sort: sortOption,
            },
          }
        );
        console.log("API Response:", response.data);
        setPosts(response.data.data);
        setTotalItems(response.data.meta.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    useEffect(() => {
      fetchPosts();
    }, [currentPage, perPage, sortOption]);
  
    const handleSortChange = (event) => {
      setSortOption(event.target.value);
      setCurrentPage(1); 
    };
  
    const handlePerPageChange = (event) => {
      setPerPage(Number(event.target.value));
      setCurrentPage(1);
    };
  
    const startItem = (currentPage - 1) * perPage + 1;
    const endItem = Math.min(currentPage * perPage, totalItems);
    
    const totalPages = Math.ceil(totalItems / perPage);

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const generatePageRange = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    };

    const pageRange = generatePageRange(
    Math.max(1, currentPage - 2),
    Math.min(totalPages, currentPage + 2)
    );

    return (
    <section className="bg-white py-10 px-10 lg:px-20 lg:mx-20">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0 text-neutral-600 text-center sm:text-left">
                Showing {startItem}-{endItem} of {totalItems}
            </div>
            <div className="flex items-center justify-center sm:justify-end">
              <label className="text-md font-medium text-gray-900 mx-2 hidden sm:block">
                Items Per Page:
              </label>
              <select
                className="bg-gray-50 rounded-3xl border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-2"
                value={perPage}
                onChange={handlePerPageChange}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>

              <label className="text-md font-medium text-gray-900 mx-2 hidden sm:block">
                Sort By:
              </label>
              <select
                className="bg-gray-50 rounded-3xl border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-2"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="published_at">Newest</option>
                <option value="-published_at">Oldest</option>
              </select>
            </div>
        </div>
      <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => {
            const formattedDate = new Date(post.published_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            });

            const smallImage = post.small_image && post.small_image.length > 0 ? post.small_image[0] : null;

            return (
                <div
                  key={post.id}
                  className="my-8 rounded-lg shadow-lg shadow-gray-200 bg-white duration-300 hover:-translate-y-1"
                >
                  <a href={post.link} className="cursor-pointer">
                    <figure>
                    {smallImage && (
                      <img
                        src={`${smallImage.url}?auto=format&fit=crop&w=400&q=50`}
                        alt={post.title}
                        className="rounded-t h-72 w-full object-cover"
                        loading="lazy"
                      />
                      )}
                      <figcaption className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <p className="text-sm text-gray-500">{formattedDate}</p> 
                        </div>
                        <p className="text-lg font-bold leading-relaxed text-black text-left line-clamp-3 mb-4">
                          {post.title}
                        </p>
                      </figcaption>
                    </figure>
                  </a>
                </div>
            );
        })}
        </div>
        <nav className="flex justify-center mt-4">
            <ul className="list-style-none flex">
                <li>
                <a
                    className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 ${
                    currentPage === 1 ? "cursor-not-allowed" : "hover:cursor-pointer"
                    }`}
                    href="#"
                    aria-label="Previous"
                    onClick={() => {
                    if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                    }
                    }}
                >
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                {pageRange.map((pageNumber) => (
                <li key={pageNumber}>
                    <a
                    className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 ${
                        pageNumber === currentPage ? "font-bold" : ""
                    }`}
                    href="#"
                    onClick={() => setCurrentPage(pageNumber)}
                    >
                    {pageNumber}
                    </a>
                </li>
                ))}
                <li>
                <a
                    className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100e ${
                    currentPage === totalPages ? "cursor-not-allowed" : "hover:cursor-pointer"
                    }`}
                    href="#"
                    aria-label="Next"
                    onClick={() => {
                    if (currentPage < totalPages) {
                        setCurrentPage(currentPage + 1);
                    }
                    }}
                >
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
        </nav>
    </section>
  );
};

export default ListPost;
