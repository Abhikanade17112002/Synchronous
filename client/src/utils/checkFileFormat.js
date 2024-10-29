export const checkFileFormat = (fileUrl) => {
    // Regular expression to check if the URL ends with common image formats
    const imageFormats = /\.(jpeg|jpg|png|gif|bmp|svg|webp)$/i;
    return imageFormats.test(fileUrl);
  };