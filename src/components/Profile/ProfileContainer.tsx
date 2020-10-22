import React from 'react'
import Profile from './Profile';
import {connect} from 'react-redux';
import {getUserProfileThunkCreator} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';
import {WithAuthRedirect} from '../../hoc/withAuthRedirect';

class ProfileContainer extends React.Component<any, any> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = 2
        }
        this.props.getUserProfile(userId)
    }

    render() {

        return (
            <div>
                <Profile profile={this.props.profile} {...this.props} />
            </div>
        )
    }
}

let AuthRedirectComponent = WithAuthRedirect(ProfileContainer)

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile
})

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

export default connect(mapStateToProps, {
    getUserProfile: getUserProfileThunkCreator
})(WithUrlDataContainerComponent)