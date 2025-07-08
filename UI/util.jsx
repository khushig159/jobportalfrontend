export  default async function PerformJobAction  ({ url, method,updateClassState, successCallback, updateStateCallback, jobId }) {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error(data.error || "Something went wrong.");
        return;
      }
  
      // Handle specific status codes
      if (response.status === 401) {
        console.log("Job not found");
        return;
      }
      if (response.status === 404) {
        console.log("User not found, try logging in");
        return;
      }
  
      if (successCallback) successCallback(data);
      if (updateStateCallback) updateStateCallback(prev => prev.filter(job => job._id !== jobId));
      if(updateClassState) updateClassState(prev=>!prev)
    } catch (error) {
      console.error("Job action error:", error);
      console.log("Something went wrong.");
    }
  };
  
  