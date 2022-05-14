import { http } from "../../utils/http";

export const getBoardList = () => http('/user/login', {
    method: 'Get'
}).then((res) => res.data
)

