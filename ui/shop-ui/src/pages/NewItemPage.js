import React from "react";
import HomePageHeader from "../components/structure/HomePageHeader";
import SearchComponent from "../components/SearchComponent";
import NavigationBar from "../components/bar/NavigationBar";
import HomePageFooter from "../components/structure/HomePageFooter";
import NavigationStringCreator from "../components/navigation-util/NavigationStringCreator";
import NewItemComponent from "../components/NewItemComponent";

class NewItemPage extends React.Component {
    constructor() {
        super();
        this.state = {
            navigationString: NavigationStringCreator.get(['Главная', '/', 'Новый товар', null])
        }
    }

    render() {
        const url = window.location.href;
        const encodedValue = url.substring(url.lastIndexOf('?category=') + 10);
        const value = decodeURIComponent(encodedValue);
        console.log(value);

        return <>
            <HomePageHeader/>
            <SearchComponent/>
            <NavigationBar string={this.state.navigationString} />
            <NewItemComponent category={value}/>
            <HomePageFooter/>
        </>
    }

}

export default NewItemPage