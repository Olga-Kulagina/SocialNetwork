import React from 'react';

export class ProfileStatus extends React.Component<any, any> {

    state = {
        editMode: false
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
    }

    render() {
        return (
            <>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input onBlur={this.deactivateEditMode}
                           autoFocus={true}
                           type='text' value={this.props.status}/>
                </div>
                }
            </>
        )
    }
}