import React, { Component } from 'react';

import styles from './FormElements.css';

class FormElements extends Component {
    state = {
        defaultValueSelect: []
    }

    static getDerivedStateFromProps = (props, state) => {
        if(props.element.type === 'select' && props.element.value !== null && props.element.value !== undefined) {
            let selectedOptions = [];
            for(let option in props.options) {
                if(props.element.value.indexOf(props.options[option].initials) > -1) {
                    selectedOptions.push(props.options[option].initials);
                }
            }
            state.defaultValueSelect = selectedOptions;
        }
        return state;
    }

    changeHandler = (event) => {
        if(event.target.type === 'select-multiple') {
            var options = event.target.options;
            var value = [];
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(options[i].value.split(' - ')[0]);
                }
            }
            this.props.changed(event.target.id, value);
        } else {
            this.props.changed(event.target.id, event.target.value);
        }
    }

    render() {
        let options = null;
        if(this.props.element.type === 'select') {
            options = this.props.options.map(option => {
                return <option key={option.id} value={option.initials}>{option.initials} - {option.name}</option>
            })
        }

        return (
            <div className={styles.FormElements}>
                <span className={styles.Label}>{this.props.element.label}</span>
                {
                    this.props.element.type === 'select' ?
                    (
                        <select className={styles.Select} multiple onChange={this.changeHandler} id={this.props.element.id} value={this.state.defaultValueSelect}>
                            {options}
                        </select>
                    ) :
                    <input type={this.props.element.type} placeholder={this.props.element.placeholder} ref={this.props.reference} onChange={this.changeHandler} id={this.props.element.id} value={this.props.element.value || ''} />
                }
            </div>
        )
    }
}

export default FormElements;
