import './CreateBacklogTable.css'

import { IconButton } from '@mui/material';
import ArrowUpIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownIcon from '@mui/icons-material/ArrowDownward';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DescriptionIcon from '@mui/icons-material/Description'
import { useEffect, useState } from 'react';

const CreateBacklogTable = (props) => {
    const [backlogList, setBacklogList] = useState([])

    useEffect(()=>{
        setBacklogList(props.backlogList)
    },[props.backlogList])
    return (
        <table className='create-backlog-table'>
            <tr className='create-backlog-header-row'>
                <th>
                    <p className='create-backlog-header-lbl'>Tittle</p>
                </th>
                <th>
                    <p className='create-backlog-header-lbl'>Description</p></th>
                <th>
                    <p className='create-backlog-header-lbl' >Acceptance criteria</p></th>
                <th>
                    <p className='create-backlog-header-lbl'>Status</p></th>
                <th >
                    <p className='create-backlog-header-lbl'>Priority</p></th>
                <th>
                    <p className='create-backlog-header-lbl'>SP</p>
                </th>
                <th>
                    <p className='create-backlog-header-lbl'>Color</p>
                </th>
                <th>

                </th>
            </tr>
            <tbody>
                {backlogList.map((backlogItem) => {
                    return <tr>
                        <td>
                            <p className='create-backlog-title-lbl'>{backlogItem.tittle}</p>
                        </td>
                        <td>
                            <p className='create-backlog-des-lbl'>{backlogItem.description}</p>
                        </td>
                        <td>
                            <p className='create-backlog-des-lbl'>{backlogItem.acceptence_criteria }</p>
                        </td>
                        <td>
                            <p className='create-backlog-priority-lbl'>{backlogItem.status}</p>
                        </td>
                        <td>
                            <article className='create-backlog-priority-container'>
                                {
                                    backlogItem.priority === "LOW" ? <ArrowDownIcon style={{width:'18px',height:'18px',color:'green'}} /> : backlogItem.priority === "MED" ? <RemoveIcon style={{width:'18px',height:'18px',color:'grey'}}  />:<ArrowUpIcon style={{width:'18px',height:'18px',color:'red'}} />
                                }
                                <p className='create-backlog-priority-lbl'>{backlogItem.priority}</p>
                            </article>
                        </td>
                        <td>
                            <p className='create-backlog-priority-lbl'>{backlogItem.story_points}</p>
                        </td>
                        <td>
                            <div style={{width:'18px' ,height:'18px',backgroundColor: `${backlogItem.color}`,borderRadius:'6px'}} />
                        </td>
                        <td>
                            <IconButton onClick={()=>{
                                props.removeReleaseBacklogItem(backlogItem)
                            }} >
                                <DeleteIcon  />
                            </IconButton>
                        </td>
                    </tr>
                })}


            </tbody>
        </table>
    )
}

export default CreateBacklogTable;