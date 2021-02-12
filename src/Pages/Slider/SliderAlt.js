import React from 'react';
import './SliderAlt.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class SliderAlt extends React.Component {
    state = {
        value: 50
    }

    constructor(props) {
        super(props);
        this.setState({
            value: props.value
        });
        this.state.value = props.value;
    }

    handleOnChange = (e) => this.setState({ value: e.target.value })

    render() {
        return (
            <div class="slider-alt-container">
                <span class="bar"><span class="fill"></span></span>
                <input type="range" min={0} max={100} value={this.state.value} class="slider-alt" onChange={this.handleOnChange} />
                <script type="text/javascript">
                    $('.slider-alt-container .bar .fill').style.width = {this.state.value} + "%";
                </script>
            </div>
        );
    }
}

export default SliderAlt