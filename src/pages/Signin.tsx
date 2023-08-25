import {TextInput, Title, Text, Button, Center, Flex, Overlay, Modal, Notification} from "@mantine/core";
import Navbar from "../components/Navbar";
import {Link, redirect, useNavigate} from "react-router-dom";
import Bottombar from "../components/Bottombar";
import {useDisclosure, useViewportSize} from "@mantine/hooks";
import React, {useEffect, useState} from "react";
import { IconCheck } from '@tabler/icons-react';

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
    function validateSignIn(){
        /* Display the overlay */
        setOverlayVisible(true);
        open();
    }

    /* Closing the overlay */
    function closeModal(){

    }

    return (
        <>
            { overlayVisible &&
                 <Modal opened={opened} onClose={close} withCloseButton={overlayClosable} centered>
                     <IconCheck size="1.1rem" />
                 </Modal>
                 }
            <Navbar />
            {/* Main container which contains Sign in page */}
            <Flex direction='column' align='center' justify='center' w={width * 0.4} h={height - 96} py='auto' mx='auto' >
                <Title order={1} align='center' my={16}>Sign in to your studio account</Title>
                <TextInput w={320} my={12} mx='auto' label='Email address' type='email' placeholder="Enter you'r email address" value={email} onChange={(event) => setEmail(event.target.value)} />
                <TextInput w={320} my={12} mx='auto' label='Password' type='password' placeholder="Enter you'r password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                <Text size={14} ml='auto' align='right' w='full'>
                    <Link to='/'>Forgot Password?</Link>
                </Text>
                <Text size={14} align='center'>No account?<Link to='/'>Register now</Link></Text>
                <Center my={12}>
                    <Button variant='filled' color='primary' disabled={!buttonEnabled} onClick={() => navigate('/reference')}>Sign in</Button>
                </Center>
            </Flex>
            <Bottombar />
        </>
    );
}

export default Signin;