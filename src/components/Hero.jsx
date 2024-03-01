import React from "react";
import heroVideo from '../assests/heroVideo.mp4';
import heroPic from '../assests/heroPic.png';
import "../styles/hero.css";
import ScrollVideoPlayer from "./ScrollableVideo";
import video from './video2.mp4'

const Hero = () => {
  return (
    <div className="heroMain">
      <div className="heroTop">
        <h1 className="topHeading">
          Best <span className="blueText">Web3</span> Wallet Entrance To <br />{" "}
          Crypto World 🚀
        </h1>
      </div>

      <div className="midDiv">
        <img
          className="svgImage"
          src="https://www.svgrepo.com/show/303139/google-play-badge-logo.svg"
          alt="Get it on Google Play"
        />

        <img
          className="svgImage"
          src="https://www.svgrepo.com/show/303128/download-on-the-app-store-apple-logo.svg"
          alt="Get it on App Store"
        />
      </div>

      <div className="heroVideo">
        {/* <video className="video" src={heroVideo} autoPlay loop muted /> */}
        {/* <img src={heroPic} alt="picture" /> */}
        <ScrollVideoPlayer  className="video" videoUrl={video} />

      </div>
    </div>
  );
};

export default Hero;
