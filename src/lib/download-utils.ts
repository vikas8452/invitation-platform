import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const downloadAsImage = async (elementId: string, filename: string = 'invitation') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID '${elementId}' not found`);
    }

    console.log('Found element:', element);

    // Wait for any images to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Try using dom-to-image library approach (simulated with html2canvas)
    const canvas = await html2canvas(element, {
      scale: 1,
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: false,
      removeContainer: false,
      imageTimeout: 0,
      onclone: (clonedDoc) => {
        // Clean up any problematic elements in the cloned document
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          // Remove any elements that might cause issues
          const problematicElements = clonedElement.querySelectorAll('iframe, embed, object, script');
          problematicElements.forEach(el => el.remove());
          
          // Convert any lab() colors to rgb
          const allElements = clonedElement.querySelectorAll('*');
          allElements.forEach(el => {
            const computedStyle = window.getComputedStyle(el);
            if (computedStyle.color.includes('lab')) {
              (el as HTMLElement).style.color = '#000000';
            }
            if (computedStyle.backgroundColor.includes('lab')) {
              (el as HTMLElement).style.backgroundColor = '#ffffff';
            }
            if (computedStyle.borderColor.includes('lab')) {
              (el as HTMLElement).style.borderColor = '#000000';
            }
          });
        }
      }
    });

    console.log('Canvas created successfully:', canvas);

    // Create download link
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('PNG download initiated successfully');
  } catch (error) {
    console.error('Error downloading PNG:', error);
    
    // Ultimate fallback: Create a simple canvas-based image
    try {
      console.log('Trying ultimate fallback - canvas method...');
      const element = document.getElementById(elementId);
      if (element) {
        // Create a simple canvas and draw the element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Set canvas size to match element
          canvas.width = element.offsetWidth;
          canvas.height = element.offsetHeight;
          
          // Fill with white background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw a simple representation
          ctx.fillStyle = '#000000';
          ctx.font = '16px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('Invitation Preview', canvas.width / 2, canvas.height / 2);
          ctx.fillText('(Use browser print for full version)', canvas.width / 2, canvas.height / 2 + 30);
          
          // Download the canvas as PNG
          const link = document.createElement('a');
          link.download = `${filename}.png`;
          link.href = canvas.toDataURL('image/png', 1.0);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          console.log('Fallback PNG download successful');
        } else {
          throw new Error('Unable to create canvas context');
        }
      }
    } catch (fallbackError) {
      console.error('Ultimate fallback also failed:', fallbackError);
      throw error;
    }
  }
};

export const downloadAsPDF = async (elementId: string, filename: string = 'invitation') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID '${elementId}' not found`);
    }

    console.log('Found element for PDF:', element);

    // Wait for any images to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Use html2canvas with onclone callback to clean up the cloned document
    const canvas = await html2canvas(element, {
      scale: 1,
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: false,
      removeContainer: false,
      imageTimeout: 0,
      onclone: (clonedDoc) => {
        // Clean up any problematic elements in the cloned document
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          // Remove any elements that might cause issues
          const problematicElements = clonedElement.querySelectorAll('iframe, embed, object, script');
          problematicElements.forEach(el => el.remove());
          
          // Convert any lab() colors to rgb
          const allElements = clonedElement.querySelectorAll('*');
          allElements.forEach(el => {
            const computedStyle = window.getComputedStyle(el);
            if (computedStyle.color.includes('lab')) {
              (el as HTMLElement).style.color = '#000000';
            }
            if (computedStyle.backgroundColor.includes('lab')) {
              (el as HTMLElement).style.backgroundColor = '#ffffff';
            }
            if (computedStyle.borderColor.includes('lab')) {
              (el as HTMLElement).style.borderColor = '#000000';
            }
          });
        }
      }
    });

    console.log('Canvas created for PDF:', canvas);

    // Convert canvas to image data
    const imgData = canvas.toDataURL('image/png', 1.0);
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Calculate dimensions to preserve aspect ratio and fit properly
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const margin = 15; // Leave margins
    
    // Calculate the maximum dimensions that fit in the page
    const maxWidth = pdfWidth - (margin * 2);
    const maxHeight = pdfHeight - (margin * 2);
    
    // Calculate scaling to fit the image properly
    const scaleX = maxWidth / canvas.width;
    const scaleY = maxHeight / canvas.height;
    const scale = Math.min(scaleX, scaleY, 1); // Don't scale up
    
    const imgWidth = canvas.width * scale;
    const imgHeight = canvas.height * scale;
    
    // Center the image on the page
    const x = (pdfWidth - imgWidth) / 2;
    const y = (pdfHeight - imgHeight) / 2;
    
    console.log('PDF dimensions:', { 
      pdfWidth, 
      pdfHeight, 
      imgWidth, 
      imgHeight, 
      x, 
      y, 
      scale 
    });

    // Add image to PDF with proper centering
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

    // Save PDF
    pdf.save(`${filename}.pdf`);
    console.log('PDF download initiated successfully');
  } catch (error) {
    console.error('Error downloading PDF:', error);
    
    // Ultimate fallback: Use browser's native print functionality with proper formatting
    try {
      console.log('Trying ultimate PDF fallback - print method...');
      const element = document.getElementById(elementId);
      if (element) {
        // Create a new window with just the invitation
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (printWindow) {
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>${filename}</title>
                <style>
                  body { 
                    margin: 0; 
                    padding: 20px; 
                    background: white; 
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                  }
                  .invitation-container {
                    max-width: 100%;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transform: scale(1);
                  }
                  @media print {
                    body { margin: 0; padding: 0; }
                    .invitation-container { 
                      box-shadow: none; 
                      transform: scale(1);
                      page-break-inside: avoid;
                    }
                    @page {
                      margin: 0.5in;
                      size: A4;
                    }
                  }
                </style>
              </head>
              <body>
                <div class="invitation-container">
                  ${element.outerHTML}
                </div>
                <script>
                  window.onload = function() {
                    setTimeout(() => {
                      window.print();
                      setTimeout(() => window.close(), 1000);
                    }, 500);
                  };
                </script>
              </body>
            </html>
          `);
          printWindow.document.close();
        } else {
          throw new Error('Unable to open print window');
        }
      }
    } catch (fallbackError) {
      console.error('Ultimate PDF fallback also failed:', fallbackError);
      throw error;
    }
  }
};

export const generateInvitationSlug = (eventName: string, hostName: string): string => {
  const cleanEventName = eventName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').trim('-');
  const cleanHostName = hostName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').trim('-');
  const timestamp = Date.now().toString().slice(-6);
  
  return `${cleanHostName}-${cleanEventName}-${timestamp}`;
};

export const shareInvitation = async (url: string, title: string, text: string) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url
      });
    } catch (error) {
      // User cancelled or error occurred
      console.log('Share cancelled or failed');
    }
  } else {
    // Fallback - copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      return { success: true, message: 'Link copied to clipboard!' };
    } catch (error) {
      return { success: false, message: 'Failed to copy link' };
    }
  }
};

