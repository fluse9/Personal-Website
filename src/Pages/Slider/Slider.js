import React from 'react';
import './Slider.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class Slider extends React.Component {
    state = {
        value: 50
    }

    handleOnChange = (e) => this.setState({ value: e.target.value })

    render() {
        return (
            <div class="slider-container">
                <span class="bar"><span class="fill"></span></span>
                <input type="range" min={0} max={100} value={this.state.value} class="slider" onChange={this.handleOnChange} />
                <script type="text/javascript">
                    $('.slider-container .bar .fill').style.width = { this.state.value } + "%";
                </script>
            </div>
        );
    }
}

export default Slider