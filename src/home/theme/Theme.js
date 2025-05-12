import { useEffect } from 'react'
import { createTheme } from '@mui/material/styles'
import _ from 'lodash'

import components from './Components'
import typography from './Typography'
import { shadows } from './Shadows'
import { DarkThemeColors } from './DarkThemeColors'
import { LightThemeColors } from './LightThemeColors'
import { baseDarkTheme, baselightTheme } from './DefaultColors'
import * as locales from '@mui/material/locale'

export const buildTheme = (config = {}) => {
  const { theme = 'BLUE_THEME', direction = 'ltr', language = 'enUS', mode = 'light' } = config

  const themeOptions =
    mode === 'dark' ? DarkThemeColors.find((t) => t.name === theme) : LightThemeColors.find((t) => t.name === theme)

  const defaultBase = mode === 'dark' ? baseDarkTheme : baselightTheme

  const baseThemeOptions = {
    palette: { mode },
    shape: { borderRadius: 8 },
    shadows: shadows,
    typography,
    direction
  }

  const themeObject = createTheme(_.merge({}, baseThemeOptions, defaultBase, locales[language], themeOptions))

  themeObject.components = components(themeObject)

  return themeObject
}

export const ThemeSettings = () => {
  const theme = buildTheme()

  useEffect(() => {
    document.dir = theme.direction
  }, [theme.direction])

  return theme
}
