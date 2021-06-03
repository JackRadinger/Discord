import React from 'react';
import { NavLink } from 'react-router-dom';
import './SplashPage.css';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux"




function SplashPage() {
    const user = useSelector((state) => state.session.user);
    const history = useHistory();


    return (
        <>
            <div className='splash-wrapper'>
                <div className='splash-image-container'>
                    <div className='splash-header-wrapper'>
                        <div className='login-wrapper'>
                            <button onClick={() => history.push('/login')} className="splash-login-btn">
                            Login
                            </button>
                        </div>
                        <div className='sign-up-wrapper'>
                            <button onClick={() => history.push('/sign-up')} className="splash-sign-up-btn">
                            Sign Up
                            </button>
                        </div>
                    </div>
                    <div className="splash-image">
                        <img
                            className="backgroundImages stripe1-bgImage"
                            src="https://discord.com/assets/11ebd3cd1712fe17b647d846559d7559.svg"
                            alt='Splash Content'
                        />
                        <img
                            className="backgroundImages stripe2-bgImage"
                            src="https://discord.com/assets/d70fa33128cb72c4092abac7a0d25ed2.svg"
                            alt='Splash Content'
                        />
                        <img
                            className="backgroundImages stripe3-bgImage"
                            src="https://discord.com/assets/7df86467c3079db32f8a48aeadc450ca.svg"
                            alt='Splash Content'
                        />
                        <img
                            className="backgroundImages island-bgImage"
                            src="https://discord.com/assets/4bdac631250f5f9e8a4b928d5efa22c8.svg"
                            alt='Splash Content'
                        />
                        <img
                            className="backgroundImages castle2-bgImage"
                            src="https://discord.com/assets/94acf432b564660994742251c2a5f222.svg"
                            alt='Splash Content'
                        />
                        <img
                            className="backgroundImages cloud-bgImage"
                            src="https://discord.com/assets/690c2345bcaaaa50b71548231a26b696.svg"
                            alt='Splash Content'
                        />
                        <img
                            className="backgroundImages cloud2-bgImage"
                            src="https://discord.com/assets/fb628c7d1e7b604e841e10e289148659.svg"
                            alt='Splash Content'
                        />
                        <img
                            className="backgroundImages cloud3-bgImage"
                            src="https://discord.com/assets/1d9b04db64569bf18409a59a32ffd256.svg"
                            alt='Splash Content'
                        />
                        <img
                            className="backgroundImages balloon-bgImage"
                            src="https://discord.com/assets/9c0629769616f9629689a0e68a2e57b7.svg"
                            alt='Splash Content'
                        />
                        <img
                            className="backgroundImages bigCloud-bgImage"
                            src="https://discord.com/assets/1d9b04db64569bf18409a59a32ffd256.svg"
                            alt="Splash Content"
                        />
                        <img
                            className="backgroundImages diamond-bgImage"
                            src="https://discord.com/assets/5cc3db60569965c8bd92a05f6cb09b8d.svg"
                            alt='Splash Content'
                        />
                        <img
                            className="backgroundImages flyingShip-bgImage"
                            src="https://discord.com/assets/31fde13d3508b8ddb01cf817ad09c690.svg"
                            alt='Splash Content'
                        />
                        <img
                            className="foregroundRight"
                            src="https://discord.com/assets/7b01f72a2054561145b6dd04add417c0.svg"
                            alt="Splash Content"
                        />
                        <img
                            className="foregroundLeft"
                            src="https://discord.com/assets/e92fcc9ab6e63c1a17e954af347a1f1d.svg"
                            alt="Splash Content"
                        />
                        <img
                            className="foregroundBuildings"
                            src="https://discord.com/assets/edaebb01cd24df779f6feae9a34bd7d8.svg"
                            alt='Splash Content'
                        />
                    </div>
                </div>
                <div>
                    <h2>Random Info</h2>
                    <div>More Random Info</div>
                </div>
            </div>
        </>
    )
}

export default SplashPage
