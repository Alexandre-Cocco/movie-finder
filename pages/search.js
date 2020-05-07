import React, { useState } from "react"
import Layout from '../components/Layout'
import axios from 'axios'
import store from '../store/store'
import querystring from 'querystring'
import { DelayInput } from 'react-delay-input'
import SearchUnavailable from '../components/searchUnavailable'
import MovieTile from '../components/movieTile'
import Config from '../config'
import { max } from "moment"

export default class Search extends React.Component {
    constructor(props) {
        const { user } = store.getState()
        super(props)
        this.state = {
            results: [],
            query: '',
            releaseDate: '',
            offset: 0,
            maxResults: 0
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.query !== this.state.query ||
            prevState.releaseDate !== this.state.releaseDate ||
            prevState.offset !== this.state.offset
        ) {
            this.search()
        }
    }

    reset = () => {
        this.setState({
            results: [],
            query: '',
            releaseDate: '',
            offset: 0,
            maxResults: 0
        })
    }

    search() {
        const { query, releaseDate, offset, results } = this.state
        const limit = Config.searchLimit
        this.setState({ results: [] })
        if (query.length >= 3) {
            const { user } = store.getState()
            const params = {
                token: user.token,
                term: query,
                releaseDate: releaseDate.replace('-', '/'),
                limit: limit,
                offset: offset
            }
            axios.get(Config.apiUrl + 'movie?' + querystring.stringify(params))
                .then((response) => {
                    const { maxResults, movies } = response.data
                    this.setState({
                        maxResults: maxResults,
                        results: !releaseDate ? [...results, ...movies] : movies
                    })
                })
                .catch(function (error) {
                    className = e.log(error)
                })
        }
    }

    handleQuery = (e) => {
        const query = e.target.value
        this.reset()
        this.setState({
            query: query,
        })
    }

    handleReleaseDate = (e) => {
        const releaseDate = e.target.value
        this.setState({
            results: [],
            releaseDate: releaseDate,
            offset: 0,
            maxResults: 0
        })
    }

    handleOffset = (e) => {
        e.preventDefault()
        this.setState({ offset: this.state.offset + Config.searchLimit })
    }

    render() {
        const { user } = store.getState()
        const { results, maxResults } = this.state
        const notGranted = !user.id || user.accessRight == 0
        const hasResults = results.length > 0
        return (
            <Layout>
                {notGranted
                    ? <SearchUnavailable />
                    :
                    <div className='container-fluid text-center mt-5'>
                        {notGranted &&
                            <SearchUnavailable />
                        }
                        <h1 className="mb-1 mb-lg-5">Movies Finder</h1>
                        <form className="card card-sm">
                            <div className="card-body row no-gutters align-items-center">
                                <div className="col-auto">
                                    <i className="fas fa-search h4 text-body"></i>
                                </div>
                                <div className="col-lg-12">
                                    <input
                                        className="form-control form-control-lg form-control-borderless"
                                        type="search"
                                        placeholder="Search keywords"
                                        onChange={event => this.handleQuery(event)}
                                        value={this.state.query}
                                    />
                                </div>
                            </div>

                            {hasResults && (
                                <div className="d-flex justify-content-center no-gutters mb-4">
                                    <div>
                                        <DelayInput
                                            className="form-control"
                                            placeholder="Release Date"
                                            type="date"
                                            delayTimeout={1000}
                                            onChange={event => this.handleReleaseDate(event)} />
                                    </div>
                                </div>
                            )}

                            <div className="row no-gutters">
                                {results.map((val, i) => {
                                    return (
                                        <MovieTile movie={val} key={i} />
                                    )
                                })}
                            </div>


                            {hasResults < maxResults &&
                                <div className="d-flex justify-content-center">
                                    <button className="mb-2 btn btn-dark" onClick={(e) => { this.handleOffset(e) }}>Load more</button>
                                </div>
                            }
                        </form>
                    </div>
                }
            </Layout>
        )
    }
}