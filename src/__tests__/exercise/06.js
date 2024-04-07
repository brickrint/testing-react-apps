// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {useCurrentPosition} from 'react-use-geolocation'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'

jest.mock('react-use-geolocation')

test('displays the users current location', async () => {
  let setReturnValue
  const useMockCurrentPosition = () => {
    const [state, setState] = React.useState([])
    setReturnValue = setState
    return state
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  }

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setReturnValue([fakePosition])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  // 🐨 verify the latitude and longitude appear correctly
  expect(screen.getByText(/latitude/i)).toHaveTextContent(`Latitude: ${fakePosition.coords.latitude}`)
  expect(screen.getByText(/longitude/i)).toHaveTextContent(`Longitude: ${fakePosition.coords.longitude}`)
})

test('displays error message', async () => {
  const errorMessage = 'Geolocation is not supported'
  let setReturnValue
  const useMockCurrentPosition = () => {
    const [state, setState] = React.useState([])
    setReturnValue = setState
    return state
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  }

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setReturnValue([null, new Error(errorMessage)])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  // 🐨 verify the latitude and longitude appear correctly
  expect(screen.getByRole('alert')).toHaveTextContent(errorMessage)
})

/*
eslint
  no-unused-vars: "off",
*/
