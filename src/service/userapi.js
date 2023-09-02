import { showSuccessToast, showToast } from "vant";
import myAxios from "./myaxios";
export const login = async (value) => {
  // console.log(value);
  const res = await myAxios.post("/api/user/login", value);
  if (res.data.code === 200) {
    showSuccessToast("登录成功");
    return res.data.data;
  } else {
    showToast(res.data.description || "失败！");
    return null;
  }
};

export const register = async (value) => {
  // console.log(value);
  const res = await myAxios.post("/api/user/register", value);
  if (res.data.code === 200) {
    showSuccessToast("注册成功");
    return res.data.data;
  } else {
    showToast(res.data.description || "失败！");
    return null;
  }
};
export const getUser = async () => {
  const res = await myAxios.get("/api/user/current");
  // console.log(res)
  if (res.data.code === 200) {
    // console.log(res);
    return res.data.data;
  } else {
    return null;
  }
};

export const getUserList = async (pageNum = 1, pageSize = 10) => {
  const res = await myAxios.get("/api/user/recommend", {
    params: {
      pageNum,
      pageSize,
    },
  });
  // console.log(res)
  if (res.data.code === 200) {
    // console.log(res);
    return res.data.data;
  } else {
    return null;
  }
};

// 用户搜索
export const userSearch = async (userName) => {
  const res = await myAxios.get("/api/user/search", {
    params: {
      userName,
    },
  });
  // console.log(res)
  if (res.data.code === 200) {
    // console.log(res);
    return res.data.data;
  } else {
    return null;
  }
};

// 用户退出登陆
export const logout = async () => {
  const res = await myAxios.post("/api/user/logout");
  // console.log(res)
  if (res.data.code === 200) {
    // console.log(res);
    return res.data.data;
  } else {
    return null;
  }
};

// 标签搜索
export const tagSearch = async (tagsName, pageNum = 1, pageSize = 10) => {
  const res = await myAxios.post("/api/user/searchTag", tagsName);
  // console.log(res)
  if (res.data.code === 200) {
    // console.log(res);
    return res.data.data;
  } else {
    return null;
  }
};

// //队伍列表
// export const Teamlist = async (pageNum = 1, pageSize = 10) => {
//   const res = await myAxios.get("/api/team/list/page", {
//     params: {
//       pageNum,
//       pageSize,
//     },
//   });
//   // console.log(res)
//   if (res.data.code === 200) {
//     // console.log(res);
//     return res.data.data;
//   } else {
//     return null;
//   }
// };

// 搜索队伍
// export const searchteam =  async (searchText) => {
//   const res = await myAxios.get('/api/team/list/page', {
//     params: {
//       searchText: searchText
//     }
//   });
//   if (res.data.code ==  200) {
//     return res.data;
//   }
//   else{
//     return null;
//   }
// }


// 匹配用户
export const matchUser = async (pageNum = 1, pageSize = 10) => {
  const res = await myAxios.post("/api/user/match", {
      pageNum,pageSize
  })
  if (res.data.code === 200) {
    return res.data;
  } else {
    return null;
  }
}

// 更新用户
export const updateUsers = async (newUser) => {
  if(newUser.id<0){
    return null;
  }
  const res = await myAxios.post("/api/user/update", {
    ...newUser
  });
  // console.log(res)
  if (res.data.code === 200) {
    // console.log(res);
    return res.data.data;
  } else {
    return null;
  }
};

export const updateAva = async (fileData) => {

  const res = await myAxios.post("/api/upload/img",fileData,{
    headers: {
      // 注意修改请求头file格式
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(res)
  console.log(res)
  if (res.data.code === 200) {
    // console.log(res);
    return res.data.data;
  } else {
    return null;
  }
};

// 获取加入已经的队伍
// export const myjoin =  async () => {
//   const res = await myAxios.get('/api/team/list/my/join');
//   if (res.data.code ==  200) {
//     return res.data;
//   }
//   else{
//     return null;
//   }
// }

// 修改密码
export const updatePassword = async (oldPassword , newPassword ) => {
  const res = await myAxios.post("/api/user/updatePassword", {
          oldPassword,newPassword
  })
  if (res.data.code === 200) {
    return res.data;
  } else {
    return null;
  }
}
// 更新标签

export const updateTags = async (tagNameList ) => {
  const res = await myAxios.post("/api/user/updateTags", tagNameList)
  if (res.data.code === 200) {
    return res.data;
  } else {
    return null;
  }
}
