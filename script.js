const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const capturedImage = document.getElementById('capturedImage');
const startCameraBtn = document.getElementById('startCamera');
const captureBtn = document.getElementById('captureBtn');
const retakeBtn = document.getElementById('retakeBtn');
const submitBtn = document.getElementById('submitBtn');
const errorMsg = document.getElementById('errorMsg');
let stream = null;
let photoTaken = false;

// Start camera
startCameraBtn.addEventListener('click', async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.style.display = 'block';
        startCameraBtn.style.display = 'none';
        captureBtn.style.display = 'block';
        errorMsg.textContent = '';
    } catch (err) {
        errorMsg.textContent = 'Camera access denied. Please allow camera access.';
    }
});

// Capture photo
captureBtn.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/png');
    capturedImage.src = imageData;
    capturedImage.style.display = 'block';
    
    video.style.display = 'none';
    captureBtn.style.display = 'none';
    retakeBtn.style.display = 'block';
    
    // Stop camera
    stream.getTracks().forEach(track => track.stop());
    photoTaken = true;
    submitBtn.disabled = false;
});

// Retake photo
retakeBtn.addEventListener('click', async () => {
    capturedImage.style.display = 'none';
    retakeBtn.style.display = 'none';
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.style.display = 'block';
    captureBtn.style.display = 'block';
    photoTaken = false;
    submitBtn.disabled = true;
});

// Calculate age function
function calculateAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}

// Form submission
document.getElementById('birthdayForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    
    if (!photoTaken) {
        errorMsg.textContent = 'Please capture your photo first!';
        return;
    }
    
    // Calculate age
    const age = calculateAge(dob);
    
    // Store data in localStorage
    localStorage.setItem('birthdayName', name);
    localStorage.setItem('birthdayAge', age);
    localStorage.setItem('birthdayPhoto', capturedImage.src);
    
    // Redirect to celebration page
    window.location.href = 'celebrate.html';
});

