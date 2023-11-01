import {TextInput, Title, Text, Button, Center, Flex, Image, Modal, Notification, Container} from "@mantine/core";
import Navbar from "../components/Navbar";
import {Link, useNavigate} from "react-router-dom";
import Bottombar from "../components/Bottombar";
import {useDisclosure, useViewportSize} from "@mantine/hooks";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Sha256} from "@aws-crypto/sha256-js";
import {Buffer} from 'buffer';
import Cookies from "universal-cookie";
import IconCancel from "../assets/message-icons/icons8-cancel.svg";
import IconCheck from "../assets/message-icons/icons8-checkmark-150.svg";

function Signin(){
    const navigate = useNavigate();
    const { width, height } = useViewportSize();
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [overlayClosable, setOverlayClosable] = useState(false);

    /* Managining the modal */
    const [opened, { open, close }] = useDisclosure(false);

    const [email, setEmail] = useState('sunilperera@gmail.com');
    const [password, setPassword] = useState('');

    const [buttonEnabled, setButtonEnabled] = useState(true);

    /* Managing modal elements */
    const [modalColor, setModalColor] = useState('green.9');
    const [modalText, setModalText] = useState('');
    const [modalIcon, setModalIcon] = useState(IconCancel);

    /* Checking the validity of email and password */
    useEffect(() => {
        const emailReg = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

        if(!emailReg.test(email)){
            /* Email not in the correct pattern */
            setButtonEnabled(false);
        }else if(password === '' || password === null){
            /* Empty password */
            setButtonEnabled(false);
        } else {
            setButtonEnabled(true);
        }
    }, [email, password]);

    /* Send the request and obtain jwt token */
    async function validateSignIn(){
        /* Display the overlay */
        setOverlayVisible(true);
        setOverlayClosable(false);
        open();

        setModalColor('green.9');
        setModalColor('Please wait as we checking your account. Almost there..');

        /* Creating hash for the password using SHA-256 */
        let hash = new Sha256();
        hash.update(password)
        const hashedPassword = await hash.digest();
        const hashedPasswordStr = Buffer.from(hashedPassword).toString('hex');

        /* Axios call to the backend for authentication */
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
            email: email,
            password: hashedPasswordStr
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
            /* User got authenticated */
            setOverlayClosable(true);
            setModalIcon(IconCheck);
            setModalText('You\'re successfully signed in!');
            setModalColor('green.9');

            /* Saving the access token in cookies */
            const cookie = new Cookies();
            cookie.set('Access-Token', response.data.access_token);

            /* Hiding the success modal */
            setTimeout(() => {
                closeModal();
                setModalColor('green.9');
                setModalText('');

                /* Redirect to the home page */
                navigate('/');
            }, 3000);
        })
            .catch((err) => {
                const statusCode = err.response ? err.response.status: 500;

                if(statusCode === 404){
                    setModalText('The entered account doesn\'t exists!');
                }else if(statusCode === 401){
                    setModalText('The entered email and password don\'t match');
                } else {
                    setModalText('Something went wrong! Please try later');
                }

                setOverlayClosable(true);
                setModalIcon(IconCancel);
                setModalColor('red.9');
            });
    }

    /* Closing the overlay */
    function closeModal(){
        close();
    }

    return (
        <>
            { overlayVisible &&
                 <Modal opened={opened} onClose={close} withCloseButton={false} closeOnClickOutside={overlayClosable} centered>
                     <Flex direction='row' align='center' justify='center'>
                         <Image src={modalIcon} maw={32} mx={12}/>
                        <Title weight='normal' ml={4} order={4} align='center' color={modalColor}>{modalText}</Title>
                     </Flex>
                 </Modal>
            }
            <Navbar protectedRoute={false} />
            {/* Main container which contains Sign in page */}
            <Flex direction='column' align='center' justify='center' w={width * 0.4} h={height - 96} py='auto' mx='auto' >
                <Title order={1} align='center' my={16}>Sign in to your studio account</Title>
                <TextInput w={320} my={12} mx='auto' id='input-email' label='Email address' type='email' placeholder="Enter you'r email address" value={email} onChange={(event) => setEmail(event.target.value)} />
                <TextInput w={320} my={12} mx='auto' id='input-password' label='Password' type='password' placeholder="Enter you'r password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                <Text size={14} align='center'>No account?<Link to='/'>Register now</Link></Text>
                <Center my={12}>
                    <Button variant='filled' id='button-signin' color='primary' disabled={!buttonEnabled} onClick={validateSignIn}>Sign in</Button>
                </Center>
            </Flex>
            <Bottombar />
        </>
    );
}

export default Signin;