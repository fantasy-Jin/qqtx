import Myaxios from "./myaxios.js";

export const getTeamMessage = async (teamId) => {
    const res = await Myaxios.post(
        "/api/chat/teamChat",
        {
        teamId
        }
    )
    if(res?.data?.data.length<=0){
        return null;
    }
    return res.data.data
}



