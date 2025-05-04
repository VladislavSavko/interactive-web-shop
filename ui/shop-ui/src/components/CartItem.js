import React from "react";

class CartItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: this.props.quantity,
            price: this.props.price
        }
    }

    decreaseQuantity = () => {
        let q = this.state.quantity;
        if(q === 1) {
            this.setState({
                quantity: 1
            })
        } else {
            this.setState({
                quantity: this.state.quantity - 1
            });
        }
    }

    increaseQuantity = () => {
        this.setState({
            quantity: this.state.quantity + 1
        });
    }

    render() {
        return <div
            style={{
                paddingLeft: '10px', paddingRight: '10px', paddingBottom: '30px', borderBottom: 'solid 1px gray',
            marginTop: '30px'
            }}>
            <table>
                <tr>
                    <td>
                        <div className="icon icon3" style={{color: '#bbbbbb', paddingRight: '30px'}}></div>
                    </td>
                    <td>
                        <img src={'data:image/png;base64,' + this.props.mainImage?.data} height="100" width="100"
                             alt="Загрузка..."/>
                    </td>
                    <td>
                        <span style={{
                            paddingLeft: '25px', paddingRight: '45px', fontSize: '20px',
                            color: 'rgb(119, 119, 119)'
                        }}>{this.props.name}</span>
                    </td>
                    <td>
                        <span style={{
                            paddingLeft: '15px', paddingRight: '45px', fontSize: '22px',
                            color: 'rgb(136, 136, 136)'
                        }}>{this.props.price} BYN</span>
                    </td>
                    <td>
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            borderBottom: 'solid 1px gray', gap: '50px'
                        }}>
                            <div style={{
                                color: '#bbbbbb', fontSize: '30px', paddingBottom: '5px', paddingLeft: '10px',
                                cursor: "pointer", userSelect: 'none'
                            }}
                                 onClick={this.decreaseQuantity}>-
                            </div>
                            <span style={{fontSize: '24px'}}>{this.state.quantity}</span>
                            <div style={{
                                color: '#bbbbbb', fontSize: '30px', paddingRight: '10px', cursor: 'pointer',
                                userSelect: 'none'
                            }}
                                 onClick={this.increaseQuantity}>+
                            </div>
                        </div>
                    </td>
                    <td>
                        <span style={{
                            paddingLeft: '45px', paddingRight: '15px', fontSize: '22px',
                            color: 'rgb(45, 45, 45)'
                        }}>{this.state.price * this.state.quantity} BYN</span>
                    </td>
                </tr>
            </table>
        </div>
    }
}


export default CartItem