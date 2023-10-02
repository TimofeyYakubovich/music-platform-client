import {Dispatch} from 'react'
import { TrackAction, TrackActionTypes } from '../../types/track'
import axios from 'axios'

export const fetchTrack = () => {
    // для того что бы использовать redux thunk от сюдв надо вернуть фунцкию каторая параметром приниает dispatch
    // и npm i axios
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            // запрос на получение треков
            console.log('fetchTrack')
            // const response = await axios.get('http://localhost:5000/tracks?count=20&offset=0')
            // const response = await axios.get('https://music-platform-server-omega.vercel.app/tracks?count=20&offset=1')
            const response = await axios.get(process.env.MUSIC_PLATFORM_SERVER + 'tracks?count=20&offset=1')
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR, 
                payload: 'Произошла ошибка при загрузке треков'
            })
        }
    }
}

// екшенкреато отправляет запрос на эндпоинт поиска
export const searchTracks = (query: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            console.log(query)
            // const response = await axios.get('http://localhost:5000/tracks/search?query=' + query)
            // const response = await axios.get(process.env.MUSIC_PLATFORM_SERVER + 'tracks/search?query=' + query)
            // const response = await axios.get('https://music-platform-server-omega.vercel.app/tracks/search?query=8')
            const response = await axios.get(`https://music-platform-server-omega.vercel.app/tracks/search?query=${query}`)
            // const response = await axios.get(process.env.MUSIC_PLATFORM_SERVER + 'tracks?count=20&offset=1')
            // const response = await axios.get(process.env.MUSIC_PLATFORM_SERVER + `tracks/search?query=${query}`)
            // const response = await axios.get(`${process.env.MUSIC_PLATFORM_SERVER}tracks/search?query=` + query)
            console.log(response)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR, 
                payload: 'Произошла ошибка при загрузке треков'
            })
        }
    }
}