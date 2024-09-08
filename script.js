const resumeForm = document.getElementById('resumeForm');
const resumeContainer = document.getElementById('resumeContainer');

// Resume details elements
const resumeName = document.getElementById('resumeName');
const resumeEmail = document.getElementById('resumeEmail');
const resumeEducation = document.getElementById('resumeEducation');
const resumeWorkExperience = document.getElementById('resumeWorkExperience');
const resumeSkills = document.getElementById('resumeSkills');
const profilePic = document.getElementById('profilePic');
const resumeProfilePic = document.getElementById('resumeProfilePic');

// Event listener for form submission
resumeForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Capture user input from form fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const education = document.getElementById('education').value;
    const workExperience = document.getElementById('workExperience').value;
    const skills = document.getElementById('skills').value;

    // Handle image upload
    const imageUpload = document.getElementById('imageUpload').files[0];
    if (imageUpload) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePic.src = e.target.result; // Set the profile picture on the form
            resumeProfilePic.src = e.target.result; // Set the profile picture on the resume preview
            profilePic.classList.remove('hidden'); // Show profile picture in form
            resumeProfilePic.classList.remove('hidden'); // Show profile picture in resume preview
        };
        reader.readAsDataURL(imageUpload);
    }

    // Update resume preview section with form data
    resumeName.innerText = name;
    resumeEmail.innerText = email;
    resumeEducation.innerText = education;
    resumeWorkExperience.innerText = workExperience;
    resumeSkills.innerText = skills;

    // Show the resume container (resume preview)
    resumeContainer.classList.remove('hidden');

    // Optionally clear the form after submission
    resumeForm.reset();
});

// Event listener for "Download as PDF" button
document.getElementById('resumeDownload').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Adding content to the PDF
    doc.setFontSize(22);
    doc.text(resumeName.innerText, 20, 30);
    doc.setFontSize(16);
    doc.text(resumeEmail.innerText, 20, 40);
    doc.text("Education: " + resumeEducation.innerText, 20, 50);
    doc.text("Work Experience: " + resumeWorkExperience.innerText, 20, 60);
    doc.text("Skills: " + resumeSkills.innerText, 20, 70);

    // Add profile image if available
    if (resumeProfilePic.src) {
        doc.addImage(resumeProfilePic.src, 'JPEG', 20, 80, 50, 50); // Add profile image
    }

    // Save the PDF
    doc.save('resume.pdf');
});

// Event listener for "Edit Resume" button (optional, if you want to allow going back to editing)
document.getElementById('editResume').addEventListener('click', function () {
    resumeContainer.classList.add('hidden');
});
