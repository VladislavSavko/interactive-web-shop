export default function ResultImageComponent(props) {

    return (
        <div className="result-div" id="image_result">
            <h2>Result image:</h2>
            <div className="result-image">
                <img src={props.data} alt="Some error while displaying image..." className="loaded-image"/>
            </div>
        </div>
    );
}