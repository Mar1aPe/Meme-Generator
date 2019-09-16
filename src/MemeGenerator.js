import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';



class MemeGenerator extends Component {
    state = {
        topText: '',
        bottomText: '',
        randomImg: 'https://imgflip.com/s/meme/Futurama-Fry.jpg',
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

    downloadMeme = (e) => {
        e.preventDefault();
        domtoimage.toBlob(document.getElementById("meme"))
            .then(function (blob) {
                saveAs(blob, 'myImage.png');
            });



    }

    render() {
        return (
            <div className='main'>
                <form className="meme-form">
                    <input name='topText' type="text" placeholder='Top Text' value={this.state.topText} onChange={this.handleChange} />

                    <input name='bottomText' type="text" placeholder='Bottom Text' value={this.state.bottomText} onChange={this.handleChange} />

                    <button onClick={this.handleGenerator}>Get Image</button>

                </form>

                <div className='meme' id='meme' ><img src={this.state.randomImg} alt='' />
                    <h2 className='topText'>{this.state.topText}</h2>
                    <h2 className='bottomText'>{this.state.bottomText}</h2>

                </div>

                <button className='downloadBtn' onClick={this.downloadMeme}>Download meme</button>

            </div>
        );
    }
}

export default MemeGenerator;