import React, { Component } from 'react';
import { Counter } from './Counter';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
        this.incrementCounter = this.incrementCounter.bind(this);
    }

    incrementCounter() {
        console.log('clicker the clickie');
    }
    componentDidMount() {
        this.populateWeatherData();
    }

    static renderForecastsTable(forecasts) {
        return (
            <div>
                <Counter />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Temp. (C)</th>
                            <th>Temp. (F)</th>
                            <th>Summary</th>
                            <th>Calculating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forecasts.map(forecast =>
                            <tr key={forecast.date}>
                                <td>{forecast.date}</td>
                                <td>{forecast.temperatureC}</td>
                                <td>{forecast.temperatureF}</td>
                                <td>{forecast.summary}</td>
                                <td>{forecast.calculated ?? "loading"}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderForecastsTable(this.state.forecasts);

        return (
            <div>
                <h1 id="tabelLabel" >Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }


    async populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
        console.log(this.forecast);
        for (const forecast of data) {
            this.calulateRow(data, forecast);
        }
        console.log('Done with requests to calculate');
    }

    async calulateRow(data, forecast) {
        console.log('looping', forecast.date);
        try {
            const response = await fetch(`weatherforecast/${forecast.temperatureC}/calculate`);
            const calculatedValue = await response.json();
            console.log('Calculated value', calculatedValue);
            forecast.calculated = calculatedValue;
        }
        catch (e) {
            forecast.calculated = "oops";
        }
        this.setState({ forecasts: data, loading: false });
    }
}
