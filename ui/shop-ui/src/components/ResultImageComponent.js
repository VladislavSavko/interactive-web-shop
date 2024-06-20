export default function ResultImageComponent(props) {
    const saveImage = () => {
        let link = document.createElement('a');

        link.href = `${props.data}`;

        link.download = `FittingRoom_${new Date().toLocaleString()}.jpg`;

        link.click();
    }

    const itemHref = (id) => {
        return '/item/' + id;
    }
    return (
        <div className="result-div" id="image_result">
            <h2>Result image:</h2>
            <div className="result-image">
                <img src={props.data} alt="Some error while displaying image..." className="loaded-image"/>
                <button onClick={() => window.location.href=itemHref(props.item)}>View item</button>
                <button onClick={saveImage}>Save image</button>
            </div>
        </div>
    );
}