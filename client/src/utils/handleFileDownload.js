export const handleFileDownload = async (fileUrl) => {
    try {
      const response = await fetch(fileUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Create a blob from the response
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
  
      // Create an anchor element and set the download attribute
      const link = document.createElement('a');
      link.href = downloadUrl;
      
      // Extract the file name from the URL
      const fileName = fileUrl.split('/').pop();
      link.download = fileName;
  
      // Append the link to the DOM (not visible) and trigger the click event
      document.body.appendChild(link);
      link.click();
  
      // Cleanup: Remove the link and revoke the URL object
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };