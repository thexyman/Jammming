import React from 'react'
import './App.css'

import Playlist from '../Playlist/Playlist'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Spotify from '../../util/Spotify'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchResults: [],
      playlistName: 'Ali Playlist',
      playlistTracks: []
    }

    this.search = this.search.bind(this)
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlayListName = this.updatePlayListName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
  }

  addTrack(track) {
    const tracks = this.state.playlistTracks
    if (!this.state.playlistTracks.includes(track.id)) {
      tracks.push(track)
      this.setState({ playlistTracks: tracks })
    }
  }

  removeTrack(track) {
    let currentTracks = this.state.playlistTracks
    let newTracks = currentTracks.filter(
      currentTrack => currentTrack.id !== track.id
    )
    this.setState({ playlistTracks: newTracks })
  }

  updatePlayListName(name) {
    const newName = name
    this.setState({ playListName: newName })
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term) {
    Spotify.search(term).then(track => {
      this.setState({ searchResults: track })
    })
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              onAdd={this.addTrack}
              searchResults={this.state.searchResults}
            />
            <Playlist
              onSave={this.savePlaylist}
              onNameChange={this.updatePlayListName}
              onRemove={this.removeTrack}
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
