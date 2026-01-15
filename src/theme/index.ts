import { createTheme } from '@mui/material/styles'
import { palette } from './palette'
import { typography } from './typography'
import { components } from './overrides'

export const theme = createTheme({
  palette,
  typography,
  components,
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
})
