// import React, { useEffect, useState } from 'react';
// import Blog from './blog';
// import axios from 'axios';

// const BlogPage = () => {

//   let [allpost,setAllPost] = useState([])
//   let [page, setPage] = useState(1);
//   const handleNext = () => setPage((prev) => prev + 1);
//   const handlePrev = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));
// // let pg =3
//   useEffect(()=>{
//       axios.get(`http://localhost:3000/get-post/`)
//       .then((post)=>{
//          setAllPost(post.data)
//       })
//       .catch((err)=>{console.log(err)})
//     console.log(allpost)

//   },[])
 

//   // console.log(`this is all post${allpost}`)

//   return (
//     <>
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//     {allpost.length > 0 && allpost.map((pst)=>(
//       <Blog key={pst._id}
//             //  image={pst.post_pic}
//             //   title={pst.title}
//             //   about={pst.about}
//             {...pst}
//       />
//     ))}
//     </div>
//      <div className="mt-8 flex justify-center space-x-4">
//         <button 
//           onClick={handlePrev} 
//           className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:bg-gray-300"
//           disabled={page === 1} // disable prev if on first page
//         >
//           Prev
//         </button>
//         <button 
//           onClick={handleNext} 
//           className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
//         >
//           Next
//         </button>
//       </div>
//    </>
//   );
// };

// export default BlogPage;




// import React, { useEffect, useState } from 'react';
// import Blog from './blog';
// import axios from 'axios';

// const BlogPage = () => {
//   let [allpost, setAllPost] = useState([]);
//   let [page, setPage] = useState(1);
//   let [totalPost,setTotalPost] = useState(0);
//    let [hasMore,setHasMore] = useState(true)

//   const handleNext = () => setPage((prev) =>hasMore? prev + 1 : prev);
//   const handlePrev = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

//   useEffect(() => {
//     let data=axios.get(`http://localhost:3000/get-post/?page=${page}`)
//       .then((response) => {
//         // setAllPost(pst.data.post);
//         const postData = response.data;
//       setAllPost(postData.posts);
//       setTotalPost(postData.totalPosts)
//       setHasMore(postData.hasMore);  // Use the hasMore value from the response
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     // console.log(data);
//   }, [page]);

