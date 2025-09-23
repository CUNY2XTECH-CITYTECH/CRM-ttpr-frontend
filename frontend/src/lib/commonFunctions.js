export const fetchUserData = async (client, token) => {
  if (!token) {
    return null;
  }

  const currentSession = await client.user.fetchOne();


  const invalidOrExpire = currentSession.status !== 200 || currentSession.status === 403;

  if (invalidOrExpire && currentSession) {
    const refreshData = await client.auth.refresh({ userId: currentSession.data.userId }, {
      credentials: 'include'
    });
    console.log('refresh', refreshData)
    if (refreshData.status === 200) {
      return await fetchUserData(client, refreshData.token);
    }
    else {
      return null
    }
  }

  return currentSession;
};
