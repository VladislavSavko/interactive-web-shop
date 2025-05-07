import React from "react";
import ApiClient from "../client/ApiClient";
import ItemCard from "./ItemCard";
import AddCategoryCard from "./AddCategoryCard";

class CategoriesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.refreshItems();
        setInterval(this.refreshItems.bind(this), 60000);
    }

    refreshItems() {
        this.getCategoriesData().then(response => {
            console.log(response)
            this.setState({
                data: response
            })
        })
    }


    getCategoriesData(): Promise {
        return ApiClient.getAllCategories().then(
            response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error('Failed to fetch items');
                }
            }
        )
    }


    render() {
        if (this.state.data !== undefined && this.state.data.length > 0) {
            return <>
                {window.sessionStorage.getItem('userRole') === 'ADMIN' && <AddCategoryCard title="Добавить категорию" />}
                {this.state.data.map(item => {
                    return <ItemCard iid={item.id} name={item.name} mainImage={item.image} category={true}/>
                })}
            </>
        } else {
            return <div style={{fontSize: '30px'}}>
                На данный момент товаров нет...
            </div>
        }
    }
}


export default CategoriesComponent