//   console.log(totalPost)
//   return (
//     <>
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {allpost.length > 0 &&
//             allpost.map((pst) => (
//               <Blog key={pst._id} {...pst} />
//             ))}
//         </div>

//         <div className="mt-8 flex justify-center space-x-4">
//           <button
//             onClick={handlePrev}
//             className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:bg-gray-300"
//             disabled={page === 1}
//           >
//             Prev
//           </button>
//           <button
//             onClick={handleNext}
//             className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600   disabled:bg-gray-300" 
//             disabled={!hasMore}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BlogPage;


// import React, { useEffect, useState } from 'react';
// import Blog from './blog';
// import axios from 'axios';

// const BlogPage = () => {
//   let [allpost, setAllPost] = useState([]);
//   let [page, setPage] = useState(1);
//   let [totalPost, setTotalPost] = useState(0);
//   let [hasMore, setHasMore] = useState(true);
//   let [filter, setFilter] = useState('');  // New filter state
//   let [genre, setGenre] = useState('');  // New state for genre
//   let [title, setTitle] = useState('');
//   let [author, setAuthor] = useState('');
//   const [isSearchExecuted, setIsSearchExecuted] = useState(false);
  
//   // Handle filter changes
//   const handleSearch = (e) => {
//     console.log(e)
//     // if(e.title || e.genre || e.author){
//       setFilter(e);
//       setIsSearchExecuted(true)
//     setPage(1);  // Reset to the first page when filter changes
//     // }
    
//   };

//   const handleNext = () => setPage((prev) => (hasMore ? prev + 1 : prev));
//   const handlePrev = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

//   useEffect(() => {
//     // if(isSearchExecuted){
//     axios
//       .get(`http://localhost:3000/get-post/?page=${page}&title=${title}&genre=${genre}&author=${author}`)
//       .then((response) => {
//         console.log(response)
//         const postData = response.data;
//         setAllPost(postData.posts);
//         setTotalPost(postData.totalPosts);
//         setHasMore(postData.hasMore);  // Use the hasMore value from the response
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(()=>{
//         setIsSearchExecuted(false)
//       })
//     // }
//   }, [page, setIsSearchExecuted]);  // Re-run when page or filter changes

//   return (
//     <>
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Filter Section */}
        
//         {/* Search Section */}
//         <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Search by Genre"
//             value={genre}
//             onChange={(e) => setGenre(e.target.value)}
//             className="w-full sm:w-auto p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <input
//             type="text"
//             placeholder="Search by Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full sm:w-auto p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <input
//             type="text"
//             placeholder="Search by Author"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//             className="w-full sm:w-auto p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <button
//             type="submit"
//             className="w-full sm:w-auto bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-600"
//           >
//             Search
//           </button>
//         </form>

//         {/* Blog Post Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {allpost.length > 0 &&
//             allpost.map((pst) => <Blog key={pst._id} {...pst} />)}
//         </div>

//         {/* Pagination Buttons */}
//         <div className="mt-8 flex justify-center space-x-4">
//           <button
//             onClick={handlePrev}
//             className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:bg-gray-300"
//             disabled={page === 1}
//           >
//             Prev
//           </button>
//           <button
//             onClick={handleNext}
//             className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:bg-gray-300"
//             disabled={!hasMore}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BlogPage;


//************************************************************************************************************************************ */


import React, { useEffect, useState,useContext } from 'react';
import Blog from './blog';
import axios from 'axios';
import {AuthContext} from '../contetxApi/contetx'


const BlogPage = () => {
    const {globatTitl,setGlobalTitl} = useContext(AuthContext) 

  let [allpost, setAllPost] = useState([]);
  let [page, setPage] = useState(1);
  let [totalPost, setTotalPost] = useState(0);
  let [hasMore, setHasMore] = useState(true);
  let [genre, setGenre] = useState('');  // New state for genre
  let [title, setTitle] = useState('');
  // let [t, ] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);  // New state to trigger API call

  // Fetch initial data when the component mounts
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/get-post/?page=${page}`);
  //       const postData = response.data;
  //       setAllPost(postData.posts);
  //       setTotalPost(postData.totalPosts);
  //       setHasMore(postData.hasMore);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchData();
  // }, [page]);  // Empty dependency array ensures this runs only once

  // Handle filter changes and search
  const handleSearch = (e) => {
    e.preventDefault();  // Prevent default form submission
    setPage(1);  // Reset to the first page when filter changes
    // console.log(e)
    setGlobalTitl(title)
    setShouldFetch(true);  // Set the trigger state to true
  };

  const handleNext = () => setPage((prev) => (hasMore ? prev + 1 : prev));
  const handlePrev = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    // if (shouldFetch) {  // Only fetch if shouldFetch is true
      axios
        .get(`http://localhost:3000/get-post/?page=${page}&title=${globatTitl}&genre=${genre}`)
        .then((response) => {
          const postData = response.data;
          setAllPost(postData.posts);
          setTotalPost(postData.totalPosts);
          setHasMore(postData.hasMore);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setShouldFetch(false);  // Reset the trigger state
          // setTitle('');
        });
    // }
  }, [page, globatTitl]);  // Now only runs when page or shouldFetch changes

  return (
    
    <>


      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          {/* <input
            type="text"
            placeholder="Search by Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full sm:w-auto p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          /> */}
          <input
            type="text"
            placeholder="Search by Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full sm:w-auto p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {/* <input
            type="text"
            placeholder="Search by Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full sm:w-auto p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          /> */}
          <button
            type="submit"
            className="w-full sm:w-auto bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-600"
          >
            Search
          </button>
        </form>
{/* 
        Blog Post Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allpost.length > 0 &&
            allpost.map((pst) => <Blog key={pst._id} {...pst} />)}
        </div>

         {/* if no data found  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {allpost.length > 0 ? (
    allpost.map((pst) => <Blog key={pst._id} {...pst} />)
  ) : (
    <div className="col-span-3 text-center text-xl font-bold text-red-500 py-8">
      No data found
    </div>
  )}
</div>

        {/* Pagination Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:bg-gray-300"
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:bg-gray-300"
            disabled={!hasMore}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
