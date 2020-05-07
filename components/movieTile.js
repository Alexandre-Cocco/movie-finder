import React, { useState } from "react"
import moment from 'moment'

export default class MovieTile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { movie } = this.props

        return (
            <div className="mr-0  mb-3 col-12 col-lg-4 p-1 border">
                <img className="card-img-top" src={movie.picture} alt={movie.name} />
                <div className="card-body">
                    <p className="card-title">{movie.title}</p>
                    <time>{moment(movie.releaseDate).format('DD/MM/YYYY')}</time>
                </div>
            </div>
        )
    }
}