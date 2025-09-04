// import { getData,createData } from "@/utils/http-methods"
//
// export const authorized_get = async (token, endpoint) => {
//   if (token) {
//     let res = await getData(endpoint, {
//       headers: {
//         "Authorization": `Bearer ${token}`
//       }
//     })
//     if (res.status === 401 && res.message === "Login First") {
//       return null
//     }
//
//     else if (res.status === 403 && res.error === "TokenExpired") {
//       let rf = await createData('refresh', { userId: res.data?.id }, { credentials: 'include' })
//       if (rf.status == 200) {
//         return "refresh"
//       }
//       if (rf.status == 401) {
//         return null
//       }
//
//     }
//     else if (res.status === 200) {
//       return res
//     }
//
//   }
// }
