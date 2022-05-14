import { Input, Modal, ModalProps } from "antd"
import { MouseEvent, useState } from "react"
import { useBoardAdd } from "./config"

export const BoardCreateModal = (props: ModalProps) => {

    const [name, setName] = useState<string>()

    const { mutateAsync: addBoard, isLoading } = useBoardAdd()

    const createBoard = async (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
        await addBoard(name)
        props.onOk && props.onOk(e)
        setName('')
    }

    return (
        <Modal title="新增" {...props} onOk={createBoard} confirmLoading={isLoading}>
            <Input placeholder="请输入白板名称" value={name} onChange={(e) => setName(e.target.value)}/>
        </Modal>
    )
}