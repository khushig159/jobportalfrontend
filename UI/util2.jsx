// utils/api/FetchConnectionData.js

const FetchConnectionData = async ({
    setConnections,
    setSentRequests,
    setIncomingRequests,
  }) => {
    try {
      const [connRes, sentRes, incomingRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/seeker/connections`, {
          credentials: "include",
        }),
        fetch(`${import.meta.env.VITE_API_URL}/seeker/getsendrequests`, {
          credentials: "include",
        }),
        fetch(`${import.meta.env.VITE_API_URL}/seeker/getConnectionrequests`, {
          credentials: "include",
        }),
      ]);
  
      const connData = await connRes.json();
      const sentData = await sentRes.json();
      const incomingData = await incomingRes.json();
  
      if (!connRes.ok)
        throw new Error(connData.err || "Failed to fetch connections");
      if (!sentRes.ok)
        throw new Error(sentData.err || "Failed to fetch sent requests");
      if (!incomingRes.ok)
        throw new Error(
          incomingData.err || "Failed to fetch incoming requests"
        );
  
      setConnections(connData.connection);
      setSentRequests(sentData.sendRequests);
      setIncomingRequests(incomingData.connectionreq);
  
      // console.log("Fetched connections:", connData.connection);
      // console.log("Fetched sent requests:", sentData.sendRequests);
      // console.log("Fetched incoming:", incomingData.connectionreq);
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };
  
  export default FetchConnectionData;
  