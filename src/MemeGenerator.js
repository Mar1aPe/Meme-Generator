import React, { Component } from 'react';

class MemeGenerator extends Component {
    state = {
        topText: '',
        bottomText: '',
        randomImg: 'https://i.imgflip.com/2/3a30wc.jpg',
        allMemeImgs: []
    }


    componentDidMount() {

        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data

                this.setState({ allMemeImgs: memes });
            })
    }


    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value });
    }

    handleGenerator = (e) => {
        e.preventDefault()
        const randomNumber = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randomMemeImg = this.state.allMemeImgs[randomNumber].url
        this.setState({ randomImg: randomMemeImg });
    }

    render() {
        return (
            <div>
                <form className="meme-form">
                    <input name='topText' type="text" placeholder='Top Text' value={this.state.topText} onChange={this.handleChange} />

                    <input name='bottomText' type="text" placeholder='Bottom Text' value={this.state.bottomText} onChange={this.handleChange} />

                    <button onClick={this.handleGenerator}>Generate</button>
                </form>
                <div className='meme'><img src={this.state.randomImg} alt='' /></div>
                <h2 className='topText'>{this.state.topText}</h2>
                <h2 className='bottomText'>{this.state.bottomText}</h2>


            </div>
        );
    }
}

export default MemeGenerator;