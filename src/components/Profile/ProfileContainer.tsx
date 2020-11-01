import React from 'react'
import Profile from './Profile';
import {connect} from 'react-redux';
import {getStatusThunkCreator, getUserProfileThunkCreator, updateStatusThunkCreator} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';
import {WithAuthRedirect} from '../../hoc/withAuthRedirect';

class ProfileContainer extends React.Component<any, any> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {

        return (
            <div>
                <Profile profile={this.props.profile} {...this.props} status={this.props.status}
                         updateStatus={this.props.updateStatus}/>
            </div>
        )
    }
}

let AuthRedirectComponent = WithAuthRedirect(ProfileContainer)

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

export default connect(mapStateToProps, {
    getUserProfile: getUserProfileThunkCreator,
    getStatus: getStatusThunkCreator,
    updateStatus: updateStatusThunkCreator
})(WithUrlDataContainerComponent)