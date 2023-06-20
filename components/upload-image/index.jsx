import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Button from "@components/button";
import styles from "./upload-image.module.css";
import BlogImageBanner from "@components/blog-image-banner";

const ImageUpload = ({ onImageUpload, onReset, src, className }) => {
  const [previewUrl, setPreviewUrl] = useState(() => {
    if (src) {
      if (typeof src === "string") {
        return src;
      }
      return URL.createObjectURL(src);
    }
    return null;
  });
  const hiddenImageInputRef = useRef(null);

  // Update the previewUrl whenever the src prop is updated
  useEffect(() => {
    if (src) {
      if (typeof src === "string") {
        setPreviewUrl(src);
      } else {
        setPreviewUrl(URL.createObjectURL(src));
      }
    } else {
      setPreviewUrl(null);
    }
  }, [src]);

  const handleImageSelect = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      onImageUpload(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      onImageUpload(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const resetImage = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setPreviewUrl(null);

    if (typeof onReset === "function") {
      onReset();
    }
  };

  return (
    <div
      className={classNames(styles.container, className)}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {previewUrl ? (
        <>
          <BlogImageBanner src={previewUrl} alt="Preview" />
          <div className={styles.overlay}>
            <Button
              type="button"
              onClick={() => {
                if (hiddenImageInputRef.current) {
                  hiddenImageInputRef.current.click();
                }
              }}
            >
              Edit
            </Button>
            <Button type="button" onClick={resetImage}>
              Trash
            </Button>
          </div>
        </>
      ) : (
        <label className={styles.label}>
          <span className={styles.text}>Upload photo</span>
          <input
            type="file"
            accept="image/*"
            className={styles.input}
            onChange={handleImageSelect}
          />
        </label>
      )}
      <input
        ref={hiddenImageInputRef}
        type="file"
        accept="image/*"
        className={styles.hiddenInput}
        onChange={handleImageSelect}
      />
    </div>
  );
};

export default ImageUpload;
