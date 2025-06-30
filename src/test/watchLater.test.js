import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './utils'
import App from '../App.jsx'

it('Watch Later movies page functionality', async () => {
    renderWithProviders(<App />)

    await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump')
    await waitFor(() => {
      expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument()
    })
    const watchLaterButton = screen.getAllByTestId('watch-later')[0]
    await waitFor(() => {
        expect(watchLaterButton).toBeInTheDocument()
    })
    await userEvent.click(watchLaterButton)
    
    await waitFor(() => {
        expect(screen.getByTestId('remove-watch-later')).toBeInTheDocument()
    })

    const watchLaterNav = screen.getByText(/watch later/i)
    await userEvent.click(watchLaterNav)

    await waitFor(() => {
        expect(screen.getByTestId('watch-later-div')).toBeInTheDocument()
        expect(screen.getByText(/watch later/i)).toBeInTheDocument()
    })

    await waitFor(() => {
        expect(screen.getByText('Through the Eyes of Forrest Gump')).toBeInTheDocument()
    })

    const removeButton = screen.getByTestId('remove-watch-later')
    await userEvent.click(removeButton)

    await waitFor(() => {
        expect(screen.getByTestId('watch-later')).toBeInTheDocument()
    })
})

it('Watch Later empty state', async () => {
    renderWithProviders(<App />)

    const watchLaterNav = screen.getByText(/watch later/i)
    await userEvent.click(watchLaterNav)

    await waitFor(() => {
        expect(screen.getByText(/your watch later list is empty/i)).toBeInTheDocument()
        expect(screen.getByText(/browse movies/i)).toBeInTheDocument()
    })
})