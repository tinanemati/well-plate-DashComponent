/* eslint no-magic-numbers: 0 */
import React, {useState} from 'react';
import {WellPlate} from '../lib';

const App = () => {
    // const [state, setState] = useState({wells: [], label: 'Selected Well'});
    // const setProps = (newProps) => {
    //     setState(newProps);
    // };

    return (
        <div>
            {/* <MyTextInput setProps={setProps} {...state} /> */}
            <WellPlate />
        </div>
    );
};

export default App;
