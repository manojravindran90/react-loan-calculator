import React from 'react';
import PropTypes from 'prop-types';
import ControlLabel from './control_label';
import ContainerBox from './container_box';

class CurrencyBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            error: ''
        };
        this.minValue = props.minValue || 1000;
        this.maxValue = props.maxValue || 40000;
    }
    onChange = (e) => {
        let error = '';
        const value = Number.parseInt(e.target.value);

        if (isNaN(value)) {
            error = "Please provide a valid amount";
        }
        else
            if (value < this.minValue) {
                error = "The loan amount cannot be smaller than \u00A3" + this.minValue;
            }
            else
                if (value > this.maxValue) {
                    error = "The loan amount cannot be greater than \u00A3" + this.maxValue;
                }

        this.setState({ error: error });
        this.props.onAmountChanged(value);
    }
    render() {
        return (
            <ContainerBox>
                <ControlLabel target={this.props.id} desc={this.props.desc} />
                <div className="input-group">
                    <span className="input-group-addon">&pound;</span>
                    <input
                        type="text"
                        className="form-control"
                        id={this.props.id}
                        autoComplete="off"
                        onChange={this.onChange} />
                    <span className="input-group-addon">.00</span>
                </div>

                <div className="control-validation">{this.state.error}</div>

            </ContainerBox>
        );
    }
}

CurrencyBox.propTypes = {
    desc: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default CurrencyBox;