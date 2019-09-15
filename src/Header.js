import React from 'react';
import { Animated } from 'react-animated-css';



const Header = () => {
    return (


        <header>
            <Animated animationIn="rollIn" >
                <img src="https://static.thenounproject.com/png/105263-200.png" alt="derpina" />
            </Animated>
            <Animated animationIn="rubberBand" animationInDuration={2000} >
                <p>Meme Generator</p>
            </Animated>
        </header>
    );
}

export default Header;