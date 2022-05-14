import styled from "@emotion/styled"
import { Card } from "antd"
import Meta from "antd/lib/card/Meta"
import moment from "moment"
import { Row } from "../../components"
import { BoardItem } from "../../types/board"
import "moment/locale/zh-cn";
import { ReactNode } from "react"
import { useNavigate } from "react-router"


moment.locale('zh-cn')

export const List = ({ boardList, CheckBoxWrap }: { boardList: BoardItem[], CheckBoxWrap: (item: BoardItem) => ReactNode }) => {
    console.log(boardList)
    return <Row gap={'1rem'} between={true} iswrap>
        {
            boardList.map(board => <ListCard key={board.id} item={board} CheckBox={CheckBoxWrap(board)} />)
        }
        <CardEmpty />
        <CardEmpty />
        <CardEmpty />
    </Row>
}

const ListCard = ({ item, CheckBox }: { item: BoardItem, CheckBox: ReactNode }) => {

    const navigator = useNavigate()

    return <CardWrap
        hoverable
        onClick={() => navigator(`/board/${item.id}`)}
        cover={<CardCoverWrap>
            {CheckBox}
            <Image alt="example" src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />
        </CardCoverWrap>}
    >
        <Meta title={item.name} description={moment(Number(item.create_time)).fromNow()} />
    </CardWrap>
}

const CardCoverWrap = styled.div`
    width: 100%;
    height: 15rem;
    position: relative;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const CardWrap = styled(Card)`
    width: 27rem;
    margin-bottom: 2rem!important;
`

const CardEmpty = styled.div`
    width: 27rem;
    height: 0;
    opacity: 0;
`
