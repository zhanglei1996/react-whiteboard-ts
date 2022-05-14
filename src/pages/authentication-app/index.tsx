import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Board from '../Board';
import BoardList from '../BoardList'


export default function AuthenticationApp() {
    return <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navigate to={'/list'}/>} />
            <Route path='/list' element={<BoardList />} />
            <Route path='/board/:id' element={<Board />} />
        </Routes>
    </BrowserRouter>
}
