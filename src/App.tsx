import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import {BrowserRouter, Route} from 'react-router-dom';
import state from './redux/state'

const App = () => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <Dialogs dialogs={state.dialogsPage.dialogs} messages={state.dialogsPage.messages}/>} />
                    <Route path='/profile' render={() => <Profile posts={state.profilePage.posts}
                                                                  newPostText={state.profilePage.newPostText}
                                                                  addPost={state.profilePage.addPost}
                                                                  updateNewPostText={state.profilePage.updateNewPostText}/>} />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
