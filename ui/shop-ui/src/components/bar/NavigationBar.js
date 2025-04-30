import React from "react";

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let string = this.props.string;
        const arr = string.split(" / ").map(i => i.trim());
        const div = document.getElementById('parts');
        console.log(div)

        div.innerHTML = arr.map(item => `<span style="padding-left: 10px;padding-right: 10px">${item}</span>`)
            .join("  >  ");
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