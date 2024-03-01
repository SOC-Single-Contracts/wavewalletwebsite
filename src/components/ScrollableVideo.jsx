import React, { useState, useEffect, useRef } from 'react';
import '../styles/scrollVideoPlayer.css';
import AOS from "aos";
import "aos/dist/aos.css";

const ScrollVideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  // Introduce a state to track if the modal has been opened at least once
  const [hasModalBeenOpened, setHasModalBeenOpened] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [scrollCount, setScrollCount] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);


  // Assuming the next section is within the same component
const nextSectionRef = useRef(null);

// Function to scroll to the next section
const scrollToNextSection = () => {
  if (nextSectionRef.current) {
    nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  }
};

// Update handleVideoEnd to include scrolling
const handleVideoEnd = () => {
  setIsVideoFinished(true);
  handleCloseModal();
  scrollToNextSection(); // Scroll to the next section when the video ends
};


  useEffect(() => {
    document.body.style.overflowY = modalOpen ? 'hidden' : 'auto';
  }, [modalOpen]);

  const handleCloseModal = () => {
    setModalOpen(false);
    resetPlaybackRate();
  };



  const resetPlaybackRate = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  };


 


  const handleScroll = () => {
    if(modalOpen){
      document.body.overflowY = 'hidden';
    }
    else{
      document.body.overflowY = 'scroll';
    }
    const direction = window.scrollY < lastScrollY ? 'up' : 'down';
    setLastScrollY(window.scrollY);

   
  
    if (!videoRef.current) return;

    // Adjust playback only if the modal is open
    if (modalOpen) {
      if (direction === 'up') {
        videoRef.current.currentTime -= 2; // Skip back 2 seconds on scroll up
      } else {
        videoRef.current.playbackRate = 3; // Increase playback speed on scroll down
      }
    } else {
      // Increment scroll count only if modal hasn't been opened yet
      if (!hasModalBeenOpened) {
        setScrollCount((prevCount) => prevCount + 1);
      }
    }

    // Open the modal on the first 10 scrolls only
    if (scrollCount >= 9 && !hasModalBeenOpened && !isVideoFinished) {
      setModalOpen(true);
      setHasModalBeenOpened(true); // Prevent modal from opening again on further scrolls
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleVideoEnd = () => {
        console.log('Video has ended.');
        setIsVideoFinished(true);
        handleCloseModal();
      };
  
      // Add event listener
      videoElement.addEventListener('ended', handleVideoEnd);
  
      // Cleanup function to remove event listener
      return () => {
        videoElement.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, []);
  

  useEffect(() => {
    if (modalOpen && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video play failed:", error);
      });
    }
  }, [modalOpen]);
  
  useEffect(() => {
    const scrollHandler = handleScroll;
  
    window.addEventListener('scroll', scrollHandler, { passive: true });
  
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [modalOpen, scrollCount, isVideoFinished, lastScrollY, hasModalBeenOpened]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <>
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={handleCloseModal}
          data-aos="fade-up"
        >
          <video
          id="myVideo"
            ref={videoRef}
            src={videoUrl}
            autoPlay
            muted
            onEnded={handleVideoEnd}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '130%', maxHeight: '100%', borderRadius: '10px' }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {!modalOpen && (
        <video
        
          ref={videoRef}
          src={videoUrl}
          width="70%"
          className="scrollVideoPlayer"
        >
          Your browser does not support the video tag.
        </video>

        
      )}

<div ref={nextSectionRef}></div>

    </>
  );
};

export default ScrollVideoPlayer;
