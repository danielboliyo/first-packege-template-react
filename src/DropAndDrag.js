import React, { useState } from 'react';

export function DropAndDrag(props) {
  const [media, setMedia] = useState(null);
  const [image, setImage] = useState(null);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setMedia(event.dataTransfer.files[0]);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const video = document.createElement('video');
    video.src = URL.createObjectURL(media);
    video.currentTime = value;
    video.oncanplay = () => {
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      ctx.drawImage(video, 0, 0);
      setImage(canvas.toDataURL());
    };
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {props.render(media, image, handleChange)}
    </div>
  );
}

export function Preview(props) {
  const { media, image, handleChange } = props;

  if (!media) {
    return <p>Drop an image or video to preview it</p>;
  }

  if (media.type.startsWith('image')) {
    return <img src={URL.createObjectURL(media)} alt="Preview" />;
  }

  if (media.type.startsWith('video')) {
    return (
      <>
        <video src={URL.createObjectURL(media)} alt="Preview" />
        {image && <img src={image} alt="Frame preview" />}
        <input type="range" min={0} max={media.duration} onChange={handleChange} />
      </>
    );
  }

  return <p>Unsupported media type</p>;
}

export function App() {
  return (
    <DropAndDrag
      render={(media, image, handleChange) => (
        <Preview media={media} image={image} handleChange={handleChange} />
      )}
    />
  );
}

