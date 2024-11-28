import ProductsLayout from '../layout';
import { useState, useRef } from 'react';
import { GetStaticProps } from 'next';

interface MockInterviewDetailsProps {
  interviews: string[];
}

const MockInterviewDetails = ({ interviews }: MockInterviewDetailsProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting video recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      const recordedBlob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(recordedBlob);

      // Download the recording
      const link = document.createElement('a');
      link.href = url;
      link.download = `mock-interview-${Date.now()}.webm`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset
      recordedChunksRef.current = [];
    }
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % interviews.length);
  };

  return (
    <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif', height: '100vh' }}>
      {/* Left: Questions Section */}
      <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ccc' }}>
        <h1>Mock Interview</h1>
        <p>Question:</p>
        <h3>{interviews[currentQuestionIndex]}</h3>
        <button
          onClick={nextQuestion}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Next Question
        </button>
      </div>

      {/* Right: Video Recording Section */}
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>Record Your Response</h2>
        <video
          ref={videoRef}
          style={{
            width: '100%',
            height: '300px',
            backgroundColor: 'black',
            marginBottom: '20px',
          }}
          autoPlay
          muted
        ></video>
        {!isRecording ? (
          <button
            onClick={startRecording}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: 'green',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Stop Recording
          </button>
        )}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Simulating a fetch operation (replace with an actual API call if needed)
    const interviews = [
      'Tell me about yourself.',
      'What are your strengths and weaknesses?',
      'Explain a challenging project you worked on.',
      'Where do you see yourself in 5 years?',
    ];

    return {
      props: { interviews },
    };
  } catch (error) {
    console.error('Error fetching interview data:', error);

    return {
      notFound: true, // If fetching fails, return 404
    };
  }
};

export default function MockInterviews() {
  return (
    <ProductsLayout>
      <MockInterviewDetails
        interviews={[
          'Tell me about yourself.',
          'What are your strengths and weaknesses?',
          'Explain a challenging project you worked on.',
          'Where do you see yourself in 5 years?',
        ]}
      />
    </ProductsLayout>
  );
}
