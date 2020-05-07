import React, { useState } from "react"
import Layout from '../components/Layout'

export default class SearchUnavailable extends React.Component {
    render() {
        return (
            <div className='container-fluid text-center mt-5'>
                <img className="col-12" src="/assets/403.png" alt="access forbidden" />
            </div>
        )
    }
}