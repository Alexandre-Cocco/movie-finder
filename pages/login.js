import React, { useState } from "react"
import Layout from '../components/Layout'
import Router from 'next/router'
import axios from 'axios'
import store from '../store/store'
import { addUser } from '../actions/actions'

import Config from '../config'


export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    async handleClick(event) {
        event.preventDefault()
        const email = this.state.email
        const password = this.state.password

        if (email && password) {
            const payload = {
                "email": email,
                "password": password
            }
            await axios.post(Config.apiUrl + 'login', payload)
                .then((response) => {
                    const data = response.data
                    if (data.statusCode === 200) {
                        store.dispatch(addUser(data.user._id, data.user.email, data.user.accessRight, data.user.token))
                        Router.push('/search')
                    }
                    else {
                        this.setState({ error: 'Oops! Bad credentials' })
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }

    render() {
        return (
            <Layout>
                <div className="container">
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Login</div>
                                <div className="card-body">
                                    <form action="" method="">
                                        <div className="form-group row">
                                            <label htmlFor="email_address" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    id="email_address"
                                                    className="form-control"
                                                    name="email-address" required
                                                    value={this.state.email}
                                                    onChange={e => this.setState({ email: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>
                                            <div className="col-md-6">
                                                <input
                                                    type="password"
                                                    id="password"
                                                    className="form-control"
                                                    name="password"
                                                    required
                                                    value={this.state.password}
                                                    onChange={e => this.setState({ password: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 offset-md-4 text-center">
                                            <button type="submit" className="btn btn-primary" onClick={(event) => this.handleClick(event)}>
                                                Login
                                            </button>
                                            {this.state.error &&
                                                <p className="alert alert-danger mt-3 p-1">
                                                    {this.state.error}
                                                </p>
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout >
        )
    }
}