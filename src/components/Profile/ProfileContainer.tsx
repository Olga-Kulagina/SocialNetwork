import React from 'react'
import Profile from './Profile';
import {connect} from 'react-redux';
import {
    getStatusThunkCreator,
    getUserProfileThunkCreator,
    savePhotoThunkCreator,
    updateStatusThunkCreator
} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';
import {WithAuthRedirect} from '../../hoc/withAuthRedirect';

class ProfileContainer extends React.Component<any, any> {

    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {

        return (
            <div>
                <Profile isOwner={!this.props.match.params.userId}
                         profile={this.props.profile} {...this.props} status={this.props.status}
                         updateStatus={this.props.updateStatus}
                         savePhoto={this.props.savePhoto}/>
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
    updateStatus: updateStatusThunkCreator,
    savePhoto: savePhotoThunkCreator
})(WithUrlDataContainerComponent)