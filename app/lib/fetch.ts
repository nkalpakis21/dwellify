export const fetcher = (...args: [RequestInfo, RequestInit?]) => 
  fetch(...args).then(res => res.json());

// update fetcher to be reusable and dynamic typing for request info