class NavigationStringCreator {
    static get(data) {
        return new Map(
            Array.from({length: data.length / 2}, (_, i) => [data[i * 2], data[i * 2 + 1]])
        );
    }
}


export default NavigationStringCreator