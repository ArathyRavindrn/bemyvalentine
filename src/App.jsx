import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import config from "./config";

function App() {
  const [answered, setAnswered] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showSongs, setShowSongs] = useState(false);
  const [daysCount, setDaysCount] = useState(0);
  const [noButtonStyle, setNoButtonStyle] = useState({});

  useEffect(() => {
    // Calculate days together
    const startDate = new Date(config.loveStartDate);
    const today = new Date();
    const days = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    setDaysCount(days);

    // Floating hearts animation
    createFloatingHearts();
  }, []);

  const createFloatingHearts = () => {
    const heartsContainer = document.querySelector(".hearts");
    if (!heartsContainer) return;

    for (let i = 0; i < 10; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.animationDelay = Math.random() * 5 + "s";
      heart.style.animationDuration = (Math.random() * 8 + 10) + "s";
      heartsContainer.appendChild(heart);
    }
  };

  const handleYes = () => {
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.5 },
    });
    setAnswered(true);
  };

  const handleNoHover = () => {
    setNoButtonStyle({
      position: "absolute",
      left: Math.random() * 80 + "%",
      top: Math.random() * 80 + "%",
    });
  };

  return (
    <div className="app">
      <div className="hearts"></div>

      {!answered ? (
        <div>
          <h1>{config.names.sender}</h1>
          <h2>{config.content.title}</h2>
          <p className="subtitle">{config.content.subtitle}</p>

          <div style={{ marginTop: "40px", position: "relative", height: "100px" }}>
            <button className="yes-btn" onClick={handleYes}>
              {config.content.yesButtonText}
            </button>
            <button
              className="no-btn"
              onMouseEnter={handleNoHover}
              style={noButtonStyle}
            >
              {config.content.noButtonText}
            </button>
          </div>

          <div className="timer">
            <p>We've been together for <strong>{daysCount}</strong> days 💕</p>
          </div>
        </div>
      ) : (
        <div>
          <div className="secret-box">
            <h2>🎉 Success! 💌</h2>
            <p>{config.content.successMessage}</p>
            <p style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
              {config.content.secretMessage}
            </p>
          </div>

          <div style={{ marginTop: "30px" }}>
            <button className="yes-btn" onClick={() => setShowPhotos(!showPhotos)}>
              {showPhotos ? "Hide Photos 📸" : "View Photos 📸"}
            </button>
            <button className="yes-btn" onClick={() => setShowSongs(!showSongs)}>
              {showSongs ? "Hide Songs 🎵" : "View Our Songs 🎵"}
            </button>
          </div>

          {showPhotos && (
            <div style={{ marginTop: "30px" }}>
              <h3>Our Memories 💫</h3>
              <div className="photos-grid">
                {config.couplePhotos.map((photo, idx) => (
                  <div key={idx} style={{ marginBottom: "20px" }}>
                    <img
                      src={photo.image}
                      alt={photo.caption}
                      style={{
                        maxWidth: "300px",
                        borderRadius: "15px",
                        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                      }}
                    />
                    <p style={{ marginTop: "10px", color: "#666" }}>{photo.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showSongs && (
            <div className="music-section">
              <h3>Our Favorite Songs 🎵</h3>
              <div className="song-grid">
                {config.songs.map((song, idx) => (
                  <div key={idx} className="song-card">
                    <img src={song.cover} alt={song.title} />
                    <h4>{song.title}</h4>
                    <p>{song.artist}</p>
                    <audio controls style={{ width: "100%" }}>
                      <source src={song.audio} type="audio/mpeg" />
                    </audio>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
