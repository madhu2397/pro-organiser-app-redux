import React from 'react';

const Backdrop = () => {
    return (
        <div style={{'width':'100%', 'height': '100%', 'backgroundColor': 'rgba(0,0,0,0.5)', 'zIndex': 100, 'position':'fixed','left': 0,'top': 0}}></div>
    )
}

export default Backdrop;