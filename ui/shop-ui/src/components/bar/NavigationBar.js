import React from "react";

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.string
        }
    }

    componentDidMount() {
        const div = document.getElementById('parts');
        div.innerHTML = '';
        this.state.data.forEach((value, key) => {
            let a;
            if (value === null) {
                a = document.createElement('span');
                a.textContent = key;
            } else {
                a = document.createElement('a');
                a.text = key;
                a.className = 'hovered-text';
                a.style.color = '#555555'
                a.href = value;
            }

            div.appendChild(a);
            let delimiter = document.createElement('span');
            delimiter.textContent = '>';
            delimiter.style.paddingLeft = '15px';
            delimiter.style.paddingRight = '15px';
            if (value !== null) {
                div.appendChild(delimiter);
            }
        })
    }

    render() {
        return <section className="navigation-bar-container">
            <div style={
                {
                    paddingLeft: '150px',
                    paddingRight: '150px',
                    paddingTop: '30px',
                    paddingBottom: '30px',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }>
                <div id="parts" style={{textAlign: 'center'}}/>
            </div>
        </section>
    }
}


export default NavigationBar