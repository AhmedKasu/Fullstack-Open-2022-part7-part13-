import { MDBFooter, MDBContainer, MDBBtn } from 'mdb-react-ui-kit';
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <MDBFooter className='text-center text-white Footer'>
      <MDBContainer className='pt-4'>
        <section className='mb-4'>
          <MDBBtn
            rippleColor='dark'
            color='link'
            floating
            size='lg'
            className='text-dark m-1'
            href='https://www.linkedin.com/in/ahmed-kasu-575021211'
            role='button'>
            <FaLinkedin />
          </MDBBtn>

          <MDBBtn
            rippleColor='dark'
            color='link'
            floating
            size='lg'
            className='text-dark m-1'
            href='https://github.com/AhmedKasu?tab=repositories'
            role='button'>
            <FaGithub />
          </MDBBtn>

          <MDBBtn
            rippleColor='dark'
            color='link'
            floating
            size='lg'
            className='text-dark m-1'
            href='https://www.facebook.com/'
            role='button'>
            <FaFacebook />
          </MDBBtn>

          <MDBBtn
            rippleColor='dark'
            color='link'
            floating
            size='lg'
            className='text-dark m-1'
            href='https://www.instagram.com/'
            role='button'>
            <FaInstagram />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div
        className='text-center text-dark p-3'
        style={{ backgroundColor: '#96a3ae' }}>
        © Ahmed Kasu fullstackopen 2022:
        <a
          className='text-dark'
          href='https://fullstackopen.com/en/part7/exercises_extending_the_bloglist'>
          www.fullstackopen.com
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;
