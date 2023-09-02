import myAxios from "./myaxios";

//队伍列表
export const Teamlist = async (pageNum = 1, pageSize = 10) => {
  const res = await myAxios.get("/api/team/list/page", {
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
// 搜索队伍
export const searchteam = async (searchText) => {
  const res = await myAxios.get("/api/team/list/page", {
    params: {
      searchText: searchText,
    },
  });
  if (res.data.code == 200) {
    return res.data;
  } else {
    return null;
  }
};
// 获取加入已经的队伍
export const myjoin = async () => {
  const res = await myAxios.get("/api/team/list/my/join");
  if (res.data.code == 200) {
    return res.data;
  } else {
    return null;
  }
};

export const tojoin = async (id, password) => {
  const res = await myAxios.post("/api/team/join", {
    id,
    password,
  });
  if (res.data.code == 200) {
    return res.data;
  } else {
    return null;
  }
};

// 创建队伍
export const tocreateTeam = async (team) => {
  const res = await myAxios.post("/api/team/add",{...team}
    
  );
  if (res.data.code == 200) {
    return res.data;
  } else {
    return null;
  }
};
