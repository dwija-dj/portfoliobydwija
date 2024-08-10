import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { Snackbar, Button } from '@mui/material';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.button`
  background-color: ${({ theme }) => theme.button};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 13px 16px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

const ConfettiContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  pointer-events: none;
`;

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const form = useRef();
  const { width, height } = useWindowSize();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_e9lj0ow', 'template_5c23tk8', form.current, 'WWT4pOBsUiJKuxFy9')
      .then((result) => {
        console.log(result.text);
        setOpen(true);
        setConfetti(true);
        setTimeout(() => setConfetti(false), 6000); // stop confetti after 10 seconds
        form.current.reset();
      }, (error) => {
        console.log(error.text);
      });
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  return (
    <Container>
      {confetti && (
        <ConfettiContainer>
          <Confetti width={width} height={height} />
        </ConfettiContainer>
      )}
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Get in Touch</ContactTitle>
          <ContactInput placeholder="Your Name" name="from_name" required />
          <ContactInput placeholder="Subject" name="subject" required />
          <ContactInput placeholder="Your Email" name="from_email" type="email" required />
          <ContactInputMessage placeholder="Message" rows="4" name="message" required />
          <ContactButton type="submit">Send</ContactButton>
        </ContactForm>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Message sent successfully!"
          action={
            <Button color="inherit" onClick={handleCloseSnackbar}>
              Close
            </Button>
          }
        />
      </Wrapper>
    </Container>
  );
};

export default Contact;
