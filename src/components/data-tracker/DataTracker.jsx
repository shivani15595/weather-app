import React from 'react';
import './DataTracker.css';

const DataTracker = (props) => {

    const showMin = (values) => {
        let min = values[0];
        values.forEach(i => {if(min>i) min=i;});
        return min;
    };
    const showMax = (values) => {
        let max = values[0];
        values.forEach(i => {if(max<i) max=i;});
        return max;
    };
    const showMean = (values) => {
        let total = 0;
        values.forEach(i => {total+=i});
        return (total/values.length).toFixed(3);
    };
    const showMode = (values) => {
        let count = {};
        values.forEach(i => {
            count[i] = count[i] ? count[i]+1 : 1;
        });
        let maxVal = 0;
        let maxI = 0;
        Object.keys(count).forEach(i => {
            if(count[i]>maxVal){
                maxVal=count[i];
                maxI = i;
            }
        })
        return maxI;
    }

    return (
        <div class="dataType">{props.type}
            <div class="data">Min : {showMin(props.values)}</div>
            <div class="data">Max : {showMax(props.values)}</div>
            <div class="data">Mean : {showMean(props.values)}</div>
            <div class="data">Mode : {showMode(props.values)}</div>
        </div>
    );
}

export default DataTracker;