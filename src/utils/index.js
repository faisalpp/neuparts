
import { toast } from "react-toastify";

export function limitString(inputString,maxLength){
    if (inputString.length > maxLength) {
        return inputString.substring(0, maxLength) + '...';
    }
    return inputString;
}

export function copyLinkToClipboard(anchorRef,url){
    if (!anchorRef.current) return;

    // Create a temporary textarea element to copy the link
    const textarea = document.createElement('textarea');
    textarea.value = url;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);

    // Select the link text and copy it to the clipboard
    textarea.select();
    document.execCommand('copy');
     toast.success('Link copied!')
    // Clean up
    document.body.removeChild(textarea);
  };

  export function GetYoutubeCode(urls){  
    if(urls.includes('youtube') || urls.includes('youtu.be')){ 
    let m = urls.split('/')
    m = m[m.length-1]
     if(m.includes('watch?v=')){
      let code = m.split('=')
      return code[1]
     }else{
      return m
     }
    }else{
     return false;
    }
   }

 export function generateSlug(title) {
   return title
       .toLowerCase() // Convert to lowercase
       .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
       .trim() // Remove leading/trailing spaces
       .replace(/\s+/g, '-') // Replace spaces with hyphens
       .replace(/-+/g, '-') // Remove consecutive hyphens
       .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
  }


export function checkSlugForDigit(input) {
    const regex = /-\d+$/;
    const match = regex.test(input);
    (match)
    if (match) {
      return match[1]; // Returns the digits
    } else {
      return null; // No match found
    }
}


export function formatString(input) {
  return input
      .split('-') // Split the string into an array by hyphens
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(' '); // Join the array back into a single string
}