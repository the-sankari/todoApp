import {render, screen} from '@testing-library/react'
import TaskList from './components/TaskList'

test ('renders TaskList ',()=> {
render (<TaskList data = {[]}/>)
expect(screen.getByText('Predefined Task List')).toBeInTheDocument()
} );