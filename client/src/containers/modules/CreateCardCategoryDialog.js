import {connect} from 'react-redux';
import CreateCardCategoryDialog from '../../components/modules/CreateCardCategoryDialog';

function mapStateToProps(state) {
    return {
        createCardCategoryDialogIsOpen: state.dialogReducer.createCardCategoryDialogIsOpen,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleCreateCardCategoryDialog: bools => {
            dispatch({
                type: 'HANDLE_CREATE_CARD_CATEGORY_DIALOG',
                createCardCategoryDialogIsOpen: bools,
            });
        },
        setAllCardCategories: data => {
            dispatch({
                type: 'SET_ALL_CARD_CATEGORIES',
                cardCategories: data,
            });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCardCategoryDialog);
