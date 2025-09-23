export const fetchUserData = async (client, token) => {
  if (!token) {
    return null;
  }

  const currentSession = await client.user.fetchOne();
  console.log('currentSession', currentSession?.status)

  const invalidOrExpire = currentSession.status !== 200 || currentSession.status === 403;

  if (invalidOrExpire) {
    console.log('user Id bearning',currentSession);
    const refreshData = await client.auth.refresh({ userId: currentSession?.data?.userId }, {
      credentials: 'include'
    });
    console.log('refreshData', refreshData)
    if (refreshData.status === 200) {
      return await fetchUserData(client, refreshData.token);
    }
    else {
      return null
    }
  }

  return currentSession;
};
export const handleCreate = async (client,setFunc, setVal, inputValue, type) => {
  const newOption = { name: inputValue };
  let id = ''
  switch (type) {
    case 'contactPosition':
      const createPos = await client.positions.create(newOption)
      console.log('createPos', createPos)
      if (createPos.status === 200) {
        id = createPos.data.positions._id
      }; break;
    case 'contactDepartment':
      const createDept = await client.departments.create(newOption)
      console.log('createDept', createDept)
      if (createDept.status === 200) {
        id = createDept.data.departments._id
      }; break;
    case 'industry':
      const createInd = await client.industries.create(newOption)
      console.log('createInd', createInd)
      if (createInd.status === 200) {
        id = createInd.data.industries._id
      }; break;
    default:
      break;
  }
  newOption._id = id
  setFunc((prev) => [...prev, newOption]);
  setVal(type, newOption._id, {
    shouldValidate: true,
    shouldDirty: true,
  });
  return newOption
};


