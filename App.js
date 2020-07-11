import './app/config'
// import DebugConfig from '../config/DebugConfig'
import React from 'react'
import { Provider } from 'react-redux'
import createStore from './app/reducers'
import createFetch from './app/createFetch'

import Root from './app/containers/Root/Root'

const customFetch = createFetch(fetch)
export const store = createStore({ fetch: customFetch })

export default class App extends React.Component {
    componentDidMount() {
        
    }

    render() {
        return (
            <Provider store={store}>
                <Root/>
            </Provider>
        );
    }
}

