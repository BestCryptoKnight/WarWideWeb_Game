import { Fragment, useState } from 'react'
import {
  AppBar,
  IconButton,
  Avatar,
  Popover,
  List,
  ListSubheader,
  ListItemButton,
} from '@mui/material'
import { useAuth } from '../contexts/AuthContext'
import { createRoom, getRoom, deleteRoom } from '../api/RoomApi'
import Admin from './admin'
export default function dashboard() {

  //createRoom()
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div>Dashboard</div>
      <Admin />
    </div>
  )
}
