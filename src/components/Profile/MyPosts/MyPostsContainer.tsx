import {addPostActionCreator} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/redux-store';

let mapStateToProps = (state: AppStateType) => {
    return (
        {
            posts: state.profilePage.posts
        }
    )
}

let mapDispatchToProps = (dispatch: any) => {
    return (
        {
            addPost: (text: string) => {dispatch(addPostActionCreator(text))
}
        }
    )
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;