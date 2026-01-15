import { Card, CardContent, Typography, Box } from '@mui/material'
import { ReactNode } from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  color?: string
}

export function StatsCard({ title, value, icon, color = '#1976d2' }: StatsCardProps) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 2,
              backgroundColor: `${color}15`,
              color: color,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
