import { message } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BoardItem } from "../../types/board";
import { useHttp } from "../../utils/http";

export const useBoardList = () => {
    const client = useHttp()
    return useQuery<BoardItem[]>('boardList',() => client('/board/list').then(res => {
        if (res.code === 200) {
            return res.data
        }else {
            message.error(res.message)
            return null
        }
    }))
}

export const useBoardAdd = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation((name?: string ) => client('/board/create',{
        method: 'POST',
        data: {
            name: name
        }
    }),{
        onSuccess(res) {
            if(res.code === 200) {
                queryClient.invalidateQueries('boardList')
                message.success('创建成功')
            }else {
                message.error(res.message)
            }
           
        },
        // onMutate() {
        //     const previousItem = queryClient.getQueryData('boardList')

        //     return previousItem
        // }
    })
}

export const useBoardRemove = () => {
    const client = useHttp() 
    const queryClient = useQueryClient()
    return useMutation((ids: number[] ) => client('/board/delete',{
        method: 'POST',
        data: {
            ids
        }
    }),{
        onSuccess(res) {
            if(res.code === 200) {
                queryClient.invalidateQueries('boardList')
                message.success('删除成功')
            }else {
                message.error(res.message)
            }
           
        },
    })
}