/* eslint no-magic-numbers: 0 */
import React, { useState } from 'react';

import { WellPlate } from '../lib';

const App = () => {

    const [state, setState] = useState({value:'', label:'Type Here'});
    const setProps = (newProps) => {
            setState(newProps);
        };

    return (
        <div>
            <WellPlate
                setProps={setProps}
                {...state}
            />
        </div>
    )
};


export default App;
