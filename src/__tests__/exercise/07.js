// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from 'test/test-utils'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

function Wrapper({ children, theme = 'light' }) {
  return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
}

function r(ui, {theme, ...options} = {}) {
  return render(ui, { wrapper: (props) => <Wrapper {...props} theme={theme} />, ...options })
}

test('renders with the light styles for the light theme', () => {
  r(<EasyButton>Easy</EasyButton>, { theme: 'light' })
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

test('renders with the dark styles for the dark theme', () => {
  r(<EasyButton>Easy</EasyButton>, { theme: 'dark' })
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})

/* eslint no-unused-vars:0 */
