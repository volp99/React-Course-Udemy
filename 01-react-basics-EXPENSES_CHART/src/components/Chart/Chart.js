import React from "react";
import './Chart.css'
import ChartBar from './ChartBar'

const Chart = props => {
    const dataPointsValues = props.dataPoints.map(dataPoints => dataPoints.value)
    const totalMaximum = Math.max(...dataPointsValues)


    return (
        <div className="chart">
            <ChartBar/>
            {props.dataPoints.map(dataPoint => <ChartBar
                    key={dataPoint.label}
                    value={dataPoint.value}
                    maxValue={totalMaximum}
                    label={dataPoint.label}
                />
            )}
        </div>
    )
}
export default Chart;