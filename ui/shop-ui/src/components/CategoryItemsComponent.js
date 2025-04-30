import React from "react";
import ItemCard from "./ItemCard";

class CategoryItemsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        console.log(this.props.items)
        this.setState({
            items: this.props.items
        })
    }

    render() {
        if (this.state.items !== undefined && this.state.items.length > 0) {
            return <>
                {this.state.items.map(item => {
                    return <ItemCard iid={item.id} name={item.name} mainImage={item.images[0]} price={item.price} category={false}/>
                })}
            </>
        } else {
            return <div style={{fontSize: '30px'}}>
                На данный момент товаров нет...
            </div>
        }
    }
}


export default CategoryItemsComponent;