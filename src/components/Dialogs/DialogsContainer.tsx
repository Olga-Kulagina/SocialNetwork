import {
    sendMessageActionCreator
} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {WithAuthRedirect} from '../../hoc/withAuthRedirect';



let mapStateToProps = (state: AppStateType) => {
    return (
        {
            dialogs: state.dialogsPage.dialogs,
            messages: state.dialogsPage.messages
        }
    )
}

let mapDispatchToProps = (dispatch: any) => {
    return (
        {
            sendMessage: (newMessageBody: string) => {dispatch(sendMessageActionCreator(newMessageBody))}
        }
    )
}

let AuthRedirectComponent = WithAuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;