import { connect } from 'react-redux'
import { itemsFetchData } from '../actions/items';
import ItemList from '../components/ItemList'

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

const Items = connect(mapStateToProps, mapDispatchToProps)(ItemList);

export default Items;