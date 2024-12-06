export const fetcher = (...args: [RequestInfo, RequestInit?]) => 
  fetch(...args).then(res => res.json());

// update fetcher to be reusable and dynamic typing for request info

// export const fetcher = async (url: string) => {
//   const res = await fetch(url)
//   if (!res.ok) {
//     throw new Error('An error occurred while fetching the data.')
//   }
//   return res.json()
// }

