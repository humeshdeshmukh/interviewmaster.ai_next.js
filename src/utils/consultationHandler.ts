interface ConsultationData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  jobTitle?: string;
  consultationType: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  experience: string;
  goals: string[];
  heardFrom: string;
}

export const submitToGoogleForm = async (data: ConsultationData) => {
  // Replace with your Google Form URL
  const GOOGLE_FORM_URL = "YOUR_GOOGLE_FORM_URL";
  
  try {
    const formData = new FormData();
    // Map your form fields to Google Form fields
    // You'll need to update these entry.X values based on your actual Google Form
    formData.append('entry.1234567890', data.name);
    formData.append('entry.0987654321', data.email);
    formData.append('entry.1111111111', data.phone);
    formData.append('entry.2222222222', data.consultationType);
    formData.append('entry.3333333333', data.preferredDate);
    formData.append('entry.4444444444', data.preferredTime);
    formData.append('entry.5555555555', data.message);
    formData.append('entry.6666666666', data.experience);
    formData.append('entry.7777777777', data.goals.join(', '));
    formData.append('entry.8888888888', data.heardFrom);

    const response = await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });

    return true;
  } catch (error) {
    console.error('Error submitting form:', error);
    return false;
  }
};

export const sendEmailNotification = async (data: ConsultationData) => {
  try {
    const response = await fetch('/api/send-consultation-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'humeshdeshmukh0@gmail.com',
        subject: `New Consultation Request from ${data.name}`,
        data: data
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
