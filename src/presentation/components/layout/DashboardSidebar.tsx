'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
} from '@mui/material'
import {
  Dashboard,
  Inventory,
  ShoppingCart,
} from '@mui/icons-material'

const drawerWidth = 240

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, href: '/dashboard' },
  { text: 'Products', icon: <Inventory />, href: '/products' },
  { text: 'Orders', icon: <ShoppingCart />, href: '/orders' },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          E-commerce Admin
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                href={item.href}
                selected={pathname === item.href}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
