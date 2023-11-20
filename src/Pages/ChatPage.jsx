import React, { useEffect, useState } from 'react';
import ChatSidebar from '../Components/chat/ChatSidebar';
import Wrapper from '../Components/Wrapper';
import Chat from '../Components/chat/Chat';
import AC from 'agora-chat'; 

// const appKey = '711053320#1230842';
// const adminId = '653f48c6fd4d0902fb080ac6';
// const agoraToken = '007eJxSYIiPPpKRU2b8PicsOuB7u3rgivbPjfpa+gsO72r2bVS+lqnAkGZhZppqYmFsamFiZJJilpZoZm6aaGlsZJBmmGqWaGTk9Mk39ZCzf2rNU3lWRgZWBkYGRgYQX4LBzNQ4zcQi2SwtxSTFwNLAKC3JwMIgMdkMEAAA//+pIiVT';

const ChatPage = () => {
  const [groupInfo, setGroupInfo] = useState([]);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [conn, setConn] = useState(null);

  useEffect(() => {
    // Fetch adminId from local storage
    const adminId = localStorage.getItem("service_providerId");

    // Fetch token from API
    const fetchTokenFromApi = async () => {
      try {
        const response = axios.get
        ("https://qdn2l2ng-5050.inc1.devtunnels.ms/app/user/agora-token/"+adminId);
        

        const data = await response.json();
        const apiToken = data.token; // Replace with the actual property from your API response
        console.log(agoraToken)
        setToken(apiToken);

        const newConn = new AC.connection({
          appKey: "<Your app key>",
        });

        newConn.addEventHandler("connection&message", {
          onConnected: () => {
            // Handle onConnected event
          },
          onDisconnected: () => {
            // Handle onDisconnected event
          },
          onTextMessage: (message) => {
            // Handle onTextMessage event
          },
          onTokenWillExpire: (params) => {
            // Handle onTokenWillExpire event
          },
          onTokenExpired: (params) => {
            // Handle onTokenExpired event
          },
          onError: (error) => {
            console.log("on error", error);
          },
        });

        setConn(newConn);

        // Open the connection
        newConn.open({
          user: adminId,
          agoraToken: apiToken,
        });
      } catch (error) {
        console.error("Error fetching token from API", error);
      }
    };

    if (adminId) {
      // If adminId is present in local storage, fetch the token
      fetchTokenFromApi();
    }
  }, []); // Empty dependency array ensures this effect runs once on mount

  const handleLogin = () => {
    // Handle login logic using userId and token
    conn.open({
      user: userId,
      agoraToken: token,
    });
  };



  return (
    <div>
    <Wrapper title={"Chat"}>
      <h1 className='text-2xl font-semibold xl:hidden pb-6'>Chat</h1>

      <div className='flex slg:w-[100%] w-[100vw h-full justify-center items-center '>
        <div className='border rounded-xl h-[100%] flex overflow-hidden'>

          <ChatSidebar agoraChatClient={conn} />
          <Chat agoraChatClient={conn} className="w-full" />

        </div>
      </div>

      <div>
        <h2>Group Information</h2>
        <ul>
          {groupInfo.map((info, index) => (
            <li key={index}>
              Group ID: {info.groupId}, Group Name: {info.groupName}, Description: {info.groupDescription}
              {info.custom && (
                <div>
                  Customer Name: {info.custom.customerName}, 
                  Customer Image: <img src={info.custom.customerImage} alt="Customer" />,
                  Service Name: {info.custom.serviceName}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Login form */}
      <div>
        <label htmlFor="userID">User ID:</label>
        <input type="text" id="userID" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <br />
        <label htmlFor="token">Token:</label>
        <input type="text" id="token" value={token} onChange={(e) => setToken(e.target.value)} />
        <br />
        <button onClick={handleLogin}>Login</button>
      </div>

    </Wrapper>
  </div>
  );
};

export default ChatPage;